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

// 篩選、排序
const difficulty = ['休閒級', '入門級', '健行級', '挑戰級', '專業級'];
const estimatedDuration = ['3小時內', '3-6小時', '6-12小時', '12小時-兩天', '兩天以上'];
const landscape = ['瀑布', '日出', '雲海', '晚霞', '觀星', '神木', '賞花', '賞鳥'];
const sortOptions = [
    { label: '難易度由高到低', sort: 'trail_difficulty', order: 'desc' },
    { label: '難易度由低到高', sort: 'trail_difficulty', order: 'asc' },
    { label: '熱門程度由高到低', sort: 'trail_popular', order: 'desc' },
    { label: '熱門程度由低到高', sort: 'trail_popular', order: 'asc' },
];

// API
const searchApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });

const TrailSearchPage = () => {
    // 取得與設定網址參數
    const [searchParams, setSearchParams] = useSearchParams();

    // 目前頁碼狀態
    const limit = 8; // 每頁筆數
    const urlArea = searchParams.get('trail_region') || '';
    const urlKeyword = searchParams.get('q') || '';
    const urlDifficulty = searchParams.get('trail_difficulty') || '';
    const urlLandscape = searchParams.get('trail_landscape') || '';
    const urlSort = searchParams.get('_sort') || '';
    const urlOrder = searchParams.get('_order') || 'desc';
    const currentPage = parseInt(searchParams.get('_page')) || 1;

    // 步道資料
    const [keyword, setKeyword] = useState(urlKeyword);
    const [trailData, setTrailData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const totalPages = Math.ceil(totalCount / limit); // 計算總頁數

    // 當網址參數改變時
    useEffect(() => {
        setKeyword(urlKeyword);
    }, [urlKeyword]);

    // 統一發送網址更新的函式
    const updateRoute = (params) => {
        const currentParams = Object.fromEntries(searchParams.entries());

        const newParams = {
            area: searchParams.get('area') || '',
            q: searchParams.get('q') || '',
            _page: searchParams.get('_page') || 1,
            ...currentParams,
            ...params, // 覆蓋更新的部分
        };

        // 過濾掉空值，保持網址乾淨
        Object.keys(newParams).forEach((key) => {
            if (newParams[key] === '' || newParams[key] == null) {
                delete newParams[key];
            }
        });

        setSearchParams(newParams);
    };

    // 處理搜尋按鈕/Enter
    const triggerSearch = () => {
        updateRoute({ q: keyword, _page: 1 });
    };

    const onSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            triggerSearch();
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
                        _page: currentPage, // 當前頁數
                        _limit: limit, // 筆數
                        q: urlKeyword, // 關鍵字
                        trail_region: urlArea || undefined, // 地區篩選
                        trail_difficulty: urlDifficulty || undefined, // 難度篩選
                        trail_landscape: urlLandscape || undefined, // 景觀
                        _sort: urlSort || undefined, // 排序欄位
                        _order: urlOrder || undefined,
                    },
                });

                // 從 Header 抓取總數
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
    }, [currentPage, urlKeyword, urlArea, urlDifficulty, urlLandscape, urlSort, urlOrder]);

    // 處理頁碼 Prev、Next
    const handlePageChange = (targetPage) => {
        if (targetPage < 1 || targetPage > totalPages) return;

        // 修正：傳入物件而非單一字串
        updateRoute({ _page: targetPage });

        window.scrollTo({
            top: 200,
            behavior: 'smooth',
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

    // 更新 State 的輔助函式
    const syncListState = (id) => {
        setTrailData((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, trail_popular: (t.trail_popular || 0) + 1 } : t,
            ),
        );
    };

    return (
        <>
            <header className="search-header">
                <Nav />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h3 className="text-white text-center fw-medium fs-7 mb-4 mb-sm-8">
                                步道總覽
                            </h3>
                            <h1 className="text-white text-center fs-4 fs-sm-1 mb-8">
                                Next Step！想要去哪裡？
                            </h1>
                            <form
                                className="search-bar mb-3 px-3 py-2 bg-white rounded-pillmb-3 px-3 py-2 bg-white rounded-pill"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="input-group align-items-center">
                                    <label htmlFor="regionSelect" className="d-none">
                                        請選擇地區
                                    </label>
                                    <select
                                        className="form-select px-4 d-none d-sm-block"
                                        id="regionSelect"
                                        value={urlArea}
                                        onChange={(e) =>
                                            updateRoute({ trail_region: e.target.value, _page: 1 })
                                        }
                                    >
                                        <option value="">請選擇地區</option>
                                        <option value="北部">北部</option>
                                        <option value="中部">中部</option>
                                        <option value="南部">南部</option>
                                        <option value="東部">東部</option>
                                    </select>
                                    <span className="search-divider d-none d-sm-block"></span>
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
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end row-gap-3 mb-3 mb-md-6">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center column-gap-4 mb-3">
                                    <h2 className="text-black-900 mb-2 mb-sm-0 fs-5 fs-sm-2">
                                        步道列表
                                    </h2>
                                    <p className="text-black-700 fw-medium">
                                        找到
                                        <span className="text-primary-300 fw-bold mx-1">
                                            {totalCount}筆
                                        </span>
                                        你可能喜歡的步道景觀
                                    </p>
                                </div>
                                <div className="checkbox-filter d-flex column-gap-2">
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-primary dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <span className="ms-1">{urlDifficulty || '難度'}</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-start shadow mt-2">
                                            <li>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                        updateRoute({
                                                            trail_difficulty: '',
                                                            _page: 1,
                                                        })
                                                    }
                                                >
                                                    難度
                                                </button>
                                            </li>
                                            {difficulty.map((level, index) => (
                                                <li key={index}>
                                                    <button
                                                        className={`dropdown-item ${urlDifficulty === level ? 'active' : ''}`}
                                                        onClick={() =>
                                                            updateRoute({
                                                                trail_difficulty: level,
                                                                _page: 1,
                                                            })
                                                        }
                                                    >
                                                        {level}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-primary dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <span className="ms-1">時間</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-start shadow mt-2">
                                            {estimatedDuration.map((time, index) => {
                                                return (
                                                    <div className="form-check" key={index}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id={`checkDefault${index}`}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`checkDefault${index}`}
                                                        >
                                                            {time}
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-primary dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <span className="ms-1">{urlLandscape || '景觀'}</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-start shadow mt-2">
                                            <li>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                        updateRoute({
                                                            trail_landscape: '',
                                                            _page: 1,
                                                        })
                                                    }
                                                >
                                                    全部景觀
                                                </button>
                                            </li>
                                            {landscape.map((type, index) => (
                                                <li key={index}>
                                                    <button
                                                        className={`dropdown-item ${urlLandscape === type ? 'active' : ''}`}
                                                        onClick={() =>
                                                            updateRoute({
                                                                trail_landscape: type,
                                                                _page: 1,
                                                            })
                                                        }
                                                    >
                                                        {type}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown">
                                <button
                                    className="btn btn-primary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="material-symbols-outlined">swap_vert</i>
                                    <span className="ms-1">
                                        {sortOptions.find(
                                            (opt) => opt.sort === urlSort && opt.order === urlOrder,
                                        )?.label || '排序方式'}
                                    </span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end shadow mt-2">
                                    {sortOptions.map((opt, index) => (
                                        <li key={index}>
                                            <button
                                                className={`dropdown-item ${urlSort === opt.sort && urlOrder === opt.order ? 'active' : ''}`}
                                                onClick={() =>
                                                    updateRoute({
                                                        _sort: opt.sort,
                                                        _order: opt.order,
                                                        _page: 1,
                                                    })
                                                }
                                            >
                                                {opt.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
                                                    handleListClick(trail.id, trail.trail_popular)
                                                }
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
                <PopularTrails onUpdateSuccess={syncListState} hasBorder={true} />

                {/* 主題限定活動 */}
                <SearchTheme />
            </main>
        </>
    );
};

export default TrailSearchPage;
