//React套件
import { Link } from 'react-router-dom';

// 第三方套件
import axios from 'axios';

// 工具
import { getErrorMessage } from '../utils/error';

// 工具
import { formatNumber } from '../utils/formatNumber';

// 元件
import StarRating from '../components/StarRating';

// API
const searchApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });

const SearchTrailList = ({ trail, syncListState }) => {
    // 處理「步道列表」卡片的點擊
    const handleListClick = async (id, currentPopular) => {
        try {
            await searchApi.patch(`/trails/${id}`, {
                trail_popular: (currentPopular || 0) + 1,
            });
            syncListState(id); // 呼叫同步
        } catch (error) {
            console.error('列表更新失敗:', getErrorMessage(error));
        }
    };

    return (
        <div className="col-md-6" key={trail.id}>
            <Link
                to={`/detail/${trail.id}`}
                className="card d-flex flex-xl-row gap-3 rounded-24 shadow p-3"
                onClick={() => handleListClick(trail.id, trail.trail_popular)}
            >
                <div className="card-img rounded-16 overflow-hidden">
                    <img
                        className="card-img-top"
                        src={`${trail.trail_image}?q=80&w=520&fm=webp&auto=format&fit=crop`}
                        alt={trail.trail_name}
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="card-featured d-flex gap-1 text-white fs-9">
                        <div className="d-flex align-items-center gap-1">
                            <i className="material-icons fs-9">local_fire_department</i>
                            <span>{formatNumber(trail.trail_popular)}</span>
                        </div>
                        <span>・</span>
                        <div className="d-flex align-items-center gap-1">
                            <i className="material-icons fs-9">favorite</i>
                            <span>{formatNumber(trail.trail_collect)}</span>
                        </div>
                    </div>
                </div>
                <div className="card-body d-flex flex-column">
                    <h4 className="card-title fs-7 fw-medium text-black-900 mb-1">
                        {trail.trail_name}
                    </h4>
                    <p className="text-primary-300 fw-medium mb-1">{trail.trail_address}</p>
                    <div className="d-flex align-items-center text-black-400 fs-10 fw-medium mb-4">
                        <p className="me-1">{trail.trail_difficulty}</p>
                        <StarRating
                            rating={trail.trail_difficulty}
                            fontSize={12}
                            color={'black-400'}
                        />
                        <p>・{trail.trail_hour}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-end mt-auto">
                        <ul className="list-unstyled d-flex column-gap-2">
                            <li className="bg-primary-300 text-white px-2 py-1 fs-9 fw-medium rounded-4">
                                {trail.trail_landscape}
                            </li>
                            {trail.trail_tags
                                ?.filter((tag) => tag !== trail.trail_landscape)
                                .slice(0, 2)
                                .map((tag, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="bg-primary-300 text-white px-2 py-1 fs-9 fw-medium rounded-4"
                                        >
                                            {tag}
                                        </li>
                                    );
                                })}
                        </ul>
                        <button type="button" className="btn btn-go p-3">
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};
export default SearchTrailList;
