// 引入 Hero 影片
import heroVideoLg from '../assets/videos/hero-video-lg.mp4';

// 引入特色景觀步道圖片，之後要改用資料渲染
import featureFlower from '../assets/images/home/feature-flower.svg';
import featureWaterfall from '../assets/images/home/feature-waterfall.svg';
import featureStargazing from '../assets/images/home/feature-stargazing.svg';
import featureSunrise from '../assets/images/home/feature-sunrise.svg';
import featureSunset from '../assets/images/home/feature-sunset.svg';
import featureCloud from '../assets/images/home/feature-cloud.svg';
import featureBirdwatching from '../assets/images/home/feature-birdwatching.svg';
import featureSacredTree from '../assets/images/home/feature-sacredtree.svg';

// 引入關於我們圖片
import aboutImg from '../assets/images/home/about-img.svg';
import aboutImgLg from '../assets/images/home/about-img-lg.svg';

// 引入關於我們-背景山脈圖
import aboutBgLg from '../assets/images/home/about-bg-lg.svg';
import aboutBg from '../assets/images/home/about-bg.svg';

import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = '首頁 | YeStep';
    }, []);

    return (
        <>
            <main>
                {/* HERO */}
                {/* 還有手機版的影片要放 */}
                <section className="position-relative">
                    <div className="hero ratio ratio-16x9">
                        <video
                            src={heroVideoLg}
                            className="object-fit-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        ></video>
                    </div>
                    {/* slogan+搜尋欄 */}
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center z-1">
                        <div className="container">
                            <div className="row ">
                                <div className="col-lg-8 mx-auto">
                                    <h1 className="fs-1 text-white text-center mb-8">
                                        Yes to taking the next step !
                                    </h1>
                                    <form className="search-bar mb-3 px-3 py-2 bg-white rounded-pillmb-3 px-3 py-2 bg-white rounded-pill">
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
                </section>

                {/* 主題活動 Swiper */}
                <section></section>

                {/* 難易度步道 */}
                <section className="pt-16 pb-32"></section>

                {/* 特色景觀步道 feature */}
                <section>
                    <div className="feature__wrap text-primary-50 ">
                        {/* <!-- 左邊欄位 --> */}
                        <div className="feature__column ">
                            <div className="feature__img-box">
                                <img
                                    src={featureFlower}
                                    className="w-100 h-100 object-fit-cover"
                                    alt="賞花圖片"
                                />
                                <p className="feature__img-content sub1-bold">賞花</p>
                            </div>
                            <div className="feature__img-box">
                                <img
                                    src={featureWaterfall}
                                    className="w-100 h-100 object-fit-cover"
                                    alt="瀑布圖片"
                                />
                                <p className="feature__img-content sub1-bold">瀑布</p>
                            </div>
                            <div className="feature__img-box">
                                <img
                                    src={featureStargazing}
                                    className="w-100 h-100 object-fit-cover"
                                    alt="觀星圖片"
                                />
                                <p className="feature__img-content sub1-bold">觀星</p>
                            </div>
                        </div>
                        {/* <!-- 中間欄位 --> */}
                        <div className="feature__column ">
                            <div className="feature__img-box">
                                <img
                                    src={featureSunrise}
                                    className="w-100 h-100 object-fit-cover"
                                    alt="日出圖片"
                                />
                                <p className="feature__img-content sub1-bold">日出</p>
                            </div>
                            <div className="feature__img-box">
                                <img
                                    src={featureSunset}
                                    className="w-100 h-100 object-fit-cover"
                                    alt="日落圖片"
                                />
                                <p className="feature__img-content sub1-bold">日落</p>
                            </div>
                        </div>
                        {/* <!-- 右邊欄位 --> */}
                        <div className="feature__column ">
                            <div className="feature__img-box">
                                <img
                                    src={featureCloud}
                                    className="w-100 h-100 object-fit-cover"
                                    alt="雲海圖片"
                                />
                                <p className="feature__img-content sub1-bold">雲海</p>
                            </div>
                            <div className="feature__img-box">
                                <img
                                    src={featureBirdwatching}
                                    className="w-100 h-100 object-fit-cover"
                                    alt="賞鳥圖片"
                                />
                                <p className="feature__img-content sub1-bold">賞鳥</p>
                            </div>
                            <div className="feature__img-box">
                                <img
                                    src={featureSacredTree}
                                    className="w-100 h-100 object-fit-cover"
                                    alt="神木圖片"
                                />
                                <p className="feature__img-content sub1-bold">神木</p>
                            </div>
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
                                            <div className="about__card-img">
                                                <picture>
                                                    {/* ≥ 992px 換成桌機圖 */}
                                                    <source
                                                        srcSet={aboutImgLg}
                                                        media="(min-width: 992px)"
                                                        alt="關於我們桌機版圖片"
                                                    />
                                                    <img src={aboutImg} alt="關於我們手機版圖片" />
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
                            <img src={aboutBg} alt="手機版背景山脈圖" />
                        </picture>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;
