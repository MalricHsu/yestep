//react套件
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

//狀態管理
import { useDispatch } from 'react-redux';
import { createMessage } from '../slices/infoSlice';

//元件
import Nav from '../components/Nav';
// API
import { TrailsApi } from '../server/api';

const TrailTag = () => {
  const dispatch = useDispatch();
  const [trails, setTrails] = useState([]);
  //抓取那個網頁？後面的字
  const [searchParams] = useSearchParams(); //拿到網址物件
  //從物件中取出相對應的key，就會給出值
  const tagName =
    searchParams.get('trail_tags') ||
    searchParams.get('trail_region') ||
    searchParams.get('trail_system') ||
    searchParams.get('trail_landscape') ||
    '搜尋結果';

  useEffect(() => {
    const tagData = async () => {
      try {
        let queryName = '';
        //jsonServer因為是陣列，所以抓不到完整的詞，所有需要改成like
        if (searchParams.get('trail_tags')) {
          const tagValue = searchParams.get('trail_tags');
          queryName = `trail_tags_like=${tagValue}`;
        } else {
          //換成路由看得懂的樣子（可以加很多的參數）
          queryName = searchParams.toString();
        }
        const res = await TrailsApi.get(`/trails?${queryName}`);
        setTrails(res.data);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || '連線伺服器失敗';
        dispatch(createMessage({ text: errorMessage, type: 'red' }));
      }
    };
    tagData();
  }, [dispatch, searchParams]);

  return (
    <>
      <header className="tag-header">
        <Nav />
      </header>
      <section>
        <div className="container mt-10">
          <div className="row">
            <h2 className="fs-5 fs-lg-2 mb-6 mb-lg-8">{tagName} 相關步道</h2>
            {trails.map((trail) => {
              return (
                <div className="col-md-6 col-lg-4 mb-6 mb-lg-12" key={trail.id}>
                  <div
                    className="card bg-dark text-white rounded-24 overflow-hidden border-0 position-relative recommend-card"
                    style={{ height: '270px' }}
                  >
                    <img
                      className="w-100 h-100 object-fit-cover rounded-24 "
                      src={`${trail.trail_image}?q=70&w=600&fm=webp&auto=format&fit=crop`}
                      alt={trail.trail_image}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="card-img-overlay d-flex flex-column">
                      <div className="d-flex align-items-start gap-3">
                        <span className="badge bg-primary-50 text-primary-300 body2-bold detail-badge px-3 py-1 rounded-20">
                          {trail.trail_difficulty}
                        </span>
                        <span className="badge bg-primary-50 text-primary-300 body2-bold detail-badge px-3 py-1 rounded-20">
                          {trail.trail_trail}
                        </span>
                      </div>

                      <div className="mt-auto ">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="sub1-medium detail-textshadow mb-1">
                              {trail.trail_name}
                            </h5>
                            <p className="body3-regular detail-textshadow">{trail.trail_address}</p>
                          </div>
                          <Link
                            to={`/detail/${trail.id}`}
                            className="btn btn-primary-100 text-primary-300 p-3 d-flex justify-content-center align-items-center stretched-link"
                          >
                            <span className="material-symbols-outlined">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
export default TrailTag;
