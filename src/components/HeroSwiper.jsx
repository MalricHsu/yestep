import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

function HeroSwiper() {
    const carouselData = [
        {
            id: 1,
            title: '圖片1',
            image: 'https://images.unsplash.com/photo-1769745241584-be9b8227e126?q=80&w=800&height=450&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 2,
            title: '圖片2',
            image: 'https://images.unsplash.com/photo-1769399287827-4b7d79d99e0d?q=80&w=800&height=450&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 3,
            title: '圖片3',
            image: 'https://images.unsplash.com/photo-1769745241584-be9b8227e126?q=80&w=800&height=450&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
