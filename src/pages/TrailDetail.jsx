//react套件
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../slices/infoSlice';

//元件
import Nav from '../components/Nav';
import StarRating from '../components/StarRating';
import ActionModal from '../components/ActionModal';
import TrailCard from '../components/TrailCard';
import LikeModal from '../components/LikeModal';
import TrailMap from '../components/TrailMap';
import DetailsActionButtons from '../components/DetailsActionButtons';
import TrailSwiper from '../components/TrailSwiper';

//API
import { TrailsApi } from '../server/api';

const TrailDetail = () => {
  //設定資料
  const [detailData, setDetailData] = useState({});
  const [systemOne, setSystemOne] = useState([]);
  const [systemOther, setSystemOther] = useState([]);
  //取出步道設定頁面
  const useParam = useParams();
  const { id } = useParam;
  //取出狀態
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);
  //使用狀態
  const dispatch = useDispatch();
  //設定實體modal
  const ModalRef = useRef(null);
  //設定是否有加入收藏
  const [favoriteId, setFavoriteId] = useState(null);
  // 新增State 來控制取消收藏的 Modal
  const [isUnfavoriteModalOpen, setIsUnfavoriteModalOpen] = useState(false);

  //標題名稱
  useEffect(() => {
    document.title = `${detailData.trail_name} | YeStep`;
  }, [detailData.trail_name]);

  //取得步道資料、取得有關中央山脈脊梁國家步道系統資料、取得與中央山脈無關
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const getRandomTrails = (arr, count = 3) =>
          [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
        // 使用 Promise.all 同時發出 3 個請求，節省等待時間
        const [detailRes, centralRes, allRes] = await Promise.all([
          TrailsApi.get(`/trails/${id}`),
          TrailsApi.get('/trails?trail_system_like=中央山脈'),
          TrailsApi.get('/trails'),
        ]);
        // 1. 處理詳細資料與畫面滾動
        setDetailData(detailRes.data);
        window.scrollTo({ top: 0, behavior: 'instant' });
        // 2. 處理中央山脈資料
        setSystemOne(getRandomTrails(centralRes.data));
        // 3. 處理其他資料 (過濾掉中央山脈)
        const otherTrails = allRes.data.filter((item) => !item.trail_system?.includes('中央山脈'));
        setSystemOther(getRandomTrails(otherTrails));
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || '連線伺服器失敗';
        dispatch(createMessage({ text: errorMessage, type: 'red' }));
      }
    };

    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //檢查收藏
  useEffect(() => {
    const checkStatus = async () => {
      // 必須 "已登入" 且 "有使用者ID" 且 "有目前步道ID" 才去檢查
      if (isLogin && user && id) {
        try {
          //檢查收藏
          const favRes = await TrailsApi.get(`/favorites?userId=${user.id}&trailId=${id}`);
          if (favRes.data.length > 0) {
            setFavoriteId(favRes.data[0].id);
          } else {
            setFavoriteId(null);
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || '連線伺服器失敗';
          dispatch(createMessage({ text: errorMessage, type: 'red' }));
        }
      } else {
        // 如果沒登入，清空狀態
        setFavoriteId(null);
      }
    };
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, user, id]);

  //處理按鈕點擊
  const handleAction = async (type) => {
    if (!isLogin) {
      ModalRef.current.open(`${type}_guest`);
      return;
    }
    if (type === 'like') {
      // 如果已經收藏 -> 開啟「取消確認」Modal
      if (favoriteId) {
        setIsUnfavoriteModalOpen(true);
        return;
      }
      try {
        const payload = {
          userId: user.id,
          trailId: id,
          trailName: detailData.trail_name,
          trailImage: detailData.trail_image,
          trail_region: detailData.trail_region,
          trail_altitude: detailData.trail_altitude,
          trail_length: detailData.trail_length,
          trail_landscape: detailData.trail_landscape,
          trail_difficulty: detailData.trail_difficulty,
          trail_popular: detailData.trail_popular,
        };

        const res = await TrailsApi.post('/favorites', payload);
        setFavoriteId(res.data.id);
        ModalRef.current.open('like_auth');
      } catch (error) {
        const errorMessage = error.response?.data?.message || '連線失敗，請稍候再試';
        dispatch(
          createMessage({
            text: errorMessage,
            type: 'red',
          }),
        );
      }
    }
  };
  //確認刪除函式
  const confirmUnfavorite = async () => {
    try {
      await TrailsApi.delete(`/favorites/${favoriteId}`);
      setFavoriteId(null);
      setIsUnfavoriteModalOpen(false);
      dispatch(
        createMessage({
          text: `已取消收藏 ${detailData.trail_name} 步道`,
          type: 'success',
        }),
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message || '連線失敗，請稍候再試';
      dispatch(
        createMessage({
          text: errorMessage,
          type: 'red',
        }),
      );
    }
  };

  return (
    <div>
      <header className="detail-header">
        <Nav />
      </header>
      {/*Section 1*/}
      <section>
        <div className="container">
          <div className="py-8 py-lg-16">
            <div className="row">
              <div className="col-lg-5">
                <img
                  src={`${detailData.trail_image}?q=70&w=520&fm=webp&auto=format&fit=crop1`}
                  alt={detailData.trail_address}
                  className="img-fluid object-fit-cover detail-img rounded-24 mb-3 mb-lg-4"
                  loading="lazy"
                  decoding="async"
                />
                <div className="d-none d-lg-block">
                  <TrailMap detailData={detailData} />
                </div>
              </div>
              <div className="col-lg-7 d-flex flex-column">
                <div className="detail-information bg-white rounded-24 mb-3 mb-lg-0 h-100">
                  <div className="p-6 p-lg-8 h-100">
                    <div className="d-flex justify-content-between align-items-start mb-6 mb-lg-12">
                      <div>
                        <p className="sub1-medium fs-8 fs-lg-7 text-primary-300 mb-2  ">
                          {detailData.trail_address}
                        </p>
                        <h1 className="fs-5 fs-lg-1">{detailData.trail_name}</h1>
                      </div>
                      <div className="d-none d-lg-flex align-items-lg-center flex-lg-column text-nowrap">
                        <DetailsActionButtons favoriteId={favoriteId} handleAction={handleAction} />
                      </div>
                    </div>
                    <div>
                      <div className="pb-3 pb-lg-6 mb-3 mb-lg-6 border-bottom border-black-100">
                        <div className="row row-cols-3 ">
                          <div className="col border-end border-black-100 text-center text-lg-start">
                            <p className="mb-2 body3-regular text-primary-300">難度</p>
                            <div className="d-lg-flex align-items-lg-center ">
                              <p className="sub1-medium me-lg-1 mb-1 mb-lg-0">
                                {detailData.trail_difficulty}
                              </p>
                              <div className="d-flex justify-content-center ">
                                <StarRating
                                  rating={detailData.trail_difficulty}
                                  fontSize={12}
                                  color={'text-primary-300'}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col border-end border-black-100 text-center text-lg-start">
                            <p className="mb-2 body3-regular text-primary-300">長度</p>
                            <p className="sub1-medium">{detailData.trail_length}</p>
                          </div>
                          <div className="col text-center text-lg-start">
                            <p className="mb-2 body3-regular text-primary-300">建議時間</p>
                            <p className="sub1-medium ">{detailData.trail_hour}</p>
                          </div>
                        </div>
                      </div>
                      <div className="pb-lg-6 pb-3 border-bottom border-black-100">
                        <p className="body1-regular text-black-700">
                          {detailData.trail_description}
                        </p>
                      </div>
                      <div className="mb-6 mb-lg-14">
                        <div className="border-bottom border-black-100">
                          <div className="row py-3">
                            <div className="col-lg-3">
                              <p className="body2-medium text-primary-300">海拔高度</p>
                            </div>
                            <div className="col-lg-9">
                              <p className="body2-medium text-black-800">
                                {detailData.trail_altitude} 公尺
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="border-bottom border-black-100">
                          <div className="row py-3 ">
                            <div className="col-lg-3">
                              <p className="body2-medium text-primary-300">路面材質</p>
                            </div>
                            <div className="col-lg-9">
                              <p className="body2-medium text-black-800">
                                {detailData.trail_road_condition}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="border-bottom border-black-100">
                          <div className="row py-3 ">
                            <div className="col-lg-3">
                              <p className="body2-medium text-primary-300">所屬系統</p>
                            </div>
                            <div className="col-lg-9">
                              <p className="body2-medium text-black-800">
                                {detailData.trail_system}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="border-bottom border-black-100">
                          <div className="row py-3 ">
                            <div className="col-lg-3">
                              <p className="body2-medium text-primary-300">管理單位</p>
                            </div>
                            <div className="col-lg-9">
                              <p className="body2-medium text-black-800">
                                {detailData.trail_office}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row py-3 ">
                            <div className="col-lg-3">
                              <p className="body2-medium text-primary-300">電話</p>
                            </div>
                            <div className="col-lg-9">
                              <p className="body2-medium text-black-800">{detailData.trail_tel}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-1 mb-6 mb-lg-0 ">
                        <Link
                          to={`/trails?trail_system=${detailData.trail_system}`}
                          className="bg-primary-50 text-primary-300 body2-bold px-3 py-1 rounded-20 me-2 mb-1"
                        >
                          {detailData.trail_system}
                        </Link>
                        <Link
                          to={`/trails?trail_region=${detailData.trail_region}`}
                          className="bg-primary-50 text-primary-300 body2-bold px-3 py-1 rounded-20 me-2 mb-1"
                        >
                          {detailData.trail_region}
                        </Link>
                        <Link
                          to={`/trails?trail_landscape=${detailData.trail_landscape}`}
                          className="bg-primary-50 text-primary-300 body2-bold px-3 py-1 rounded-20 me-2 mb-1"
                        >
                          {detailData.trail_landscape}
                        </Link>

                        {detailData.trail_tags?.map((item, index) => {
                          return (
                            <Link
                              key={index}
                              to={`/trails?trail_tags=${item}`}
                              className="bg-primary-50 text-primary-300 body2-bold px-3 py-1 rounded-20 me-2 mb-1"
                            >
                              {item}
                            </Link>
                          );
                        })}
                      </div>
                      <div className="d-flex align-items-center d-lg-none">
                        <DetailsActionButtons favoriteId={favoriteId} handleAction={handleAction} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-block d-lg-none">
                  <TrailMap />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Section 2*/}
      <section className="bg-detail-section2">
        <div className="container">
          <div className="py-8 py-lg-16">
            <div className="d-flex justify-content-between align-items-end mb-4 mb-lg-8">
              <div className="trail-experience-title ">
                <p className="body1-medium text-primary-300 mb-2">來自步道上的聲音</p>
                <h2 className="fs-5 fs-lg-2">Yestep | 找回生活的步調</h2>
              </div>
              <div className="d-none d-lg-flex gap-3">
                <div className="detail-button-prev detail-nav-btn">
                  <span className="material-symbols-outlined">keyboard_arrow_left</span>
                </div>
                <div className="detail-button-next detail-nav-btn">
                  <span className="material-symbols-outlined">keyboard_arrow_right</span>
                </div>
              </div>
            </div>
            <TrailSwiper />
          </div>
        </div>
      </section>
      {/*Section 3*/}
      <div className="py-8 py-lg-16">
        <div className="container">
          <h2 className="mb-4 mb-lg-8">推薦步道</h2>
          <div className="recommend-first mb-6">
            <p className="body1-medium text-primary-300 mb-3">中央山脈脊梁國家步道系統</p>
            <TrailCard trailData={systemOne} />
          </div>
          <div className="recommend-first ">
            <p className="body1-medium text-primary-300 mb-3">其他步道系統</p>
            <TrailCard trailData={systemOther} />
          </div>
        </div>
      </div>
      {/* Modal */}
      <ActionModal ref={ModalRef} />
      <LikeModal
        isOpen={isUnfavoriteModalOpen}
        detailData={detailData}
        onClose={() => setIsUnfavoriteModalOpen(false)}
        onConfirm={confirmUnfavorite}
      />
    </div>
  );
};

export default TrailDetail;
