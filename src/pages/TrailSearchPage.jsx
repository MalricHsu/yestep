import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    const [keyword, setKeyword] = useState('');
    const [trailData, setTrailData] = useState([]);

    // 目前頁碼狀態
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 8; // 每頁筆數
    const totalPages = Math.ceil(totalCount / limit); // 計算總頁數

    const onSearch = (e) => {
        if (e.key === 'Enter') {
            setKeyword(e.target.value);
            setCurrentPage(1);
        }
    };

    // 網頁標題
    useEffect(() => {
        document.title = '步道總覽 | YeStep';
    }, []);

    // 步道列表
    useEffect(() => {
        const getTrailScenery = async () => {
            try {
                // 帶入分頁參數與關鍵字
                const res = await searchApi.get(`/trails`, {
                    params: {
                        _page: currentPage,
                        _limit: limit,
                        q: keyword,
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
    }, [currentPage, keyword]);

    // 處理頁碼 Prev、Next
    const handlePageChange = (targetPage) => {
        // 邊界檢查：不能小於 1，不能大於總頁數
        if (targetPage < 1 || targetPage > totalPages) return;

        // 更新狀態，觸發 useEffect 重新抓取 API
        setCurrentPage(targetPage);

        // UX 優化：換頁後自動滾動回頂部
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 處理頁碼點擊
    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i)}>
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
                                        value={keyword}
                                        onChange={onSearch}
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
                                <li
                                    className={`page-item me-2 ${currentPage === 1 ? 'disabled' : ''}`}
                                >
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
                                    className={`page-item ms-2 ${currentPage === totalPages ? 'disabled' : ''}`}
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

                <PopularTrails onUpdate={handleAddPopular} hasBorder={true} />

                <SearchTheme />
                {/* <section className="search-theme py-20">
                    <div className="container">
                        <div className="row align-items-center row-gap-6">
                            <div className="col-lg-4">
                                <h3 className="text-primary-100 fs-7 fw-medium mb-2">春季限定</h3>
                                <h2 className="text-white fs-1 mb-6">浪漫桐花雨</h2>
                                <p className="text-white fs-8 opacity-75">
                                    「讓我們一起走進，那片會下雪的春天。」
                                    <br />
                                    桐花盛開，我們規劃了專屬的桐花導覽，帶你用最輕鬆的方式欣賞春季美景。
                                </p>
                            </div>
                            <div className="col-lg-8">
                                <div className="themeInfoBanner swiper-container">
                                    <div className="swiper-wrapper gap-4">
                                        {themeInfoData.map((themeInfo, index) => {
                                            return (
                                                <div className="swiper-slide" key={index}>
                                                    <div className="card h-100 rounded-16 overflow-hidden">
                                                        <div className="card-img">
                                                            <img
                                                                src={themeInfo.image}
                                                                alt={themeInfo.title}
                                                            />
                                                        </div>
                                                        <div className="card-body d-flex flex-column justify-content-end">
                                                            <h4 className="text-white fs-7 fw-medium mb-1">
                                                                {themeInfo.title}
                                                            </h4>
                                                            <p className="text-black-100 fs-9 text-truncate">
                                                                {themeInfo.text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <Link
                                    to={`/theme`}
                                    className="btn btn-primary rounded-pill fs-8 fw-bold"
                                >
                                    立即預約
                                </Link>
                            </div>
                            <div className="col-lg-8">
                                <div className="d-flex flex-nowrap gap-6 justify-content-center align-items-center">
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-arrow btn-bn-prev">
                                            <span className="material-symbols-outlined">
                                                keyboard_arrow_left
                                            </span>
                                        </button>
                                        <button type="button" className="btn btn-arrow btn-bn-next">
                                            <span className="material-symbols-outlined">
                                                keyboard_arrow_right
                                            </span>
                                        </button>
                                    </div>
                                    <div className="line"></div>
                                    <div className="d-inline text-white fs-5 opacity-50">
                                        <div className="swiper-pagination"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
            </main>
        </>
    );
};

export default TrailSearchPage;
