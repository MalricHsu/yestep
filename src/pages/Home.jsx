// 待討論：搜尋欄簡化
// 最優先：難易度小卡元件化、加上SWiper < > 按鈕、Hero 容器問題
// 待嘗試：ThemeSwiper.jsx 改成滿版，讓他的裝飾可以突顯出來
// fix: 選單active bg底色、預約按鈕Link、景觀小卡傳中文
// fix: 更正成壓縮後圖片、替換手機版的 ThemeSwiper.jsx 圖片、替換 HeroSwiper 圖片

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
import diffCard01Sm from '../assets/images/home/diffcard-01-sm.png';
import diffCard01 from '../assets/images/home/diffcard-01.png';
import diffCard02Sm from '../assets/images/home/diffcard-02-sm.png';
import diffCard02 from '../assets/images/home/diffcard-02.png';
import diffCard03Sm from '../assets/images/home/diffcard-03-sm.png';
import diffCard03 from '../assets/images/home/diffcard-03.png';
import diffCard04Sm from '../assets/images/home/diffcard-04-sm.png';
import diffCard04 from '../assets/images/home/diffcard-04.png';
import diffCard05Sm from '../assets/images/home/diffcard-05-sm.png';
import diffCard05 from '../assets/images/home/diffcard-05.png';

// 引入 特色景觀步道 landscape 資料
import { landscapeColumns } from '../data/home-landscape';

// 引入 關於我們
import aboutImg from '../assets/images/home/about-img.svg';
import aboutImgLg from '../assets/images/home/about-img-lg.svg';

// 引入 關於我們-背景山脈圖
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
                    <div className="d-flex bg-primary-300 rounded-pill p-2">
                        <button
                            className={`hero__switch-btn btn rounded-pill d-flex justify-content-center align-items-center px-3 py-2  ${heroMode === 'video' ? 'active' : ''}`}
                            onClick={() => setHeroMode('video')}
                        >
                            <span className=" material-symbols-outlined">animated_images</span>
                        </button>
                        <button
                            className={`hero__switch-btn btn rounded-pill d-flex justify-content-center align-items-center px-3 py-2  ${heroMode === 'swiper' ? 'active' : ''}`}
                            onClick={() => setHeroMode('swiper')}
                        >
                            <span className=" material-symbols-outlined ">filter</span>
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

                {/* 步道難度指南 */}
                <section className="pt-16 pb-32">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="fs-lg-2 fs-5 mb-8">步道難度指南</h2>
                                <ul className="diffcard__list list-unstyled gap-6">
                                    <li className="diffcard__card">
                                        <div className="diffcard__content bg-primary-100">
                                            <div className="d-flex flex-column justify-content-center align-items-center p-4">
                                                <img
                                                    src={diffCard01Sm}
                                                    className=" mb-3"
                                                    alt="小圖"
                                                />
                                                <h4 className="fs-4 mb-3 text-primary-300">
                                                    休閒級
                                                </h4>
                                            </div>
                                            <div className="diffcard__overlay bg-primary-100">
                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        海拔高度
                                                    </span>
                                                    <p className="diffcard__text">1,000 公尺以下</p>
                                                </div>

                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        裝備
                                                    </span>
                                                    <p className="diffcard__text">帶水與少許糧食</p>
                                                </div>

                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        步道描述
                                                    </span>
                                                    <p className="diffcard__text">
                                                        全家皆宜，坡度平緩且設施完善，路面平緩輕鬆好走。
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="diffcard__card">
                                        <div className="diffcard__content bg-primary-100">
                                            <div className="d-flex flex-column justify-content-center align-items-center p-4">
                                                <img
                                                    src={diffCard02Sm}
                                                    className="mb-3"
                                                    alt="小圖"
                                                />
                                                <h4 className="fs-4 mb-3 text-primary-300">
                                                    入門級
                                                </h4>
                                            </div>
                                            <div className="diffcard__overlay bg-primary-100">
                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        海拔高度
                                                    </span>
                                                    <p className="diffcard__text">
                                                        1,000 公尺 ~ 2,000 公尺
                                                    </p>
                                                </div>

                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        裝備
                                                    </span>
                                                    <p className="diffcard__text">帶水與適量糧食</p>
                                                </div>

                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        步道描述
                                                    </span>
                                                    <p className="diffcard__text">
                                                        有些稍難路段，設施相對完善，路面平整。
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="diffcard__card">
                                        <div className="diffcard__content bg-primary-100">
                                            <div className="d-flex flex-column justify-content-center align-items-center p-4">
                                                <img
                                                    src={diffCard03Sm}
                                                    className="mb-3"
                                                    alt="小圖"
                                                />
                                                <h4 className="fs-4 mb-3 text-primary-300">
                                                    健行級
                                                </h4>
                                            </div>
                                            <div className="diffcard__overlay bg-primary-100">
                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        海拔高度
                                                    </span>
                                                    <p className="diffcard__text">
                                                        2,000 公尺 ~ 3,000 公尺
                                                    </p>
                                                </div>

                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        裝備
                                                    </span>
                                                    <p className="diffcard__text">
                                                        需具備登山裝備如糧食、睡袋、炊煮設備
                                                    </p>
                                                </div>

                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        步道描述
                                                    </span>
                                                    <p className="diffcard__text">
                                                        有些路段需要事先申請許可，設施相對完善。
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="diffcard__card">
                                        <div className="diffcard__content bg-primary-100">
                                            <div className="d-flex flex-column justify-content-center align-items-center p-4">
                                                <img
                                                    src={diffCard04Sm}
                                                    className="mb-3"
                                                    alt="小圖"
                                                />
                                                <h4 className="fs-4 mb-3 text-primary-300">
                                                    挑戰級
                                                </h4>
                                            </div>
                                            <div className="diffcard__overlay bg-primary-100">
                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        海拔高度
                                                    </span>
                                                    <p className="diffcard__text">
                                                        2,000 公尺 ~ 3,000 公尺
                                                    </p>
                                                </div>

                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        裝備
                                                    </span>
                                                    <p className="diffcard__text">
                                                        需具備登山裝備如糧食、睡袋、炊煮設備
                                                    </p>
                                                </div>

                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        步道描述
                                                    </span>
                                                    <p className="diffcard__text">
                                                        坡度陡峭，多條路段需要申請許可，氣溫變化大。
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="diffcard__card">
                                        <div className="diffcard__content bg-primary-100">
                                            <div className="d-flex flex-column justify-content-center align-items-center p-4">
                                                <img
                                                    src={diffCard05Sm}
                                                    className="mb-3"
                                                    alt="小圖"
                                                />
                                                <h4 className="fs-4 mb-3 text-primary-300">
                                                    專業級
                                                </h4>
                                            </div>
                                            <div className="diffcard__overlay bg-primary-100">
                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        海拔高度
                                                    </span>
                                                    <p className="diffcard__text">3,000 公尺以上</p>
                                                </div>

                                                <div className="diffcard__row">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        裝備
                                                    </span>
                                                    <p className="diffcard__text">
                                                        需具備登山裝備如糧食、睡袋、炊煮設備
                                                    </p>
                                                </div>

                                                <div className="diffcard__row ">
                                                    <span className="diffcard__label fw-bold fs-8">
                                                        步道描述
                                                    </span>
                                                    <p className="diffcard__text">
                                                        氣溫變化大，路況通常不佳，有許多困難和危險路段，需事先申請許可。
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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
