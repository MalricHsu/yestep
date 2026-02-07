import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// 第三方套件
import axios from 'axios';

// 工具
import { formatNumber } from '../utils/formatNumber';
import { getErrorMessage } from '../utils/error';

// 元件
import Nav from '../components/Nav';
import StarRating from '../components/StarRating';
import PopularTrails from '../components/PopularTrails';
import SearchTheme from '../components/SearchTheme';

// API
const searchApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });

const TrailSearchPage = () => {
    // 取得與設定網址參數
    const [searchParams, setSearchParams] = useSearchParams();

    // 目前頁碼狀態
    const limit = 8; // 每頁筆數
    const urlKeyword = searchParams.get('q') || '';
    const currentPage = parseInt(searchParams.get('_page')) || 1;

    // 步道資料
    const [keyword, setKeyword] = useState(urlKeyword);
    const [trailData, setTrailData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const totalPages = Math.ceil(totalCount / limit); // 計算總頁數

    // 3. 當網址參數改變時（例如點擊回退鍵），同步更新 input 的文字
    useEffect(() => {
        setKeyword(urlKeyword);
    }, [urlKeyword]);

    // 4. 統一發送網址更新的函式
    const updateRoute = (q, page) => {
        setSearchParams({
            q: q,
            _page: page,
        });
    };

    // 處理搜尋按鈕/Enter
    const triggerSearch = () => {
        updateRoute(keyword, 1); // 搜尋時強制回到第 1 頁
    };

    const onSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            triggerSearch();
        }
    };

    // 網頁標題
    useEffect(() => {}, []);

    // 步道列表
    useEffect(() => {
        const getTrailScenery = async () => {
            try {
                // 帶入分頁參數與關鍵字
                const res = await searchApi.get(`/trails`, {
                    params: {
                        _page: currentPage,
                        _limit: limit,
                        q: urlKeyword,
                    },
                });

                // 從 Header 抓取總數（這取決於後端設定，JSON Server 預設是這個名稱）
                const countFromHeader = res.headers['x-total-count'];
                if (countFromHeader) {
                    setTotalCount(parseInt(countFromHeader));
                }

                setTrailData(res.data);
            } catch (error) {
                console.error('API 錯誤:', getErrorMessage(error));
            }
        };
        getTrailScenery();
    }, [currentPage, urlKeyword]);

    // 處理頁碼 Prev、Next
    const handlePageChange = (targetPage) => {
        // 邊界檢查：不能小於 1，不能大於總頁數
        if (targetPage < 1 || targetPage > totalPages) return;

        // 更新網址參數
        updateRoute(urlKeyword, targetPage);

        // UX 優化：換頁後自動滾動回頂部
        window.scrollTo({
            top: 0,
            // behavior: 'smooth',
            behavior: 'instant',
        });
    };

    // 處理頁碼點擊
    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                </li>,
            );
        }
        return pages;
    };

    // 處理步道點擊
    const handleAddPopular = async (id, currentPopular) => {
        try {
            await searchApi.patch(`/trails/${id}`, {
                trail_popular: (currentPopular || 0) + 1,
            });

            setTrailData((prev) =>
                prev.map((t) =>
                    t.id === id ? { ...t, trail_popular: (t.trail_popular || 0) + 1 } : t,
                ),
            );
        } catch (error) {
            console.error('更新失敗:', getErrorMessage(error));
        }
    };

    return (
        <>
            <header className="search-header">
                <Nav />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h3 className="text-white text-center fw-medium fs-7 mb-8">步道總覽</h3>
                            <h1 className="text-white text-center mb-8">Next Step！想要去哪裡？</h1>
                            <form
                                className="search-bar mb-3 px-3 py-2 bg-white rounded-pillmb-3 px-3 py-2 bg-white rounded-pill"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="input-group align-items-center">
                                    <select
                                        className="form-select px-4"
                                        value={urlKeyword}
                                        onChange={(e) => updateRoute(e.target.value, 1)}
                                    >
                                        <option value="">請選擇地區</option>
                                        <option value="北部">北部</option>
                                        <option value="中部">中部</option>
                                        <option value="南部">南部</option>
                                        <option value="東部">東部</option>
                                    </select>
                                    <span className="search-divider"></span>
                                    <input
                                        type="text"
                                        className="form-control px-4"
                                        placeholder="Next Step！想要去哪裡？"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        onKeyDown={onSearchKeyDown}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={triggerSearch}
                                    >
                                        搜尋
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <section className="search bg-primary-50 py-8">
                    <div className="container">
                        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center column-gap-4 mb-3">
                            <h2 className="text-black-900 mb-2 mb-sm-0 fs-5 fs-sm-2">步道列表</h2>
                            <p className="text-black-700 fw-medium">
                                找到
                                <span className="text-primary-300 fw-bold mx-1">
                                    {totalCount}筆
                                </span>
                                你可能喜歡的步道景觀
                            </p>
                        </div>
                        <div className="mb-8">
                            <div className="row row-gap-3 row-gap-sm-6">
                                {trailData.map((trail) => {
                                    return (
                                        <div className="col-md-6" key={trail.id}>
                                            <Link
                                                to={`/detail/${trail.id}`}
                                                className="card d-flex flex-xl-row gap-3 rounded-24 shadow p-3"
                                                onClick={() =>
                                                    handleAddPopular(trail.id, trail.trail_popular)
                                                }
                                            >
                                                <div className="card-img rounded-16 overflow-hidden">
                                                    <img
                                                        className="card-img-top"
                                                        src={trail.trail_image}
                                                        alt={trail.trail_name}
                                                    />
                                                    <div className="card-featured d-flex gap-1 text-white fs-9">
                                                        <div className="d-flex align-items-center gap-1">
                                                            <i className="material-icons fs-9">
                                                                local_fire_department
                                                            </i>
                                                            <span>
                                                                {formatNumber(trail.trail_popular)}
                                                            </span>
                                                        </div>
                                                        <span>・</span>
                                                        <div className="d-flex align-items-center gap-1">
                                                            <i className="material-icons fs-9">
                                                                favorite
                                                            </i>
                                                            <span>
                                                                {formatNumber(trail.trail_collect)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body d-flex flex-column">
                                                    <h4 className="card-title fs-7 fw-medium text-black-900 mb-1">
                                                        {trail.trail_name}
                                                    </h4>
                                                    <p className="text-primary-300 fw-medium mb-1">
                                                        {trail.trail_address}
                                                    </p>
                                                    <div className="d-flex align-items-center text-black-400 fs-10 fw-medium mb-4">
                                                        <p className="me-1">
                                                            {trail.trail_difficulty}
                                                        </p>
                                                        <StarRating
                                                            rating={trail.trail_difficulty}
                                                            fontSize={12}
                                                            color={'black-400'}
                                                        />
                                                        <p>・{trail.trail_hour}</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-end mt-auto">
                                                        <ul className="list-unstyled d-flex column-gap-2">
                                                            {trail.trail_tags
                                                                ?.slice(0, 3)
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
                                                        <button
                                                            type="button"
                                                            className="btn btn-go p-3"
                                                        >
                                                            <span className="material-symbols-outlined">
                                                                arrow_forward
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <ul className="pagination gap-1">
                                {/* 上一頁 */}
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        <span className="material-symbols-outlined">
                                            keyboard_arrow_left
                                        </span>
                                    </button>
                                </li>

                                {/* 動態產生頁碼按鈕 */}
                                {renderPagination()}

                                {/* 下一頁 */}
                                <li
                                    className={`page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        <span className="material-symbols-outlined">
                                            keyboard_arrow_right
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 熱門步道 */}
                <PopularTrails onUpdate={handleAddPopular} hasBorder={true} />

                {/* 主題限定活動 */}
                <SearchTheme />
            </main>
        </>
    );
};

export default TrailSearchPage;
