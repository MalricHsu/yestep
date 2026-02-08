import { useEffect, useRef, useState } from 'react';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';

const MobileFavoriteDropdown = ({ favorites = [], onRemove }) => {
    return (
        <div className="accordion" id="favoriteAccordion">
            {favorites.map((item) => (
                <div
                    className="accordion-item border-0 border-primary-50 border-bottom"
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
                                <Link to={`/plan/${item.id}`} className="btn btn-secondary ">
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
        label: '會員中心',
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
        <ul className="nav nav-underline d-flex flex-nowrap position-fixed w-100 opacity-75">
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
    return <div>會員中心內容</div>;
};

// 暫時的假資料
const MOCK_FAVORITES = [
    {
        id: 1,
        name: '象山親山步道',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        length: '約 1.5 km',
        altitude: '183 m',
    },
    {
        id: 2,
        name: '大坑步道 9 號',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        length: '約 2.3 km',
        altitude: '395 m',
    },
];
const MemberFavorite = () => {
    const handleRemove = (id) => {
        console.log('取消收藏 id:', id);
    };

    return <MobileFavoriteDropdown favorites={MOCK_FAVORITES} onRemove={handleRemove} />;
};

const MemberAnalytics = () => {
    return <div>統計分析</div>;
};

const MemberRecommend = () => {
    return <div>猜你喜歡</div>;
};

const Member = () => {
    const [activeTab, setActiveTab] = useState('member');
    useEffect(() => {
        document.title = '會員中心 | YeStep';
    }, []);
    const handleTabChange = (key) => {
        setActiveTab(key);
        scrollToTopMinus('member-main', 60);
    };
    return (
        <>
            <Nav />
            <section
                className="position-relative"
                style={{ minHeight: '500px', padding: '72px 0 0' }}
            >
                <MemberTabs activeTab={activeTab} onChange={handleTabChange} />
                <main
                    id="member-main container-fluid"
                    className="memberMain"
                    style={{ padding: '105px 5% 0' }}
                >
                    <h2 className="fs-5 fs-md-2">我的收藏</h2>
                    {activeTab === 'member' && <MemberProfile />}
                    {activeTab === 'favorite' && <MemberFavorite />}
                    {activeTab === 'analytics' && <MemberAnalytics />}
                    {activeTab === 'recommend' && <MemberRecommend />}
                </main>
            </section>
        </>
    );
};

export default Member;
