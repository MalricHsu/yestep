import { useEffect, useMemo, useState } from 'react';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { createMessage } from '../slices/infoSlice';

import axios from 'axios';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const searchApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });

const MobileFavoriteDropdown = ({ favorites = [], onRemove }) => {
    return (
        <div className="accordion rounded-md-24 overflow-hidden" id="favoriteAccordion">
            {favorites.map((item) => (
                <div
                    className="accordion-item border-0 border-primary-50 border-bottom overflow-hidden"
                    key={item.id}
                >
                    {/* Header */}
                    <h2 className="accordion-header" id={`heading-${item.id}`}>
                        <button
                            className="accordion-button collapsed p-3 p-md-6"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${item.id}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${item.id}`}
                        >
                            <div className="d-flex w-100 align-items-center gap-3">
                                {/* 圖片 */}
                                <img
                                    src={item.image}
                                    alt=""
                                    style={{
                                        width: 64,
                                        height: 48,
                                        borderRadius: 12,
                                        objectFit: 'cover',
                                        flexShrink: 0,
                                    }}
                                />

                                {/* 標題 */}
                                <div className="flex-grow-1 text-start">
                                    <div className="fw-semibold">{item.name}</div>
                                    <div className="small text-muted">
                                        {item.length} • {item.altitude}
                                    </div>
                                </div>
                            </div>
                        </button>
                    </h2>

                    {/* Content */}
                    <div
                        id={`collapse-${item.id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading-${item.id}`}
                        data-bs-parent="#favoriteAccordion"
                    >
                        <div className="accordion-body  p-3 p-md-6">
                            <div className="d-grid gap-2 mb-3">
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">長度</span>
                                    <span className="fw-semibold">{item.length}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">海拔</span>
                                    <span className="fw-semibold">{item.altitude}</span>
                                </div>
                            </div>

                            <div className="d-grid gap-2">
                                <Link
                                    to={`/plan/${item.trailId ?? item.id}`}
                                    className="btn btn-primary mx-auto"
                                    style={{ width: 'fit-content' }}
                                >
                                    前往規劃
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-text"
                                    onClick={() => onRemove(item.id)}
                                >
                                    取消收藏
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {favorites.length === 0 && (
                <div className="text-center py-5 text-muted">目前沒有收藏步道</div>
            )}
        </div>
    );
};

const MEMBER_TABS = [
    {
        key: 'member',
        label: '會員資料',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z" />
            </svg>
        ),
    },
    {
        key: 'favorite',
        label: '我的收藏',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
            </svg>
        ),
    },
    {
        key: 'analytics',
        label: '統計分析',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M160-160v-320h160v320H160Zm240 0v-640h160v640H400Zm240 0v-440h160v440H640Z" />
            </svg>
        ),
    },
    {
        key: 'recommend',
        label: '你可能會喜歡...',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M200-200v-560 179-19 400Zm80-240h221q2-22 10-42t20-38H280v80Zm0 160h157q17-20 39-32.5t46-20.5q-4-6-7-13t-5-14H280v80Zm0-320h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v258q-14-26-34-46t-46-33v-179H200v560h202q-1 6-1.5 12t-.5 12v56H200Zm409-229q-29-29-29-71t29-71q29-29 71-29t71 29q29 29 29 71t-29 71q-29 29-71 29t-71-29ZM480-120v-56q0-24 12.5-44.5T528-250q36-15 74.5-22.5T680-280q39 0 77.5 7.5T832-250q23 9 35.5 29.5T880-176v56H480Z" />
            </svg>
        ),
    },
];

const MemberTabs = ({ activeTab, onChange }) => {
    return (
        <ul className="nav nav-underline flex-nowrap  w-100 opacity-75">
            {MEMBER_TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                    <li
                        key={tab.key}
                        className={`nav-item w-100 memberTabBtn ${isActive ? 'active' : ''}`}
                    >
                        <button
                            type="button"
                            className={`nav-link w-100 d-flex justify-content-center ${
                                isActive ? 'active' : ''
                            }`}
                            onClick={() => onChange(tab.key)}
                        >
                            {tab.svg}
                            <span className="memberTabLabel">{tab.label}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};
const scrollToTopMinus = (id, offset = 50) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
        top: y,
        behavior: 'smooth',
    });
};
/* =====================
   Tab Contents
===================== */

const MemberProfile = () => {
    const [nickname, setNickname] = useState('YeStep 用戶');
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        console.log('更新暱稱為:', nickname);
    };

    return (
        <div className="bg-white rounded-24 p-4 p-md-6" style={{ maxWidth: 520 }}>
            <h3 className="mb-4">會員資料</h3>

            <form onSubmit={handleSubmit}>
                {/* 帳號 */}
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="account"
                        value="yestep_user01"
                        readOnly
                    />
                    <label htmlFor="account">帳號</label>
                </div>

                {/* 密碼 */}
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value="12345678"
                        readOnly
                    />
                    <label htmlFor="password">密碼</label>
                </div>

                {/* Email */}
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="emailProfile"
                        value="user@yestep.com"
                        readOnly
                    />
                    <label htmlFor="emailProfile">Email</label>
                </div>

                {/* 暱稱（可編輯） */}
                <div className="form-floating mb-4">
                    <input
                        type="text"
                        className="form-control"
                        id="nickname"
                        value={nickname}
                        disabled={!isEditing}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <label htmlFor="nickname">暱稱</label>
                </div>

                <div className="d-flex gap-2">
                    {!isEditing ? (
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => setIsEditing(true)}
                        >
                            編輯暱稱
                        </button>
                    ) : (
                        <>
                            <button type="submit" className="btn btn-primary">
                                儲存變更
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                取消
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

const MemberFavorite = ({ user }) => {
    // 1. 接收 user props
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let mounted = true;

        const fetchFavorites = async () => {
            // 如果沒有 user 資料（例如尚未登入完全），就不執行
            if (!user || !user.id) return;

            try {
                setLoading(true);
                setError('');

                const token = Cookies.get('token'); // 2. 取得 Token

                // 3. 修改 API 請求：
                //    - 加入 userId 篩選
                //    - 加入 Authorization Header
                const res = await searchApi.get(`/favorites`, {
                    params: {
                        userId: user.id, // 只抓這個人的
                        _limit: 9999,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`, // 帶上通行證
                    },
                });

                const list = Array.isArray(res.data) ? res.data : [];

                // 轉成 MobileFavoriteDropdown 需要的欄位 (邏輯不變)
                const mapped = list.map((f) => ({
                    id: f.id,
                    trailId: f.trailId || f.themeId, // 兼容你的不同命名可能
                    name: f.trailName,
                    image: f.trailImage,
                    length: f.trail_length ?? '—',
                    altitude: f.trail_altitude ?? '—',
                }));

                if (mounted) setFavorites(mapped);
            } catch (e) {
                if (mounted) {
                    console.error(e);
                    setError('收藏資料載入失敗');
                    setFavorites([]);
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchFavorites();

        return () => {
            mounted = false;
        };
    }, [user]); // 加入 user 作為依賴，當 user 改變時重抓

    const handleRemove = async (favId) => {
        const token = Cookies.get('token'); // 刪除時也要 Token

        // 樂觀更新 UI
        const prev = favorites;
        setFavorites((p) => p.filter((x) => x.id !== favId));

        try {
            await searchApi.delete(`/favorites/${favId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (e) {
            console.error('刪除失敗', e);
            setError('取消收藏失敗，請稍後再試');
            setFavorites(prev); // 回滾
        }
    };

    return (
        <div className="d-grid gap-3" style={{ maxWidth: 520 }}>
            {loading && <p className="text-muted mb-0">載入收藏中...</p>}
            {error && <p className="text-danger mb-0">{error}</p>}

            {/* 如果沒資料顯示提示 */}
            {!loading && favorites.length === 0 && !error && (
                <div className="text-center py-5 text-muted">目前沒有收藏步道</div>
            )}

            <MobileFavoriteDropdown favorites={favorites} onRemove={handleRemove} />
        </div>
    );
};

const REGION_KEYS = ['北部', '中部', '南部', '東部'];

const normalizeRegion = (r) => {
    if (!r) return '其他';
    if (REGION_KEYS.includes(r)) return r;
    return '其他';
};

const countByRegion = (list, getRegion) => {
    const acc = { 北部: 0, 中部: 0, 南部: 0, 東部: 0, 其他: 0 };
    (Array.isArray(list) ? list : []).forEach((item) => {
        const region = normalizeRegion(getRegion(item));
        acc[region] = (acc[region] || 0) + 1;
    });
    return acc;
};

const calcPercent = (num, den) => {
    if (!den) return 0;
    return Math.round((num / den) * 1000) / 10; // 1 位小數
};

export const MemberAnalytics = () => {
    const [trails, setTrails] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    useEffect(() => {
        let mounted = true;

        const fetchAll = async () => {
            try {
                setLoading(true);
                setErr('');

                // 兩支 API 一起打（並行）
                const [trailsRes, favRes] = await Promise.all([
                    searchApi.get('/trails', { params: { _limit: 9999 } }),
                    searchApi.get('/favorites', { params: { _limit: 9999 } }),
                ]);

                if (!mounted) return;

                setTrails(Array.isArray(trailsRes.data) ? trailsRes.data : []);
                setFavorites(Array.isArray(favRes.data) ? favRes.data : []);
            } catch (e) {
                if (!mounted) return;
                setErr('統計資料載入失敗（API 可能暫時有問題）');
                setTrails([]);
                setFavorites([]);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchAll();
        return () => {
            mounted = false;
        };
    }, []);

    const REGION_COLORS = useMemo(
        () => ({
            北部: '#4F6947',
            中部: '#8AA96B',
            南部: '#F2C14E',
            東部: '#4D9DE0',
            其他: '#B0B7C3',
        }),
        [],
    );

    // 1) 步道分布（分母：全部 trails）
    const trailsRegionCount = useMemo(() => {
        return countByRegion(trails, (t) => t.trail_region);
    }, [trails]);

    // 2) 收藏分布（分母：全部 favorites）
    const favRegionCount = useMemo(() => {
        return countByRegion(favorites, (f) => f.trail_region);
    }, [favorites]);

    // 3) 各區收藏率：收藏筆數 / 該區步道數
    const favRateByRegion = useMemo(() => {
        const regions = [...REGION_KEYS, '其他'];

        return regions.map((r) => {
            const trailCount = trailsRegionCount[r] || 0;
            const favCount = favRegionCount[r] || 0;
            return {
                region: r,
                trailCount,
                favCount,
                rate: calcPercent(favCount, trailCount), // %
            };
        });
    }, [trailsRegionCount, favRegionCount]);

    const doughnutDataTrails = useMemo(() => {
        const labels = [...REGION_KEYS, '其他'];
        const data = labels.map((k) => trailsRegionCount[k] || 0);

        return {
            labels,
            datasets: [
                {
                    label: '步道數',
                    data,
                    backgroundColor: [
                        '#4F6947', // 北部
                        '#8AA96B', // 中部
                        '#F2C14E', // 南部
                        '#4D9DE0', // 東部
                        '#B0B7C3', // 其他
                    ],
                    borderColor: ['#4F6947', '#8AA96B', '#F2C14E', '#4D9DE0', '#B0B7C3'],
                    borderWidth: 1,
                },
            ],
        };
    }, [trailsRegionCount]);

    const barDataFavRate = useMemo(() => {
        const labels = favRateByRegion.map((x) => x.region);
        const data = favRateByRegion.map((x) => x.rate);

        return {
            labels,
            datasets: [
                {
                    label: '收藏率（%）',
                    data,
                    backgroundColor: ['#4F6947', '#8AA96B', '#F2C14E', '#4D9DE0', '#B0B7C3'],
                    borderColor: ['#3E5439', '#6F8E54', '#D9A62C', '#2F7FBE', '#8F98A6'],
                    borderWidth: 1,
                    borderRadius: 8,
                },
            ],
        };
    }, [favRateByRegion]);

    const barOptionsFavRate = useMemo(() => {
        return {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const region = ctx.label;
                            const item = favRateByRegion.find((x) => x.region === region);
                            if (!item) return `${ctx.dataset.label}: ${ctx.parsed.y}%`;
                            return `收藏率：${item.rate}%（收藏 ${item.favCount} / 步道 ${item.trailCount}）`;
                        },
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 100,
                    ticks: {
                        callback: (v) => `${v}%`,
                    },
                },
            },
        };
    }, [favRateByRegion]);
    return (
        <div className="d-grid gap-4">
            {loading && <p className="text-muted mb-0">載入統計中...</p>}
            {err && <p className="text-danger mb-0">{err}</p>}

            {/* Chart 1: 步道區域分佈 */}
            <div className="bg-white rounded-24 p-4 p-md-6">
                <div className="d-flex align-items-end justify-content-between gap-3 mb-3">
                    <div>
                        <h3 className="mb-1">步道區域比例</h3>
                        <p className="text-muted small mb-0">分母：全部步道（/trails）</p>
                    </div>
                    <div className="text-muted small">總步道：{trails.length}</div>
                </div>

                <div style={{ maxWidth: 520 }}>
                    <Doughnut data={doughnutDataTrails} />
                </div>
            </div>

            {/* Chart 2: 各區收藏率 */}
            <div className="bg-white rounded-24 p-4 p-md-6">
                <div className="d-flex align-items-end justify-content-between gap-3 mb-3">
                    <div>
                        <h3 className="mb-1">各區收藏率</h3>
                        <p className="text-muted small mb-0">
                            公式：該區收藏筆數（/favorites） ÷ 該區步道數（/trails）
                        </p>
                    </div>
                    <div className="text-muted small">總收藏：{favorites.length}</div>
                </div>

                <Bar data={barDataFavRate} options={barOptionsFavRate} />

                {/* 讓你看數字（方便 debug / 對照） */}
                <div className="mt-4">
                    <div className="small text-muted mb-2">步道收藏比例列表</div>
                    <ul className="list-unstyled d-grid gap-2 mb-0">
                        {favRateByRegion.map((x) => (
                            <li
                                key={x.region}
                                className="d-flex justify-content-between align-items-center rounded-12 px-3 py-2"
                                style={{
                                    backgroundColor: `${REGION_COLORS[x.region] ?? '#B0B7C3'}22`,
                                    border: `1px solid ${REGION_COLORS[x.region] ?? '#B0B7C3'}55`,
                                }}
                            >
                                <span className="d-flex align-items-center gap-2">
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 999,
                                            backgroundColor: REGION_COLORS[x.region] ?? '#B0B7C3',
                                            display: 'inline-block',
                                        }}
                                    />
                                    <span className="fw-semibold">{x.region}</span>
                                </span>
                                <span className="text-muted">
                                    收藏 {x.favCount} / 步道 {x.trailCount}（{x.rate}%）
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const pickRandomUnique = (arr, count) => {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    const pool = [...arr];
    const result = [];
    const n = Math.min(count, pool.length);

    for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        result.push(pool[idx]);
        pool.splice(idx, 1);
    }

    return result;
};

const MemberRecommend = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchRecommend = async () => {
            try {
                setLoading(true);
                setError('');

                // 與 TrailSearchPage 同一支 API：/trails
                // 這裡先抓多一點再隨機抽 3 筆（json-server 沒有隨機 API）
                const res = await searchApi.get('/trails', {
                    params: { _limit: 200 },
                });

                const list = Array.isArray(res.data) ? res.data : [];
                const picked = pickRandomUnique(list, 3);

                if (isMounted) setItems(picked);
            } catch (e) {
                if (isMounted) {
                    setError('推薦步道載入失敗');
                    setItems([]);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchRecommend();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="py-6">
            {loading && <p className="text-muted">載入推薦中...</p>}

            {(error || items.length === 0) && !loading ? (
                <div
                    className="card border-0 rounded-24 shadow-sm overflow-hidden"
                    style={{ maxWidth: 420 }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1502439502085-ebf78244370a?q=80&w=1849&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="recommend placeholder"
                        style={{ height: 160, width: '100%', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                        <h5 className="card-title mb-2">猜你喜歡</h5>
                        <p className="text-muted small mb-0">
                            {error ? error : '目前沒有推薦步道，稍後再試。'}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {items.map((trail) => (
                        <div className="col-12 col-sm-6 col-xl-4" key={trail.id}>
                            <div className="card border-0 rounded-24 shadow-sm h-100 overflow-hidden">
                                <img
                                    src={trail.trail_image}
                                    className="card-img-top rounded-top-24"
                                    alt={trail.trail_name}
                                    style={{ height: 180, objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title mb-2">{trail.trail_name}</h5>
                                    <p className="text-muted small mb-1">
                                        {trail.trail_address || trail.trail_region || '—'}
                                    </p>
                                    <p className="text-muted small mb-3">
                                        {trail.trail_hour || ''}
                                    </p>

                                    <Link
                                        to={`/detail/${trail.id}`}
                                        className="btn btn-primary mt-auto"
                                    >
                                        查看步道
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Member = () => {
    const [activeTab, setActiveTab] = useState('member');
    // 1. 初始化時直接讀取 Cookie，避免第一次 render 是 null 導致畫面閃爍
    // 如果 Cookie 沒資料，就保持 null
    const [currentUser, setCurrentUser] = useState(() => {
        const userStr = Cookies.get('user');
        return userStr ? JSON.parse(userStr) : null;
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = '會員中心 | YeStep';

        const token = Cookies.get('token');

        // 2. 檢查權限：如果沒有 user 資料 或 沒有 token
        if (!currentUser || !token) {
            dispatch(createMessage({ text: '請先登入會員', type: 'danger' })); // 紅色通常 type 是 danger
            navigate('/login', { replace: true }); // 加上 replace: true 防止按上一頁又回來
        }
    }, [currentUser, dispatch, navigate]); // 依賴加入 currentUser

    const handleTabChange = (key) => {
        setActiveTab(key);
        scrollToTopMinus('member-main', 120);
    };

    const currentTab = MEMBER_TABS.find((tab) => tab.key === activeTab) || MEMBER_TABS[0];

    // 3. 安全防護：如果還沒確認完使用者，先不要渲染下面的內容，避免子元件報錯
    if (!currentUser) return null;

    return (
        <>
            <div className="memberPage">
                <Nav />
                <MemberTabs activeTab={activeTab} onChange={handleTabChange} />
                <main
                    id="member-main"
                    className="memberMain container-fluid"
                    style={{ padding: '0 5%' }}
                >
                    <h2 className="fs-5 fs-md-2 pt-8 pb-4 pt-md-0 pb-md-8">{currentTab.label}</h2>

                    {/* ★ 4. 關鍵修正：把 user 資料透過 props 傳下去 ★ */}
                    {activeTab === 'member' && (
                        <MemberProfile user={currentUser} setUser={setCurrentUser} />
                    )}
                    {activeTab === 'favorite' && <MemberFavorite user={currentUser} />}
                    {activeTab === 'analytics' && <MemberAnalytics user={currentUser} />}

                    {/* 推薦通常是隨機或通用的，可能不需要 user，但如果要過濾已收藏的就需要 */}
                    {activeTab === 'recommend' && <MemberRecommend />}
                </main>
            </div>
        </>
    );
};

export default Member;
