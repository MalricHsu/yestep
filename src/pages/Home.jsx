// 待討論：搜尋欄簡化
// 最優先：難易度小卡、切換按鈕 hover 樣式
// 替換Swiper圖片、加上SWiper <> 按鈕、
// fix: 選單active bg底色
// fix: 預約按鈕Link、景觀小卡傳中文、更正成壓縮後圖片、手機版的 ThemeSwiper.jsx 圖片

// 引入Nav
import Nav from '../components/Nav';

// 引入 Hero 影片
import heroVideo from '../assets/videos/hero-video.mp4';
import heroVideoLg from '../assets/videos/hero-video-lg.mp4';

// 引入 HeroSwiper.jsx
import HeroSwiper from '../components/HeroSwiper';

// 引入 主題活動特輯 ThemeSwiper
import ThemeSwiper from '../components/ThemeSwiper';

// 引入 步道難度指南 diffcard 難易度圖片
import diffCard01 from '../assets/images/home/diffcard-01.png';
import diffCard02 from '../assets/images/home/diffcard-02.png';
import diffCard03 from '../assets/images/home/diffcard-03.png';
import diffCard04 from '../assets/images/home/diffcard-04.png';
import diffCard05 from '../assets/images/home/diffcard-05.png';

// 引入 特色景觀步道 landscape 資料
import { landscapeColumns } from '../data/home-landscape';

// 引入 關於我們
import aboutImg from '../assets/images/home/about-img.svg';
import aboutImgLg from '../assets/images/home/about-img-lg.svg';

// 引入關於我們-背景山脈圖
import aboutBgLg from '../assets/images/home/about-bg-lg.svg';
import aboutBg from '../assets/images/home/about-bg.svg';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PopularTrails from '../components/PopularTrails';

// 第三方套件
import axios from 'axios';

// 工具
import { getErrorMessage } from '../utils/error';

// API
const searchApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });

const Home = () => {
    useEffect(() => {
        document.title = '首頁 | YeStep';
    }, []);

    // 處理步道點擊
    const handleAddPopular = async (id, currentPopular) => {
        try {
            await searchApi.patch(`/trails/${id}`, {
                trail_popular: (currentPopular || 0) + 1,
            });
        } catch (error) {
            console.error('更新失敗:', getErrorMessage(error));
        }
    };

    // Hero顯示邏輯
    const [heroMode, setHeroMode] = useState('video');

    return (
        <>
            <header className="position-relative">
                <Nav />
                {/* HERO:手機90vh、桌機16:9 */}
                <div className="hero">
                    {/* 值為video */}
                    {heroMode === 'video' && (
                        <video
                            className="object-fit-cover w-100 h-100"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src={heroVideoLg} media="(min-width: 992px)" type="video/mp4" />
                            <source src={heroVideo} type="video/mp4" />
                        </video>
                    )}
                    {/* 值為swiper */}
                    {heroMode === 'swiper' && (
                        <div className="w-100 h-100">
                            <HeroSwiper />
                        </div>
                    )}
                </div>
                {/* slogan+搜尋欄 */}
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center z-1">
                    <div className="container">
                        <div className="row ">
                            <div className="col-12 col-lg-8 mx-auto">
                                <h1 className="fs-2 fs-lg-1 text-white text-center mb-8">
                                    Yes to taking the next step !
                                </h1>
                                <form className="search-bar mb-3 px-3 py-2 bg-white rounded-pill">
                                    <div className="input-group align-items-center">
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
                </div>
                {/* Hero切換按鈕 */}
                <div className="hero__bottom-wrap position-absolute start-50 translate-middle-x z-1">
                    <div className="d-flex bg-primary-300 rounded-pill">
                        <button className="btn rounded-pill" onClick={() => setHeroMode('video')}>
                            <span class="material-symbols-outlined">animated_images</span>
                        </button>
                        <button className="btn  rounded-pill" onClick={() => setHeroMode('swiper')}>
                            <span class="material-symbols-outlined">filter</span>
                        </button>
                    </div>
                </div>
            </header>
            <main>
                {/* 本月活動特輯 Swiper */}
                <section className="py-8 py-lg-16 ">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="theme__title mb-6">
                                    <h2 className="fs-lg-2 fs-5">本月活動特輯</h2>
                                </div>
                                <div className="theme__swiper">
                                    <ThemeSwiper />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 熱門步道 */}
                <PopularTrails onUpdate={handleAddPopular} hasBorder={false} />

                {/* 難易度小卡介紹 */}
                <section className="pt-16 pb-32">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="fs-lg-2 fs-5 mb-8">步道難度指南</h2>
                                <ul className="diffcard__list list-unstyled gap-4">
                                    <li className="diffcard__card ">
                                        <img
                                            src={diffCard01}
                                            className="diffcard__img"
                                            alt="圖片"
                                        />
                                    </li>
                                    <li className="diffcard__card">
                                        <img
                                            src={diffCard02}
                                            className="diffcard__img"
                                            alt="圖片"
                                        />
                                    </li>
                                    <li className="diffcard__card">
                                        <img
                                            src={diffCard03}
                                            className="diffcard__img"
                                            alt="圖片"
                                        />
                                    </li>
                                    <li className="diffcard__card">
                                        <img
                                            src={diffCard04}
                                            className="diffcard__img"
                                            alt="圖片"
                                        />
                                    </li>
                                    <li className="diffcard__card">
                                        <img
                                            src={diffCard05}
                                            className="diffcard__img"
                                            alt="圖片"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 特色景觀步道 feature */}
                <section className="py-5">
                    <div className="landscape__gallery text-primary-50 ">
                        {/* 左邊欄 */}
                        <div className="landscape__column">
                            {landscapeColumns.left.map((item) => (
                                <Link
                                    to={`/search?trail_landscape=${item.landscapeName}`}
                                    className="landscape__card"
                                    key={item.id}
                                >
                                    <img src={item.img} alt={item.alt} />
                                    <p className="landscape__card-title sub1-bold">
                                        {item.landscapeName}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        {/* 中間欄 */}
                        <div className="landscape__column">
                            {landscapeColumns.center.map((item) => (
                                <Link
                                    to={`/search?trail_landscape=${item.landscapeName}`}
                                    className="landscape__card"
                                    key={item.id}
                                >
                                    <img src={item.img} alt={item.alt} />
                                    <p className="landscape__card-title sub1-bold">
                                        {item.landscapeName}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        {/* 右邊欄 */}
                        <div className="landscape__column">
                            {landscapeColumns.right.map((item) => (
                                <Link
                                    to={`/search?trail_landscape=${item.landscapeName}`}
                                    className="landscape__card"
                                    key={item.id}
                                >
                                    <img src={item.img} alt={item.alt} />
                                    <p className="landscape__card-title sub1-bold">
                                        {item.landscapeName}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 關於我們 about */}
                <section className="py-16 py-lg-32 position-relative">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="about__card bg-white rounded-24 rounded-lg-60 p-4 p-lg-6 position-relative z-1">
                                    <div className="row align-items-center">
                                        <div className="col-lg-7">
                                            <div className="about__card-img text-center">
                                                <picture>
                                                    <source
                                                        srcSet={aboutImgLg}
                                                        media="(min-width: 992px)"
                                                        alt="關於我們桌機版登山者圖"
                                                    />
                                                    <img
                                                        src={aboutImg}
                                                        alt="關於我們手機版登山者圖"
                                                    />
                                                </picture>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="about__card-content body2-medium">
                                                <h2 className="fs-5 fs-lg-2 mb-6">關於我們</h2>
                                                <div className="about__card-paragraph  mb-4">
                                                    <p>
                                                        人生的旅途中，我們經常問自己：「我做得到嗎？我能再往前走嗎？」
                                                    </p>
                                                    <p>大多時候，答案只差那麼一步 ——</p>
                                                    <p className=" text-primary-200">
                                                        一個肯定的Yes
                                                    </p>
                                                </div>
                                                <div className="about__card-paragraph  mb-4">
                                                    <p>YeStep的誕生，來自一個簡單卻重要的想法：</p>
                                                    <p>
                                                        把每一個「Yes（願意）」化為實際的「Step（行動）」
                                                    </p>
                                                    <p>選擇向前、選擇相信、選擇可行</p>
                                                    <p>第一步可以很輕、很小、很不確定。</p>
                                                    <p>但它依然是找回呼吸的開始</p>
                                                    <p>
                                                        讓你看見森林的寧靜、山稜的光線，還有踏出每一步的自己
                                                    </p>
                                                </div>
                                                <div className="about__card-paragraph  text-primary-200 mb-4">
                                                    <p>Yes to nature.</p>
                                                    <p>Yes to slowing down.</p>
                                                    <p>Yes to breathing with every step.</p>
                                                </div>
                                                <div className="about__card-paragraph ">
                                                    <p>
                                                        只要你願意開始，世界就會為你敞開更多可行的道路。
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 背景山脈圖 */}
                    <div className="about__bg w-100 position-absolute opacity-75 ">
                        <picture>
                            <source
                                srcSet={aboutBgLg}
                                media="(min-width: 992px)"
                                alt="桌機版背景山脈圖"
                            />
                            <img src={aboutBg} className="w-100" alt="手機版背景山脈圖" />
                        </picture>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;
