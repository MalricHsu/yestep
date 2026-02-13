import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// 引入圖片
import heroSwiper01 from '../assets/images/home/heroswiper-01.webp';
import heroSwiper02 from '../assets/images/home/heroswiper-02.webp';
import heroSwiper03 from '../assets/images/home/heroswiper-03.webp';

function HeroSwiper() {
    const carouselData = [
        {
            id: 1,
            title: '單人圖片',
            image: heroSwiper01,
        },
        {
            id: 2,
            title: '雙人圖片',
            image: heroSwiper02,
        },

        {
            id: 3,
            title: '家庭圖片',
            image: heroSwiper03,
        },
    ];

    return (
        <>
            <Swiper
                className="w-100 h-100"
                loop={true}
                effect="fade"
                modules={[Autoplay, EffectFade]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                fadeEffect={{
                    crossFade: true, //轉暗特效
                }}
            >
                {carouselData.map((item) => (
                    <SwiperSlide key={item.id} className="w-100 h-100">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-100 h-100 object-fit-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default HeroSwiper;
