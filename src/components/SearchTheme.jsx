import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// 第三方套件
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 桐花步道介紹
const themeInfoData = [
    {
        title: '白花覆山林',
        text: '桐花飄落鋪滿山徑',
        image: 'https://images.unsplash.com/photo-1746180339336-a07e5106cb87',
    },
    {
        title: '愛​在​花雨​間',
        text: '收集屬​於​彼此​的​風景​',
        image: 'https://images.unsplash.com/photo-1449495169669-7b118f960251',
    },
    {
        title: '與桐​花行',
        text: '享受​親子​共遊時​刻',
        image: 'https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393',
    },
    {
        title: '桐花白徑',
        text: '花影山​風舒心​踏行​',
        image: 'https://images.unsplash.com/photo-1660919209270-829cf9702182',
    },
];

const SearchTheme = () => {
    // 主題活動 swiper
    useEffect(() => {
        if (!themeInfoData || themeInfoData.length === 0) return;

        // 定義 swiper 變數以便後續銷毀
        let swiper = null;
        let timer = null;
        let currentIndex = 0;
        const DELAY = 5000;

        const startAutoPlay = () => {
            stopAutoPlay();
            timer = setInterval(() => {
                currentIndex = (currentIndex + 1) % swiper.slides.length;
                swiper.slideTo(currentIndex);
            }, DELAY);
        };

        const stopAutoPlay = () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        };

        // 使用 setTimeout 確保 React 已經把 DOM (卡片) 真的畫在螢幕上了
        const initSwiper = setTimeout(() => {
            swiper = new Swiper('.themeInfoBanner', {
                modules: [Pagination, Navigation],
                allowTouchMove: true,
                spaceBetween: 16,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
                    // 客製化渲染邏輯
                    renderFraction: function (currentClass, totalClass) {
                        return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
                    },
                    // 格式化數字輸出
                    formatFractionCurrent: (number) => number.toString().padStart(2, '0'),
                    formatFractionTotal: (number) => number.toString().padStart(2, '0'),
                },
                navigation: {
                    nextEl: '.btn-bn-next',
                    prevEl: '.btn-bn-prev',
                },
                breakpoints: {
                    768: {
                        allowTouchMove: false,
                        spaceBetween: 0,
                    },
                },
                on: {
                    slideChange(sw) {
                        // 所有變化最後都回寫 currentIndex
                        currentIndex = sw.activeIndex;
                    },
                    navigationNext() {
                        startAutoPlay(); // 點擊後重置計時
                    },
                    navigationPrev() {
                        startAutoPlay();
                    },
                },
            });
            startAutoPlay();
        }, 100);

        return () => {
            clearTimeout(initSwiper);
            clearInterval(timer);
            swiper?.destroy();
        };
    }, []);

    return (
        <section className="search-theme py-12 py-sm-20">
            <div className="container">
                <div className="row align-items-center row-gap-6">
                    <div className="col-xl-4">
                        <h3 className="text-primary-100 fs-7 fw-medium mb-2">春季限定</h3>
                        <h2 className="text-white fs-3 fs-sm-1 mb-3 mb-sm-6">浪漫桐花雨</h2>
                        <p className="text-white fs-8 opacity-75">
                            「讓我們一起走進，那片會下雪的春天。」
                            <br />
                            桐花盛開，我們規劃了專屬的桐花導覽，帶你用最輕鬆的方式欣賞春季美景。
                        </p>
                    </div>
                    <div className="col-xl-8 order-xl-1 order-md-2">
                        <div className="themeInfoBanner swiper-container">
                            <div className="swiper-wrapper gap-md-4">
                                {themeInfoData.map((themeInfo, index) => {
                                    return (
                                        <div className="swiper-slide" key={index}>
                                            <div className="card h-100 rounded-16 overflow-hidden">
                                                <div className="card-img">
                                                    <img
                                                        src={`${themeInfo.image}?q=80&w=520&fm=webp&auto=format&fit=crop`}
                                                        alt={themeInfo.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                </div>
                                                <div className="card-body d-flex flex-column justify-content-end">
                                                    <h5 className="text-white fs-7 fw-medium mb-1">
                                                        {themeInfo.title}
                                                    </h5>
                                                    <p className="text-black-100 fs-9 text-truncate">
                                                        {themeInfo.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 order-xl-3 order-md-3">
                        <div className="d-flex flex-nowrap gap-6 justify-content-center align-items-center">
                            <div className="d-flex gap-3 gap-sm-2">
                                <button type="button" className="btn btn-arrow btn-bn-prev">
                                    <span className="material-symbols-outlined">
                                        keyboard_arrow_left
                                    </span>
                                </button>
                                <button type="button" className="btn btn-arrow btn-bn-next">
                                    <span className="material-symbols-outlined">
                                        keyboard_arrow_right
                                    </span>
                                </button>
                            </div>
                            <div className="line"></div>
                            <div className="d-inline text-white fs-5 opacity-50">
                                <div className="swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 order-xl-2 order-md-1">
                        <Link
                            to={`/theme`}
                            className="d-block d-md-inline-block btn btn-primary rounded-pill fs-8 fw-bold"
                        >
                            立即預約
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchTheme;
