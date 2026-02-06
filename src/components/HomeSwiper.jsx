import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// 引入圖片
import themeImg01 from '../assets/images/home/theme-swiper-01.svg';
import themeImgLg01 from '../assets/images/home/theme-swiper-lg-01.svg';
import themeImgLg02 from '../assets/images/home/theme-swiper-lg-02.svg';
import themeImgLg03 from '../assets/images/home/theme-swiper-lg-03.svg';
import swiperDecor from '../assets/images/home/swiper-decor.svg';
import swiperDecorLg from '../assets/images/home/swiper-decor-lg.svg';

function HomeSwiper() {
    const [carouselData] = useState([
        {
            id: 1,
            image: themeImg01,
            imageLg: themeImgLg01,
            title: '迎接四月雪',
            derscription: '探索一年一度的山林花雨',
        },
        {
            id: 2,
            image: themeImg01,
            imageLg: themeImgLg02,
            title: '當​我​們​「桐」​在​一起​',
            derscription: '在​花間​小徑，​留​下歡笑​與足跡',
        },
        {
            id: 3,
            image: themeImg01,
            imageLg: themeImgLg03,
            title: '為​相遇​寫​下序章​​',
            derscription: '傳說，​在​桐花​雨下，​攜​手​走過​的​兩人，​會​一起​走得​更​遠',
        },
    ]);

    return (
        <>
            <Swiper
                style={{ overflow: 'hidden' }}
                className="swiper"
                loop={true}
                spaceBetween={72}
                slidesPerView={1} //手機版、電腦版顯示 1 張
            >
                {carouselData.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="theme ">
                            <div className="theme__img">
                                <picture>
                                    {/* 當螢幕 >= 992px 時，顯示 imageLg */}
                                    <source media="(min-width: 992px)" srcSet={item.imageLg} />

                                    {/* 預設 (手機版) 顯示 image */}
                                    <img
                                        src={item.image}
                                        className="w-100 object-fit-cover "
                                        alt={item.title}
                                    />
                                </picture>
                            </div>
                            <picture>
                                <source media="(min-width: 992px)" srcSet={swiperDecorLg} />
                                <img src={swiperDecor} className="theme__decor " alt="裝飾圖片" />
                                <source />
                            </picture>
                            <div className="theme__content w-100">
                                <div className="row ">
                                    <div className="col-lg-8">
                                        <h3 className="fs-lg-1 fs-4 text-primary-300 mb-4">
                                            04 April
                                        </h3>
                                        <div
                                            className="theme__card d-flex flex-column flex-lg-row justify-content-between align-items-start
  align-items-lg-center  gap-6 p-6 bg-white rounded-24"
                                        >
                                            <div>
                                                <h5 className="fs-5 mb-3 text-primary-300 ">
                                                    {item.title}
                                                </h5>
                                                <p className="text-black-700">
                                                    {item.derscription}
                                                </p>
                                            </div>
                                            <button className="theme__btn px-6 py-3 border-0 bg-primary-100 text-primary-300 body1-bold rounded-100">
                                                立即預約
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default HomeSwiper;
