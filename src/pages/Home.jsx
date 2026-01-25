// 引入 Hero 影片
import heroVideoLg from '../assets/videos/hero-video-lg.mp4';

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
                <section>
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
                </section>

                {/* 主題活動Swiper */}
                <section></section>

                {/* 難易度步道 */}
                <section></section>

                {/* 特色景觀步道 */}
                <section></section>

                {/* 關於我們 */}
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
                    <div className="about__bg w-100 position-absolute ">
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
