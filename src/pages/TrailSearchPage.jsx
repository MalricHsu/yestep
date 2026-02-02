import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// 元件
import Nav from '../components/Nav';
import StarRating from '../components/StarRating';

// API
const searchApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });

const getErrorMessage = (error) => {
    return error?.response?.data?.message || error.message || '發生未知錯誤';
};

// 價格千分位處理
const formatNumber = (num) => {
    // 安全性檢查：如果 num 是 undefined 或 null，回傳 0 或空字串
    if (num === undefined || num === null) return '0';

    let parts = num.toString().split('.'); // 分割整數和小數部分
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 格式化整數部分
    return parts.length > 1 ? parts.join('.') : parts[0]; // 拼接小數部分
};

const TrailSearchPage = () => {
    const [keyword, setKeyword] = useState('');
    const [trailCount, setTrailCount] = useState(0);
    const [trailData, setTrailData] = useState([]);
    const [popularTrails, setPopularTrails] = useState([]);

    const onSearch = (e) => {
        if (e.key === 'Enter') {
            setKeyword(e.target.value);
        }
    };

    useEffect(() => {
        document.title = '步道總覽 | YeStep';

        // 步道列表
        const getTrailScenery = async () => {
            try {
                const res = await searchApi.get('/trails?_page=1&_limit=8');
                setTrailCount(res.data.length ?? 0);
                setTrailData(res.data);
            } catch (error) {
                console.error('API 錯誤:', getErrorMessage(error));
            }
        };
        getTrailScenery();

        // 熱門步道
        const getPopularTrailScenery = async () => {
            try {
                const res = await searchApi.get(
                    '/trails?_sort=trail_popular&_limit=10&_order=desc',
                );
                setPopularTrails(res.data);
            } catch (error) {
                console.error('API 錯誤:', getErrorMessage(error));
            }
        };
        getPopularTrailScenery();
    }, [keyword]);

    useEffect(() => {
        if (!popularTrails || popularTrails.length === 0) return;

        // 定義 swiper 變數以便後續銷毀
        let swiperInstance = null;
        // 使用 setTimeout 確保 React 已經把 DOM (卡片) 真的畫在螢幕上了
        const initSwiper = setTimeout(() => {
            swiperInstance = new Swiper('.popularTrailCards', {
                modules: [Navigation, Autoplay],
                slidesPerView: 1.2,
                spaceBetween: 12,
                navigation: {
                    nextEl: '.btn-next',
                    prevEl: '.btn-prev',
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false, // 使用者互動後不停止自動播放
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 4,
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
    }, [popularTrails]);

    return (
        <>
            <header className="search-header">
                <Nav />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h3 className="text-white text-center fw-medium fs-7 mb-8">步道總覽</h3>
                            <h1 className="text-white text-center mb-8">Next Step！想要去哪裡？</h1>
                            <form className="search-bar mb-3 px-3 py-2 bg-white rounded-pillmb-3 px-3 py-2 bg-white rounded-pill">
                                <div className="input-group align-items-center">
                                    <select
                                        className="form-select px-4"
                                        value={keyword}
                                        onChange={onSearch}
                                    >
                                        +<option value="">請選擇地區</option>
                                        <option value="1">北部</option>
                                        <option value="2">中部</option>
                                        <option value="3">南部</option>
                                        <option value="4">東部</option>
                                    </select>
                                    <span className="search-divider"></span>
                                    <input
                                        type="text"
                                        className="form-control px-4"
                                        placeholder="Next Step！想要去哪裡？"
                                    />
                                    <button className="btn btn-primary" type="button">
                                        搜尋
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="search bg-primary-50 py-8">
                    <div className="container">
                        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center column-gap-4 mb-3">
                            <h2 className="text-black-900 mb-2 mb-sm-0">步道列表</h2>
                            <p className="text-black-700 fw-medium">
                                找到
                                <span className="text-primary-300 fw-bold mx-1">
                                    {trailCount}筆
                                </span>
                                你可能喜歡的步道景觀
                            </p>
                        </div>
                        <div className="mb-8">
                            <div className="row row-gap-3 row-gap-sm-6">
                                {trailData.map((trail) => {
                                    return (
                                        <div className="col-md-6" key={trail.id}>
                                            <Link
                                                to={`/detail/${trail.id}`}
                                                className="card d-flex flex-xl-row gap-3 rounded-24 shadow p-3"
                                            >
                                                <div className="card-img">
                                                    <img
                                                        className="card-img-top rounded-16"
                                                        src={trail.trail_image}
                                                        alt={trail.trail_name}
                                                    />
                                                </div>
                                                <div className="card-body d-flex flex-column">
                                                    <h4 className="card-title fs-7 fw-medium text-black-900 mb-1">
                                                        {trail.trail_name}
                                                    </h4>
                                                    <p className="text-primary-300 fw-medium mb-1">
                                                        {trail.trail_address}
                                                    </p>
                                                    <div className="d-flex align-items-center text-black-400 fs-10 fw-medium mb-4">
                                                        <p className="me-1">
                                                            {trail.trail_difficulty}
                                                        </p>
                                                        <StarRating
                                                            rating={trail.trail_difficulty}
                                                            fontSize={12}
                                                        />
                                                        <p>・{trail.trail_hour}</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-end mt-auto">
                                                        <ul className="list-unstyled d-flex column-gap-2">
                                                            {trail.trail_tags
                                                                ?.slice(0, 3)
                                                                .map((tag, index) => {
                                                                    return (
                                                                        <li
                                                                            key={index}
                                                                            className="bg-primary-300 text-white px-2 py-1 fs-9 fw-medium rounded-4"
                                                                        >
                                                                            {tag}
                                                                        </li>
                                                                    );
                                                                })}
                                                        </ul>
                                                        <button
                                                            type="button"
                                                            className="btn btn-go p-3"
                                                        >
                                                            <span className="material-symbols-outlined">
                                                                arrow_forward
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <ul className="pagination gap-1">
                                <li className="page-item me-2 disabled">
                                    <Link to={`/search`} className="page-link" href="">
                                        <span className="material-symbols-outlined">
                                            keyboard_arrow_left
                                        </span>
                                    </Link>
                                </li>
                                <li className="page-item active">
                                    <Link to={`/search`} className="page-link" href="">
                                        1
                                    </Link>
                                </li>
                                <li className="page-item">
                                    <Link to={`/search`} className="page-link" href="">
                                        2
                                    </Link>
                                </li>
                                <li className="page-item">
                                    <Link to={`/search`} className="page-link" href="">
                                        3
                                    </Link>
                                </li>
                                <li className="page-item">
                                    <Link to={`/search`} className="page-link" href="">
                                        4
                                    </Link>
                                </li>
                                <li className="page-item">
                                    <Link to={`/search`} className="page-link" href="">
                                        5
                                    </Link>
                                </li>
                                <li className="page-item ms-2">
                                    <Link to={`/search`} className="page-link" href="">
                                        <span className="material-symbols-outlined">
                                            keyboard_arrow_right
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="popularTrails py-16">
                    <div className="container">
                        <div className="border-1 border-top border-primary-200 pt-8">
                            <div className="d-flex justify-content-between mb-8">
                                <h2 className="text-black-900 mb-2 mb-sm-0">本週熱門步道推薦</h2>
                                <div className="d-flex">
                                    <button
                                        type="button"
                                        className="btn btn-arrow btn-prev"
                                    ></button>
                                    <button
                                        type="button"
                                        className="btn btn-arrow btn-next"
                                    ></button>
                                </div>
                            </div>
                            <div className="popularTrailCards swiper-container overflow-hidden">
                                <div className="swiper-wrapper">
                                    {popularTrails?.map((trail) => {
                                        return (
                                            <div className="swiper-slide" key={trail.id}>
                                                <Link
                                                    to={`/detail/${trail.id}`}
                                                    className="card d-flex rounded-24 h-100 overflow-hidden"
                                                >
                                                    <div className="card-img">
                                                        <img
                                                            src={trail.trail_image}
                                                            alt={trail.trail_name}
                                                        />
                                                    </div>

                                                    <div className="card-body d-flex flex-column align-items-start">
                                                        <div className="bg-primary-50 text-primary-300 rounded-20 px-3 py-1 fw-bold">
                                                            {trail.trail_difficulty}
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end w-100 mt-auto">
                                                            <div className="d-flex flex-column">
                                                                <h4 className="card-title fs-7 fw-medium text-white mb-1">
                                                                    {trail.trail_name}
                                                                </h4>
                                                                <p className="text-black-100 fs-9 mb-1">
                                                                    {trail.trail_address}
                                                                </p>
                                                                <div className="d-flex gap-1 text-black-100 fs-9">
                                                                    <div className="d-flex align-items-center gap-1">
                                                                        <i class="material-icons fs-9">
                                                                            local_fire_department
                                                                        </i>
                                                                        <span>
                                                                            {formatNumber(
                                                                                trail.trail_popular,
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <span>・</span>
                                                                    <div className="d-flex align-items-center gap-1">
                                                                        <i class="material-icons fs-9">
                                                                            favorite
                                                                        </i>
                                                                        <span>
                                                                            {formatNumber(
                                                                                trail.trail_collect,
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="btn btn-go p-3"
                                                            >
                                                                <span className="material-symbols-outlined">
                                                                    arrow_forward
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default TrailSearchPage;
