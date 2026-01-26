import { useState, useRef, useEffect, useCallback } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';

const searchApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });
// 顯示 API 錯誤
const getErrorMessage = (error) => {
    return error?.response?.data?.message || error.message || '發生未知錯誤';
};

const TrailSearchPage = () => {
    const [region, setRegion] = useState('');
    const [trailSceneryCount, setTrailSceneryCount] = useState(0);
    const fetchRef = useRef(null);

    const getTrailSceneryCount = useCallback(async () => {
        try {
            const res = await searchApi.get('/trails');
            setTrailSceneryCount(res.data.length ?? 0);
        } catch (error) {
            console.error('API 錯誤:', getErrorMessage(error));
        }
    }, []);

    useEffect(() => {
        document.title = '步道總覽 | YeStep';
    }, []);

    useEffect(() => {
        fetchRef.current = getTrailSceneryCount;
    }, [getTrailSceneryCount]);

    useEffect(() => {
        fetchRef.current?.();
    }, []);

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
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
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
                <div className="bg-primary-50 py-8">
                    <div className="container">
                        <div className="d-flex align-items-center column-gap-4 mb-3">
                            <h2 className="text-black-900">步道列表</h2>
                            <p className="text-black-700 fw-medium">
                                找到
                                <span className="text-primary-300 fw-bold mx-1">
                                    {trailSceneryCount}筆
                                </span>
                                你可能喜歡的步道景觀
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default TrailSearchPage;
