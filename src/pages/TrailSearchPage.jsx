//React套件
import { useState, useRef, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
// 工具
import { getErrorMessage } from '../utils/error';
// 元件
import Nav from '../components/Nav';
import TrailLoading from '../components/TrailLoading';
import SearchFilterDropdown from '../components/SearchFilterDropdown';
import SearchTrailList from '../components/SearchTrailList';
import SearchPagination from '../components/SearchPagination';
import PopularTrails from '../components/PopularTrails';
import SearchTheme from '../components/SearchTheme';
// API
import { TrailsApi } from '../server/api';
// 圖檔
import Result from '../assets/images/home/diffcard-03.webp';

// 篩選、排序
const durationMapping = {
  '3小時內': ['0.5小時', '1~1.5小時', '1-2小時', '2~2.5小時', '2~3小時'],
  '3-6小時': ['3~4小時', '半天'],
  '6-12小時': ['一天'],
  '12小時-兩天': ['一至二天'],
  兩天以上: ['一天以上'],
};
const sortOptions = [
  { label: '難易度由高到低', sort: 'trail_difficulty_level', order: 'desc' },
  { label: '難易度由低到高', sort: 'trail_difficulty_level', order: 'asc' },
  { label: '熱門程度由高到低', sort: 'trail_popular', order: 'desc' },
  { label: '熱門程度由低到高', sort: 'trail_popular', order: 'asc' },
];

// 取得多選參數，將 'A,B' 轉為 ['A', 'B']
const getSplitParams = (searchParams, key) => {
  const value = searchParams.get(key);
  return value ? value.split(',') : [];
};

const TrailSearchPage = () => {
  // 網頁標題
  useEffect(() => {
    document.title = '步道總覽 | YeStep';
  }, []);

  // 取得與設定網址參數
  const [searchParams, setSearchParams] = useSearchParams();

  // 目前網址狀態
  const limit = 8; // 每頁筆數
  const urlArea = searchParams.get('trail_region') || '';
  const urlKeyword = searchParams.get('q') || '';
  const urlSort = searchParams.get('_sort') || '';
  const urlOrder = searchParams.get('_order') || 'desc';
  const currentPage = parseInt(searchParams.get('_page')) || 1;

  const urlDifficulty = useMemo(
    () => getSplitParams(searchParams, 'trail_difficulty'),
    [searchParams],
  );
  const urlLandscape = useMemo(
    () => getSplitParams(searchParams, 'trail_landscape'),
    [searchParams],
  );
  const urlDuration = useMemo(() => getSplitParams(searchParams, 'trail_hour'), [searchParams]);

  const [isLoading, setIsLoading] = useState(true);

  // 步道資料
  const [keyword, setKeyword] = useState(urlKeyword);
  const [trailData, setTrailData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / limit); // 計算總頁數
  const searchSection = useRef(null);

  // 當網址參數改變時
  useEffect(() => {
    setKeyword(urlKeyword);
  }, [urlKeyword]);

  // 統一發送網址更新的函式
  const updateRoute = (newParams) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          next.delete(key);
        } else {
          // 如果是陣列存成 A,B 格式
          next.set(key, Array.isArray(value) ? value.join(',') : value);
        }
      });
      next.set('_page', newParams._page || '1'); // 預設跳回第一頁
      return next;
    });
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

  // 處理 Checkbox 切換
  const handleCheckboxChange = (key, value, currentArray) => {
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value) // 已存在就移除
      : [...currentArray, value]; // 不存在就加入

    updateRoute({ [key]: newArray, _page: 1 });
  };

  // 全部清除
  const handleClearAll = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams();

      // 如果想保留關鍵字和地區，就從舊的拿
      if (prev.has('q')) next.set('q', prev.get('q'));
      if (prev.has('trail_region')) next.set('trail_region', prev.get('trail_region'));

      // 強制分頁回到第 1 頁
      next.set('_page', '1');
      return next;
    });
  };

  // 步道列表
  useEffect(() => {
    const getTrailScenery = async () => {
      const startTime = Date.now();
      setIsLoading(true);

      try {
        const params = new URLSearchParams();

        // 基礎參數
        params.append('_page', currentPage);
        params.append('_limit', limit);
        if (urlKeyword) params.append('q', urlKeyword);
        if (urlArea) params.append('trail_region', urlArea);
        if (urlSort) params.append('_sort', urlSort);
        if (urlOrder) params.append('_order', urlOrder);

        // 【關鍵】多選部分：循環陣列，重複 append 同一個 Key
        urlDifficulty.forEach((val) => params.append('trail_difficulty', val));
        urlLandscape.forEach((val) => params.append('trail_landscape', val));

        // 處理時間多選映射
        urlDuration.forEach((label) => {
          const backendValues = durationMapping[label] || [];
          backendValues.forEach((val) => {
            // 使用重複 key 的方式發送，例如 ?trail_hour=0.5小時&trail_hour=1-2小時
            params.append('trail_hour', val);
          });
        });

        const res = await TrailsApi.get(`/trails`, { params });

        // 計算已經過了多久
        const endTime = Date.now();
        const durationTime = endTime - startTime;
        // 如果不足 1 秒，計算還差多少毫秒
        const delay = Math.max(0, 1000 - durationTime);

        setTimeout(() => {
          // 更新資料
          const countFromHeader = res.headers['x-total-count'];
          if (countFromHeader) setTotalCount(parseInt(countFromHeader));
          setTrailData(res.data);

          // 執行滾動 (在 Loading 關閉前滾動可以減少視覺閃爍)
          if (searchSection.current) {
            const elementPosition = searchSection.current.offsetTop;
            const offsetPosition = elementPosition - 75;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }

          // 最後才關閉 Loading
          setIsLoading(false);
        }, delay);
      } catch (error) {
        console.error('API 錯誤:', getErrorMessage(error));
        setIsLoading(false);
      }
    };
    getTrailScenery();
  }, [
    currentPage,
    urlKeyword,
    urlArea,
    urlDifficulty,
    urlDuration,
    urlLandscape,
    urlSort,
    urlOrder,
  ]);

  // 更新 State 的輔助函式
  const syncListState = (id) => {
    setTrailData((prev) =>
      prev.map((t) => (t.id === id ? { ...t, trail_popular: (t.trail_popular || 0) + 1 } : t)),
    );
  };

  return (
    <>
      <header className="search-header">
        <Nav />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3 className="text-white text-center fw-medium fs-7 mb-4 mb-sm-8">步道總覽</h3>
              <h1 className="text-white text-center fs-4 fs-sm-1 mb-8">Next Step！想要去哪裡？</h1>
              <form
                className="search-bar mb-3 px-3 py-2 bg-white rounded-pill mb-3 px-3 py-2 bg-white rounded-pill"
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
                    onChange={(e) => updateRoute({ trail_region: e.target.value, _page: 1 })}
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
                  <button className="btn btn-primary" type="button" onClick={triggerSearch}>
                    搜尋
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="search bg-primary-50 py-8" ref={searchSection}>
          <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end row-gap-3 mb-3 mb-md-6">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center column-gap-4 mb-3">
                  <h2 className="text-black-900 mb-2 mb-sm-0 fs-5 fs-sm-2">步道列表</h2>
                  <p className="text-black-700 fw-medium">
                    找到
                    <span className="text-primary-300 fw-bold mx-1">{totalCount}筆</span>
                    你可能喜歡的步道景觀
                  </p>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  <div className="order-md-2">
                    {/* 清除全部 */}
                    {(urlDifficulty.length > 0 ||
                      urlDuration.length > 0 ||
                      urlLandscape.length > 0) && (
                      <button
                        type="button"
                        className="btn btn-primary-300"
                        onClick={handleClearAll}
                      >
                        <span className="d-flex align-items-center ms-1">
                          清除全部
                          <i className="material-symbols-outlined rounded-pill">close</i>
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="checkbox-filter d-flex column-gap-2 order-md-1">
                    {/* 難度 */}
                    <SearchFilterDropdown
                      label="難度"
                      apiKey="trail_difficulty"
                      selectedValues={urlDifficulty}
                      onCheckboxChange={handleCheckboxChange}
                    />

                    {/* 時間 */}
                    <SearchFilterDropdown
                      label="時間"
                      apiKey="trail_hour"
                      selectedValues={urlDuration}
                      onCheckboxChange={handleCheckboxChange}
                    />

                    {/* 景觀 */}
                    <SearchFilterDropdown
                      label="景觀"
                      apiKey="trail_landscape"
                      selectedValues={urlLandscape}
                      onCheckboxChange={handleCheckboxChange}
                      isGrid={true}
                    />
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
                    {sortOptions.find((opt) => opt.sort === urlSort && opt.order === urlOrder)
                      ?.label || '排序方式'}
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
              {isLoading ? (
                <TrailLoading />
              ) : (
                <div className="row row-gap-3 row-gap-sm-6">
                  {trailData.length > 0 ? (
                    trailData.map((trail) => (
                      <SearchTrailList key={trail.id} trail={trail} syncListState={syncListState} />
                    ))
                  ) : (
                    <div className="col">
                      <div className="text-center pt-15">
                        <img className="img-fluid rounded-pill mb-4" src={Result} alt="步道圖" />
                        <h6 className="fs-5 mb-2">找不到符合條件的步道</h6>
                        <p className="text-black-500">換個關鍵字試試？或刪減一些篩選條件</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 分頁 */}
            {!isLoading && trailData.length > 0 && (
              <SearchPagination
                totalPages={totalPages}
                currentPage={currentPage}
                updateRoute={updateRoute}
              />
            )}
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
