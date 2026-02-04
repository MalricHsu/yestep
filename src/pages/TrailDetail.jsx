import { useState, useEffect, Fragment, useRef } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';
import StarRating from '../components/StarRating';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ActionModal from '../components/ActionModal';

const TrailDetail = () => {
    const [detailData, setDetailData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [systemOne, setSystemOne] = useState([]);
    const [systemOther, setSystemOther] = useState([]);
    const detailApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });
    const useParam = useParams();
    const { id } = useParam;
    useEffect(() => {
        document.title = `${detailData.trail_name} | YeStep`;
    }, [detailData.trail_name]);
    //取得步道資料
    useEffect(() => {
        const handleDetailData = async () => {
            try {
                const res = await detailApi.get(`/trails/${id}`);
                // console.log(res);
                setDetailData(res.data);
                // 重點：使用 behavior: 'instant' 實現「直接跳轉」的感覺
                window.scrollTo({ top: 0, behavior: 'instant' });
            } catch (error) {
                console.log(error);
            }
        };
        handleDetailData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    //取得回覆資料
    useEffect(() => {
        const handleReviewData = async () => {
            try {
                const res = await detailApi.get(`/reviews`);
                // console.log(res.data);
                setReviewData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        handleReviewData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //取得有關中央山脈脊梁國家步道系統資料
    useEffect(() => {
        const getSystemData = async () => {
            try {
                const res = await detailApi.get('/trails?trail_system_like=中央山脈');
                console.log(res.data);
                const allCentralTrails = res.data;
                const randomTrail = [...allCentralTrails].sort(() => 0.5 - Math.random());

                setSystemOne(randomTrail.slice(0, 3));
            } catch (error) {
                console.log(error);
            }
        };
        getSystemData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    //取得與中央山脈無關
    useEffect(() => {
        const getOtherData = async () => {
            try {
                const res = await detailApi.get('/trails');
                console.log(res.data);
                const filterSystem = res.data.filter((trail) => {
                    return !trail.trail_system.includes('中央山脈');
                });
                //  console.log(filterSystem);
                const randomTrail = [...filterSystem].sort(() => 0.5 - Math.random());
                setSystemOther(randomTrail.slice(0, 3));
            } catch (error) {
                console.log(error);
            }
        };
        getOtherData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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

    const ModalRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isPlan, setIsPlan] = useState(false);

    const handleAction = (type) => {
        if (!isLoggedIn) {
            ModalRef.current.open(`${type}_guest`);
        } else {
            if (type === 'like') {
                setIsLiked(true);
            }
            if (type === 'plan') {
                setIsPlan(true);
            }
            ModalRef.current.open(`${type}_auth`);
        }
    };

    //地圖元件
    const TrailMap = () => {
        return (
            <iframe
                className="rounded-24 detail-map"
                src={detailData.trail_map_html}
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

    return (
        <div>
            {/* 測試用：切換登入狀態的按鈕 (開發時方便測試) */}
            <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999 }}>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setIsLoggedIn(!isLoggedIn)}
                >
                    {isLoggedIn ? '目前狀態：已登入' : '目前狀態：未登入'}
                </button>
            </div>
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
                                    src={detailData.trail_image}
                                    alt={detailData.trail_address}
                                    className="img-fluid object-fit-cover detail-img rounded-24 mb-3 mb-lg-4"
                                />
                                <div className="d-none d-lg-block">
                                    <TrailMap />
                                </div>
                            </div>
                            <div className="col-lg-7 d-flex flex-column">
                                <div className="detail-information bg-white rounded-24 mb-3 mb-lg-0 h-100">
                                    <div className="p-6 p-lg-8 h-100">
                                        {/*標題*/}
                                        <div className="d-flex justify-content-between align-items-start mb-6 mb-lg-12">
                                            {/*地名 */}
                                            <div>
                                                <p className="sub1-medium fs-8 fs-lg-7 text-primary-300 mb-2  ">
                                                    {detailData.trail_address}
                                                </p>
                                                <h1 className="fs-5 fs-lg-1">
                                                    {detailData.trail_name}
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
                                                            <p className="sub1-medium me-lg-1 mb-1 mb-lg-0">
                                                                {detailData.trail_difficulty}
                                                            </p>
                                                            <div className="d-flex justify-content-center ">
                                                                <StarRating
                                                                    rating={
                                                                        detailData.trail_difficulty
                                                                    }
                                                                    fontSize={12}
                                                                    color={'text-primary-300'}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col border-end border-black-100 text-center text-lg-start">
                                                        <p className="mb-2 body3-regular text-primary-300">
                                                            長度
                                                        </p>
                                                        <p className="sub1-medium">
                                                            {detailData.trail_length}
                                                        </p>
                                                    </div>
                                                    <div className="col text-center text-lg-start">
                                                        <p className="mb-2 body3-regular text-primary-300">
                                                            建議時間
                                                        </p>
                                                        <p className="sub1-medium ">
                                                            {detailData.trail_hour}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pb-lg-6 pb-3 border-bottom border-black-100">
                                                <p className="body1-regular text-black-700">
                                                    {detailData.trail_description}
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
                                                                {detailData.trail_altitude} 公尺
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
                                                                {detailData.trail_road_condition}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-bottom border-black-100">
                                                    <div className="row py-3 ">
                                                        <div className="col-lg-3">
                                                            <p className="body2-medium text-primary-300">
                                                                所屬系統
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-9">
                                                            <p className="body2-medium text-black-800">
                                                                {detailData.trail_system}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-bottom border-black-100">
                                                    <div className="row py-3 ">
                                                        <div className="col-lg-3">
                                                            <p className="body2-medium text-primary-300">
                                                                管理單位
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-9">
                                                            <p className="body2-medium text-black-800">
                                                                {detailData.trail_office}
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
                                                                {detailData.trail_tel}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* 標籤*/}
                                            <div className="d-flex flex-wrap gap-1 mb-6 mb-lg-0 ">
                                                <Link
                                                    to={`/trails?trail_system=${detailData.trail_system}`}
                                                    className="bg-primary-50 text-primary-300 body2-bold px-3 py-1 rounded-20 me-2 mb-1"
                                                >
                                                    {detailData.trail_system}
                                                </Link>
                                                <Link
                                                    to={`/trails?trail_region=${detailData.trail_region}`}
                                                    className="bg-primary-50 text-primary-300 body2-bold px-3 py-1 rounded-20 me-2 mb-1"
                                                >
                                                    {detailData.trail_region}
                                                </Link>
                                                {detailData.trail_tags?.map((item, index) => {
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
                        {/*建立 Header Flex 容器*/}
                        <div className="d-flex justify-content-between align-items-end mb-4 mb-lg-8">
                            {/*標題*/}
                            <div className="trail-experience-title ">
                                <p className="body1-medium text-primary-300 mb-2">
                                    來自步道上的聲音
                                </p>
                                <h2 className="fs-5 fs-lg-2">Yestep | 找回生活的步調</h2>
                            </div>
                            {/*按鈕*/}
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
                        <p className="body1-medium text-primary-300 mb-3">
                            中央山脈脊梁國家步道系統
                        </p>
                        <div className="row">
                            {systemOne.map((system) => {
                                return (
                                    <div className="col-md-4 mb-6 mb-lg-0" key={system.id}>
                                        <div
                                            className="card bg-dark text-white rounded-24 overflow-hidden border-0 position-relative recommend-card"
                                            style={{ height: '300px' }}
                                        >
                                            <img
                                                src={system.trail_image}
                                                className="card-img object-fit-cover w-100 h-100"
                                                alt={system.trail_name}
                                            />
                                            <div className="card-img-overlay d-flex flex-column">
                                                <div className="d-flex align-items-start">
                                                    <span className="badge bg-primary-50 text-primary-300 body2-bold detail-badge px-3 py-1 rounded-20">
                                                        {system.trail_difficulty}
                                                    </span>
                                                </div>

                                                <div className="mt-auto ">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h5 className="sub1-medium detail-textshadow mb-1">
                                                                {system.trail_name}
                                                            </h5>
                                                            <p className="body3-regular detail-textshadow">
                                                                {system.trail_address}
                                                            </p>
                                                        </div>
                                                        <Link
                                                            to={`/detail/${system.id}`}
                                                            className="btn btn-primary-100 text-primary-300 p-3 d-flex justify-content-center align-items-center stretched-link"
                                                        >
                                                            <span className="material-symbols-outlined">
                                                                arrow_forward
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="recommend-first ">
                        <p className="body1-medium text-primary-300 mb-3">其他步道系統</p>
                        <div className="row">
                            {systemOther.map((system) => {
                                return (
                                    <div className="col-md-4 mb-6 mb-lg-0" key={system.id}>
                                        <div
                                            className="card bg-dark text-white rounded-24 overflow-hidden border-0 position-relative recommend-card"
                                            style={{ height: '300px' }}
                                        >
                                            <img
                                                src={system.trail_image}
                                                className="card-img object-fit-cover w-100 h-100"
                                                alt={system.trail_name}
                                            />
                                            <div className="card-img-overlay d-flex flex-column">
                                                <div className="d-flex align-items-start gap-3">
                                                    <span className="badge bg-primary-50 text-primary-300 body2-bold detail-badge px-3 py-1 rounded-20">
                                                        {system.trail_difficulty}
                                                    </span>
                                                    <span className="badge bg-primary-50 text-primary-300 body2-bold detail-badge px-3 py-1 rounded-20">
                                                        {system.trail_system}
                                                    </span>
                                                </div>

                                                <div className="mt-auto ">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h5 className="sub1-medium detail-textshadow mb-1">
                                                                {system.trail_name}
                                                            </h5>
                                                            <p className="body3-regular detail-textshadow">
                                                                {system.trail_address}
                                                            </p>
                                                        </div>
                                                        <Link
                                                            to={`/detail/${system.id}`}
                                                            className="btn btn-primary-100 text-primary-300 p-3 d-flex justify-content-center align-items-center stretched-link"
                                                        >
                                                            <span className="material-symbols-outlined">
                                                                arrow_forward
                                                            </span>
                                                        </Link>
                                                    </div>
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
            {/* Modal */}
            <ActionModal ref={ModalRef} />
        </div>
    );
};

export default TrailDetail;
