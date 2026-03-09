//React套件
import { useEffect, useState, Fragment } from 'react';

//狀態管理
import { createMessage } from '../slices/infoSlice';
import { useDispatch } from 'react-redux';

//第三方套件
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
//元件
import StarRating from './StarRating';

//API
import { TrailsApi } from '../server/api';

const TrailSwiper = () => {
  const [reviewData, setReviewData] = useState([]);
  const dispatch = useDispatch();
  //取得回饋資料
  useEffect(() => {
    const handleReviewData = async () => {
      try {
        const res = await TrailsApi.get(`/reviews`);
        setReviewData(res.data);
      } catch (error) {
        dispatch(createMessage({ text: error, type: 'red' }));
      }
    };
    handleReviewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //swiper
  useEffect(() => {
    if (!reviewData || reviewData.length === 0) return;
    // 定義 swiper 變數以便後續銷毀
    let swiperInstance = null;
    // 使用 setTimeout 確保 React 已經把 DOM (卡片) 真的畫在螢幕上了
    const initSwiper = setTimeout(() => {
      swiperInstance = new Swiper('.trail-experience-content', {
        modules: [Navigation, Autoplay],
        slidesPerView: 1.2,
        spaceBetween: 16,
        navigation: {
          nextEl: '.detail-button-next',
          prevEl: '.detail-button-prev',
        },

        autoplay: {
          delay: 3000,
        },
        loop: true,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },
      });
    }, 100);

    return () => {
      clearTimeout(initSwiper);
      if (swiperInstance) {
        swiperInstance.destroy();
      }
    };
  }, [reviewData]);
  return (
    <>
      <div className="trail-experience-content swiper-container overflow-hidden">
        <div className="swiper-wrapper ">
          {reviewData?.map((review) => {
            return (
              <div className="swiper-slide h-auto d-flex" key={review.id}>
                <div className="bg-white p-6 pt-4 rounded-16 w-100 h-100">
                  <div className="review-info">
                    <div
                      className="d-flex align-items-center border-bottom border-primary-100 "
                      style={{ minHeight: '113px' }}
                    >
                      <img
                        src={review.avatar}
                        alt={review.avatar}
                        style={{
                          width: '72px',
                          height: '72px',
                        }}
                        className="rounded-16 me-4 object-fit-cover "
                      />
                      <div className="d-flex flex-column justify-content-center align-items-start">
                        <p className="body1-medium text-primary-300 mb-1">{review.user}</p>
                        <div className="d-flex flex-wrap mb-1">
                          {review.tag.map((item, index) => {
                            return (
                              <Fragment key={index}>
                                <p className="body3-regular text-black-700">{item}</p>
                                {index < review.tag.length - 1 && (
                                  <span className="mx-1 text-black-700">・</span>
                                )}
                              </Fragment>
                            );
                          })}
                        </div>
                        <div className="d-none d-lg-block">
                          <StarRating
                            rating={review.rating}
                            fontSize={12}
                            color={'text-primary-300'}
                          />
                        </div>
                        <div className="d-block d-lg-none">
                          <StarRating
                            rating={review.rating}
                            fontSize={16}
                            color={'text-primary-300'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <p className="body2-regular text-black-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TrailSwiper;
