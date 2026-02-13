import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

// 第三方套件
import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// 工具
import { formatNumber } from '../utils/formatNumber';
import { getErrorMessage } from '../utils/error';

// 元件
import TrailLoading from './TrailLoading';

// API
const searchApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });

const PopularTrails = ({ onUpdateSuccess, hasBorder = false }) => {
    const [popularTrails, setPopularTrails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const swiperRef = useRef(null);

    // 取得熱門步道資料
    useEffect(() => {
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
    }, []);

    // 初始化 Swiper
    useEffect(() => {
        if (!popularTrails || popularTrails.length === 0) return;

        const swiperInstance = new Swiper('.popularTrailCards', {
            modules: [Navigation, Autoplay],
            slidesPerView: 1.15,
            spaceBetween: 12,
            navigation: {
                nextEl: '.btn-next',
                prevEl: '.btn-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                576: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2.1,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 2.8,
                    spaceBetween: 24,
                },
                1200: {
                    slidesPerView: 3.4,
                    spaceBetween: 24,
                },
                1400: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
            },
            on: {
                // 當 Swiper 所有的設定（包含 Breakpoints）都套用完成後觸發
                afterInit: () => {
                    // 初始化完成後再等 1 秒才關閉 loading
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                },
            },
        });

        swiperRef.current = swiperInstance;

        return () => {
            if (swiperRef.current) {
                swiperRef.current.destroy();
            }
        };
    }, [popularTrails]);

    // 處理步道點擊
    const handleAddPopular = async (id, currentPopular) => {
        try {
            await searchApi.patch(`/trails/${id}`, {
                trail_popular: (currentPopular || 0) + 1,
            });

            // 同步更新「熱門步道」元件內部的數字
            setPopularTrails((prev) =>
                prev.map((t) =>
                    t.id === id ? { ...t, trail_popular: (t.trail_popular || 0) + 1 } : t,
                ),
            );

            // 父元件有傳同步函式（如搜尋頁），就通知它
            if (onUpdateSuccess) {
                onUpdateSuccess(id);
            }
        } catch (error) {
            console.error('更新失敗:', getErrorMessage(error));
        }
    };

    return (
        <section className="popularTrails pb-8 py-sm-16" id="popular-trails">
            <div className="container">
                <div
                    className={`pt-8 ${hasBorder ? 'border-1 border-top border-primary-200' : ''}`}
                >
                    <div className="d-flex justify-content-between align-items-center mb-4 mb-sm-8">
                        <h2 className="text-black-900 mb-2 mb-sm-0 fs-5 fs-sm-2">
                            本週熱門步道推薦
                        </h2>
                        <div
                            className={`d-none d-sm-flex gap-3 ${isLoading ? 'opacity-0' : 'isLoaded'}`}
                        >
                            <button type="button" className="btn btn-arrow btn-prev">
                                <span className="material-symbols-outlined">
                                    keyboard_arrow_left
                                </span>
                            </button>
                            <button type="button" className="btn btn-arrow btn-next">
                                <span className="material-symbols-outlined">
                                    keyboard_arrow_right
                                </span>
                            </button>
                        </div>
                    </div>

                    {isLoading && <TrailLoading />}

                    <div
                        className={`popularTrailCards swiper-container ${isLoading ? 'opacity-0' : 'isLoaded'}`}
                    >
                        <div className="swiper-wrapper">
                            {popularTrails.map((trail) => {
                                return (
                                    <div className="swiper-slide" key={trail.id}>
                                        <Link
                                            to={`/detail/${trail.id}`}
                                            className="card d-flex rounded-24 h-100 overflow-hidden"
                                            onClick={() =>
                                                handleAddPopular(trail.id, trail.trail_popular)
                                            }
                                        >
                                            <div className="card-img">
                                                <img
                                                    src={`${trail.trail_image}?q=80&w=520&fm=webp&auto=format&fit=crop`}
                                                    alt={trail.trail_name}
                                                    loading="lazy"
                                                    decoding="async"
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
                                                                <i className="material-icons fs-9">
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
                                                                <i className="material-icons fs-9">
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
        </section>
    );
};

export default PopularTrails;
