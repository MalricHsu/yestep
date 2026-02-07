//react套件
import { useState, useEffect, Fragment, useRef } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

//第三方套件
import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

//元件
import Nav from '../components/Nav';
import StarRating from '../components/StarRating';
import ActionModal from '../components/ActionModal';
import TrailCard from '../components/TrailCard';

const ThemeDetail = () => {
    const [themeData, setThemeData] = useState({});
    const [reviewData, setReviewData] = useState([]);
    const [themeOne, setThemeOne] = useState([]);
    const themeApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });
    const useParam = useParams();
    const { id } = useParam;

    //狀態管理
    const isLogin = useSelector((state) => {
        return state.auth.isLogin;
    });
    const user = useSelector((state) => {
        return state.auth.user;
    });

    const ModalRef = useRef(null);
    const [favoriteId, setFavoriteId] = useState(null);
    const [planId, setPlanId] = useState(null);

    //標題名稱
    useEffect(() => {
        document.title = `${themeData.trail_name} | YeStep`;
    }, [themeData.trail_name]);

    //取得步道資料 //取得步道型別
    useEffect(() => {
        const handleDetailData = async () => {
            try {
                const res = await themeApi.get(`/theme/${id}`);
                setThemeData(res.data);
                // 重點：使用 behavior: 'instant' 實現「直接跳轉」的感覺
                window.scrollTo({ top: 0, behavior: 'instant' });
            } catch (error) {
                console.log(error);
            }
        };
        handleDetailData();
        const getThemeOne = async () => {
            try {
                const res = await themeApi.get('/theme');
                console.log(res.data);
                const allTrails = res.data;
                const randomTrail = [...allTrails].sort(() => 0.5 - Math.random());
                setThemeOne(randomTrail.slice(0, 6));
            } catch (error) {
                console.log(error);
            }
        };
        getThemeOne();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    //取得回覆資料
    useEffect(() => {
        const handleReviewData = async () => {
            try {
                const res = await themeApi.get(`/reviews`);
                setReviewData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        handleReviewData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //swiper
    useEffect(() => {
        if (!reviewData || reviewData.length === 0) return;
        // 定義 swiper 變數以便後續銷毀
        let swiperInstance = null;
        // 使用 setTimeout 確保 React 已經把 DOM (卡片) 真的畫在螢幕上了
        const initSwiper = setTimeout(() => {
            swiperInstance = new Swiper('.trail-experience-content', {
                modules: [Navigation, Autoplay],
                slidesPerView: 1.2,
                spaceBetween: 16,
                navigation: {
                    nextEl: '.detail-button-next',
                    prevEl: '.detail-button-prev',
                },

                autoplay: {
                    delay: 3000,
                },
                loop: true,
                breakpoints: {
                    768: {
                        slidesPerView: 2, // 平板顯示 2 張
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 3, // 電腦顯示 3 張
                        spaceBetween: 24,
                    },
                },
            });
        }, 100);

        return () => {
            clearTimeout(initSwiper);
            if (swiperInstance) {
                swiperInstance.destroy();
            }
        };
    }, [reviewData]);

    //地圖元件
    const TrailMap = () => {
        return (
            <iframe
                className="rounded-24 detail-map"
                src={themeData.trail_map_html}
                width="100%"
                height="270px"
                style={{ border: '0' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
            ></iframe>
        );
    };
    //按鈕元件
    const ActionButtons = () => {
        // 利用 !! 將 ID 轉為布林值來決定樣式
        const isLiked = !!favoriteId;
        const isPlan = !!planId;
        return (
            <>
                <button
                    type="button"
                    className={`btn  p-3 d-flex justify-content-center align-items-center me-3 ${isLiked ? 'btn-primary-100 text-white' : 'btn-outline-primary-300'} `}
                    style={{ width: '48px', height: '48px' }}
                    onClick={() => {
                        handleAction('like');
                    }}
                >
                    <span className="material-symbols-outlined m-0">favorite</span>
                </button>

                <button
                    type="button"
                    className={`btn  px-6 py-3 d-flex justify-content-center align-items-center me-3 ${isPlan ? 'btn-primary-100 text-white' : 'btn-outline-primary-300'}  `}
                    onClick={() => {
                        handleAction('plan');
                    }}
                >
                    <span className="material-symbols-outlined me-2">add_circle</span>
                    <p className="body1-bold">加入行程</p>
                </button>
            </>
        );
    };

    //檢查收藏/行程
    useEffect(() => {
        const checkStatus = async () => {
            // 必須 "已登入" 且 "有使用者ID" 且 "有目前步道ID" 才去檢查
            if (isLogin && user && id) {
                try {
                    //檢查收藏
                    const favRes = await themeApi.get(`/favorites?userId=${user.id}&trailId=${id}`);
                    if (favRes.data.length > 0) {
                        setFavoriteId(favRes.data[0].id);
                    } else {
                        setFavoriteId(null);
                    }

                    const planRes = await themeApi.get(
                        `/itinerary?userId=${user.id}&trailId=${id}`,
                    );
                    if (planRes.data.length > 0) {
                        setPlanId(planRes.data[0].id);
                    } else {
                        setPlanId(null);
                    }
                } catch (error) {
                    console.error('狀態檢查失敗', error);
                }
            } else {
                // 如果沒登入，清空狀態
                setFavoriteId(null);
                setPlanId(null);
            }
        };
        checkStatus();
    }, [isLogin, user, id, themeApi]);

    //處理按鈕點擊
    const handleAction = async (type) => {
        if (!isLogin) {
            ModalRef.current.open(`${type}_guest`);
            return;
        }
        try {
            if (type === 'like') {
                if (favoriteId) {
                    //取消收藏
                    await themeApi.delete(`/favorites/${favoriteId}`);
                    setFavoriteId(null);
                } else {
                    const res = await themeApi.post('/favorites', {
                        userId: user.id,
                        trailId: id, // 使用 URL 參數的 ID
                        trailName: themeData.trail_name, // 存入名稱方便以後顯示
                        trailImage: themeData.trail_image,
                    });
                    setFavoriteId(res.data.id);
                    ModalRef.current.open('like_auth');
                }
            }
            if (type === 'plan') {
                if (planId) {
                    // --- 取消行程 (Delete) ---
                    await themeApi.delete(`/itinerary/${planId}`);
                    setPlanId(null);
                } else {
                    // --- 加入行程 (Post) ---
                    const res = await themeApi.post('/itinerary', {
                        userId: user.id,
                        trailId: id,
                        trailName: themeData.trail_name,
                        trailImage: themeData.trail_image,
                        date: new Date().toISOString(),
                    });
                    setPlanId(res.data.id);
                    ModalRef.current.open('plan_auth');
                }
            }
        } catch (error) {
            console.error('操作失敗', error);
            alert('連線錯誤，請稍後再試');
        }
    };
    return (
        <div>
            <header className="detail-header">
                <Nav />
            </header>
            {/*Section 1*/}
            <section>
                <div className="container">
                    <div className="py-8 py-lg-16">
                        <div className="row">
                            <div className="col-lg-5">
                                <img
                                    src={themeData.trail_image}
                                    alt={themeData.trail_address}
                                    className="img-fluid object-fit-cover detail-img rounded-24 mb-3 mb-lg-4"
                                />
                                <div className="d-none d-lg-block">
                                    <TrailMap />
                                </div>
                            </div>
                            <div className="col-lg-7 d-flex flex-column">
                                <div className="detail-information bg-white rounded-24 mb-3 mb-lg-0 h-100">
                                    <div className="p-6 p-lg-8 h-100">
                                        <div className="d-flex justify-content-between align-items-start mb-6 mb-lg-12">
                                            <div>
                                                <p className="sub1-medium fs-8 fs-lg-7 text-primary-300 mb-2  ">
                                                    {themeData.trail_address}
                                                </p>
                                                <h1 className="fs-5 fs-lg-1">
                                                    {themeData.trail_name}
                                                </h1>
                                            </div>
                                            {/*按鈕 */}
                                            <div className="d-none d-lg-flex align-items-lg-center flex-lg-column›">
                                                <ActionButtons />
                                            </div>
                                        </div>
                                        {/*資訊*/}
                                        <div>
                                            <div className="pb-3 pb-lg-6 mb-3 mb-lg-6 border-bottom border-black-100">
                                                <div className="row row-cols-3 ">
                                                    <div className="col border-end border-black-100 text-center text-lg-start">
                                                        <p className="mb-2 body3-regular text-primary-300">
                                                            難度
                                                        </p>
                                                        <div className="d-lg-flex align-items-lg-center ">
                                                            <p className="sub1-medium me-lg-1 mb-1 mb-lg-0 fs-8">
                                                                {themeData.trail_difficulty}
                                                            </p>
                                                            <div className="d-flex justify-content-center ">
                                                                <StarRating
                                                                    rating={
                                                                        themeData.trail_difficulty
                                                                    }
                                                                    fontSize={12}
                                                                    color={'text-primary-300'}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col border-end border-black-100 text-center text-lg-start">
                                                        <p className="mb-2 body3-regular  text-primary-300">
                                                            長度
                                                        </p>
                                                        <p className="sub1-medium fs-8">
                                                            {themeData.trail_length}
                                                        </p>
                                                    </div>
                                                    <div className="col text-center text-lg-start">
                                                        <p className="mb-2 body3-regular  text-primary-300">
                                                            建議時間
                                                        </p>
                                                        <p className="sub1-medium fs-8 ">
                                                            {themeData.trail_hour}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pb-lg-6 pb-3 border-bottom border-black-100">
                                                <p className="body1-regular text-black-700">
                                                    {themeData.trail_description}
                                                </p>
                                            </div>
                                            {/*表格 */}
                                            <div className="mb-6 mb-lg-14">
                                                <div className="border-bottom border-black-100">
                                                    <div className="row py-3">
                                                        <div className="col-lg-3">
                                                            <p className="body2-medium text-primary-300">
                                                                海拔高度
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-9">
                                                            <p className="body2-medium text-black-800">
                                                                {themeData.trail_altitude} 公尺
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-bottom border-black-100">
                                                    <div className="row py-3 ">
                                                        <div className="col-lg-3">
                                                            <p className="body2-medium text-primary-300">
                                                                路面材質
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-9">
                                                            <p className="body2-medium text-black-800">
                                                                {themeData.trail_road_condition}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="row py-3 ">
                                                        <div className="col-lg-3">
                                                            <p className="body2-medium text-primary-300">
                                                                電話
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-9">
                                                            <p className="body2-medium text-black-800">
                                                                {themeData.trail_tel}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* 標籤*/}
                                            <div className="d-flex flex-wrap gap-1 mb-6 mb-lg-0 ">
                                                <Link
                                                    to={`/trails?trail_region=${themeData.trail_region}`}
                                                    className="bg-primary-50 text-primary-300 body2-bold px-3 py-1 rounded-20 me-2 mb-1"
                                                >
                                                    {themeData.trail_region}
                                                </Link>
                                                <Link
                                                    to={`/trails?trail_landscape=${themeData.trail_landscape}`}
                                                    className="bg-primary-50 text-primary-300 body2-bold px-3 py-1 rounded-20 me-2 mb-1"
                                                >
                                                    {themeData.trail_landscape}
                                                </Link>

                                                {themeData.trail_tags?.map((item, index) => {
                                                    return (
                                                        <Link
                                                            key={index}
                                                            to={`/trails?trail_tags=${item}`}
                                                            className="bg-primary-50 text-primary-300 body2-bold px-3 py-1 rounded-20 me-2 mb-1"
                                                        >
                                                            {item}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                            {/*按鈕 */}
                                            <div className="d-flex align-items-center d-lg-none">
                                                <ActionButtons />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-block d-lg-none">
                                    <TrailMap />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Section 2*/}
            <section className="bg-detail-section2">
                <div className="container">
                    <div className="py-8 py-lg-16">
                        <div className="d-flex justify-content-between align-items-end mb-4 mb-lg-8">
                            <div className="trail-experience-title ">
                                <p className="body1-medium text-primary-300 mb-2">
                                    來自步道上的聲音
                                </p>
                                <h2 className="fs-5 fs-lg-2">Yestep | 找回生活的步調</h2>
                            </div>
                            <div className="d-none d-lg-flex gap-3">
                                <div className="detail-button-prev detail-nav-btn">
                                    <span className="material-symbols-outlined">
                                        keyboard_arrow_left
                                    </span>
                                </div>
                                <div className="detail-button-next detail-nav-btn">
                                    <span className="material-symbols-outlined">
                                        keyboard_arrow_right
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="trail-experience-content swiper-container overflow-hidden">
                            <div className="swiper-wrapper ">
                                {reviewData?.map((review) => {
                                    return (
                                        <div className="swiper-slide h-auto d-flex" key={review.id}>
                                            <div className="bg-white p-6 pt-4 rounded-16 w-100 h-100">
                                                <div className="review-info">
                                                    <div
                                                        className="d-flex align-items-center border-bottom border-primary-100 "
                                                        style={{ minHeight: '113px' }}
                                                    >
                                                        <img
                                                            src={review.avatar}
                                                            alt={review.avatar}
                                                            style={{
                                                                width: '72px',
                                                                height: '72px',
                                                            }}
                                                            className="rounded-16 me-4 object-fit-cover "
                                                        />
                                                        <div className="d-flex flex-column justify-content-center align-items-start">
                                                            <p className="body1-medium text-primary-300 mb-1">
                                                                {review.user}
                                                            </p>
                                                            <div className="d-flex flex-wrap mb-1">
                                                                {review.tag.map((item, index) => {
                                                                    return (
                                                                        <Fragment key={index}>
                                                                            <p className="body3-regular text-black-700">
                                                                                {item}
                                                                            </p>
                                                                            {index <
                                                                                review.tag.length -
                                                                                    1 && (
                                                                                <span className="mx-1 text-black-700">
                                                                                    ・
                                                                                </span>
                                                                            )}
                                                                        </Fragment>
                                                                    );
                                                                })}
                                                            </div>
                                                            <div className="d-none d-lg-block">
                                                                <StarRating
                                                                    rating={review.rating}
                                                                    fontSize={12}
                                                                    color={'text-primary-300'}
                                                                />
                                                            </div>
                                                            <div className="d-block d-lg-none">
                                                                <StarRating
                                                                    rating={review.rating}
                                                                    fontSize={16}
                                                                    color={'text-primary-300'}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pt-4">
                                                        <p className="body2-regular text-black-700">
                                                            {review.comment}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Section 3*/}
            <div className="py-8 py-lg-16">
                <div className="container">
                    <h2 className="mb-4 mb-lg-8">推薦步道</h2>
                    <div className="recommend-first mb-6">
                        <TrailCard trailData={themeOne} />
                    </div>
                </div>
            </div>
            {/* Modal */}
            <ActionModal ref={ModalRef} />
        </div>
    );
};

export default ThemeDetail;
