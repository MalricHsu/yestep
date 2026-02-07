import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function HeroSwiper() {
    const [carouselData] = useState([
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
            image: 'https://images.unsplash.com/photo-1769745241584-be9b8227e126?q=80&w=800&hight=450&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ]);

    return (
        <>
            <Swiper loop={true}>
                <SwiperSlide key={item.id}>
                    {carouselData.map((item) => {
                        <div>
                            <img src={item.image} alt={item.title} />
                        </div>;
                    })}
                </SwiperSlide>
            </Swiper>
        </>
    );
}
export default HeroSwiper;
