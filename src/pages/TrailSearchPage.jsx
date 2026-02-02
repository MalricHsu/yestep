import { useState, useEffect } from 'react';
import axios from 'axios';

// 元件
import Nav from '../components/Nav';
import StarRating from '../components/StarRating';

const searchApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });
// 顯示 API 錯誤
const getErrorMessage = (error) => {
    return error?.response?.data?.message || error.message || '發生未知錯誤';
};

const TrailSearchPage = () => {
    const [keyword, setKeyword] = useState('');
    const [filteredTrailCount, setFilteredTrailsCount] = useState(0);
    const [filteredTrails, setFilteredTrails] = useState([]);

    const onSearch = (e) => {
        if (e.key === 'Enter') {
            setKeyword(e.target.value);
        }
    };

    useEffect(() => {
        document.title = '步道總覽 | YeStep';

        const getTrailScenery = async () => {
            try {
                const res = await searchApi.get('/trails');
                setFilteredTrailsCount(res.data.length ?? 0);
                setFilteredTrails(res.data);
                console.log(res.data);
            } catch (error) {
                console.error('API 錯誤:', getErrorMessage(error));
            }
        };
        getTrailScenery();
    }, [keyword]);

    return (
        <>
            <header className="search-header">
                <Nav />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h3 className="text-white text-center fw-medium fs-7 mb-8">步道總覽</h3>
                            <h1 className="text-white text-center mb-8">Next Step！想要去哪裡？</h1>
                            <form className="search-bar mb-3 px-3 py-2 bg-white rounded-pillmb-3 px-3 py-2 bg-white rounded-pill">
                                <div className="input-group align-items-center">
                                    <select
                                        className="form-select px-4"
                                        value={keyword}
                                        onChange={onSearch}
                                    >
                                        +<option value="">請選擇地區</option>
                                        <option value="1">北部</option>
                                        <option value="2">中部</option>
                                        <option value="3">南部</option>
                                        <option value="4">東部</option>
                                    </select>
                                    <span className="search-divider"></span>
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
            </header>
            <main>
                <div className="search bg-primary-50 py-8">
                    <div className="container">
                        <div className="d-flex align-items-center column-gap-4 mb-3">
                            <h2 className="text-black-900">步道列表</h2>
                            <p className="text-black-700 fw-medium">
                                找到
                                <span className="text-primary-300 fw-bold mx-1">
                                    {filteredTrailCount}筆
                                </span>
                                你可能喜歡的步道景觀
                            </p>
                        </div>
                        <div className="row row-gap-6">
                            {filteredTrails.map((trail) => {
                                return (
                                    <>
                                        <div className="col-md-6">
                                            <div className="card rounded-24 shadow">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <img
                                                            src={trail.trail_image}
                                                            className="card-img-top rounded-16"
                                                            alt={trail.trail_name}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="card-body">
                                                            <h5 className="card-title">
                                                                {trail.trail_name}
                                                            </h5>
                                                            <p className="card-text">
                                                                {trail.trail_address}
                                                            </p>
                                                            <div className="d-flex align-items-center">
                                                                <StarRating
                                                                    rating={trail.trail_difficulty}
                                                                />
                                                                <p>・約{trail.trail_hour}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <ul>
                                                                    <li></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default TrailSearchPage;
