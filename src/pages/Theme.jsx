import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import bg02 from '../assets/images/trailtheme/bg02.png';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';

const trailApi = axios.create({
    baseURL: 'https://yestep.zeabur.app/',
});

//每月活動內容
const activityIntroData = [
    {
        picUrl: 'https://images.unsplash.com/photo-1746180339336-a07e5106cb87?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M',
        desc: '油桐花是落葉喬木，花期約在每年4月至5月，盛開時花朵如雪般飄落，因而有「五月雪」的美稱，主要品種有白花桐樹和千年桐。',
    },
    {
        picUrl: 'https://images.unsplash.com/photo-1746180339820-3d1741f52f4a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M',
        desc: '油桐花因其經濟價值被引進台灣，種子可榨取桐油作為防水塗層或家具原料。',
    },
    {
        picUrl: 'https://images.unsplash.com/photo-1746180340318-873b8836e008?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M',
        desc: '每年桐花開花時間受到溫度及降雨量影響，一般來說開花期在每年的4月份，盛開期在4月下旬到5月上旬，桐花花期為1~3星期',
    },
];
//四大主題內容
const THEME_SECTIONS = [
    {
        id: 'fantasy',
        type: '忙裡偷閒',
        chips: ['交通便利', '時程短', '無需裝備'],
        title: '忙裡偷閒',
        desc: '在城市與山林之間，不用遠行、不必準備太多，就能走進自然、放慢腳步。挑一條適合今天心情的步道，讓呼吸回到剛剛好的節奏。',
        bg: 'url(https://images.unsplash.com/photo-1572715381359-002b1eabd56b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
    },
    {
        id: 'relaxing',
        type: '舒壓放鬆',
        chips: ['瀑布', '森林', '芬多精'],
        title: '舒壓放鬆',
        desc: '把壓力留在山下，跟著水聲與樹影慢慢走，讓呼吸變深、心情變輕。',
        bg: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1470&auto=format&fit=crop)',
    },
    {
        id: 'familyHiking',
        type: '親子步道',
        chips: ['平緩', '好走', '全家同樂'],
        title: '親子步道',
        desc: '大手牽小手一起出發，選一條不累又有風景的路，讓孩子也愛上戶外。',
        bg: 'url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1470&auto=format&fit=crop)',
    },
    {
        id: 'tungBlossom',
        type: '桐花步道',
        chips: ['四月雪', '春季限定', '浪漫花雨'],
        title: '桐花步道',
        desc: '走進會下雪的春天，沿路都是白色花毯與微風的香氣。',
        bg: 'url(https://images.unsplash.com/photo-1746180340407-1d7f647cf61c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
    },
];
//取出API資料
const useTrails = () => {
    const [trails, setTrails] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getTrails = async () => {
            try {
                setLoading(true);
                const res = await trailApi.get('/theme');
                setTrails(res.data);
                console.log(res.data);
            } catch (error) {
                console.log('API 錯誤：', error);
            } finally {
                setLoading(false);
            }
        };

        getTrails();
    }, []);

    return { trails, loading };
};
//工具－依主題分組
const groupByType = (trails) =>
    trails.reduce((acc, t) => {
        const key = t.trail_type || '未分類';
        (acc[key] ||= []).push(t);
        return acc;
    }, {});

//元件-表單
const RegistrationForm = () => {
    const sessions = useMemo(() => Array.from({ length: 7 }, (_, i) => i + 1), []);
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        session: '',
        qty: 0,
        consent: false,
    });
    const [errors, setErrors] = useState({});

    // 共用 input change
    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // 人數加減
    const handleQty = (delta) => {
        setForm((prev) => {
            const next = Math.max(0, Math.min(10, Number(prev.qty) + delta));
            return { ...prev, qty: next };
        });
    };

    //表單驗證
    const validate = () => {
        const newErrors = {};
        // 姓名
        if (!form.name.trim()) {
            newErrors.name = '請輸入您的姓名';
        }

        // 電話（09xxxxxxxx 或 10 碼數字）
        if (!form.phone.trim()) {
            newErrors.phone = '請輸入您的聯絡電話';
        } else if (!/^(\d{10}|09\d{8})$/.test(form.phone)) {
            newErrors.phone = '您的電話格式不正確';
        }

        // Email
        if (!form.email.trim()) {
            newErrors.email = '請輸入您的Email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = '您的Email格式不正確';
        }

        // 場次
        if (!form.session) {
            newErrors.session = '請您選擇想要參與的活動場次';
        }

        // 人數
        if (form.qty <= 0) {
            newErrors.qty = '人數至少 1 人';
        }

        // 同意條款
        if (!form.consent) {
            newErrors.consent = '請勾選同意條款';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* ===== 送出 ===== */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await trailApi.post('/registrations', form);
            alert('報名成功！');
            setForm({ name: '', phone: '', email: '', session: '', qty: 0, consent: false });
        } catch (error) {
            console.log(error);
            alert('報名失敗，請稍後再試');
        }

        // 成功後可清空
        setForm({ name: '', phone: '', email: '', session: '', qty: 0, consent: false });
    };
    return (
        <form
            className="registration bg-white p-4 p-md-6 rounded-24 d-flex flex-column gap-4 gap-md-5"
            onSubmit={handleSubmit}
            noValidate
        >
            <h2 className="sub1-bold text-primary-300 text-center">
                <span className="fw-normal text-primary-200 fs-5">\</span> 立即報名導覽{' '}
                <span className="fw-normal text-primary-200 fs-5">/</span>
            </h2>

            {/* 姓名 */}
            <div className="form-floating">
                <input
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="registerName"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="姓名"
                    required
                />
                <label htmlFor="registerName">
                    姓名<span className="text-red ps-1">*</span>
                </label>
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            {/* 聯絡電話 */}
            <div className="form-floating">
                <input
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    id="phoneNumber"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0900-000-000"
                    required
                />
                <label htmlFor="phoneNumber">
                    聯絡電話<span className="text-red ps-1">*</span>
                </label>
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            {/* Email */}
            <div className="form-floating">
                <input
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                />
                <label htmlFor="email">
                    E-mail<span className="text-red ps-1">*</span>
                </label>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* 活動場次 */}
            <div>
                <label htmlFor="session" className="form-label">
                    活動場次<span className="text-red ps-1">*</span>
                </label>
                <select
                    className={`form-select ${errors.session ? 'is-invalid' : ''}`}
                    id="session"
                    name="session"
                    value={form.session}
                    onChange={handleChange}
                >
                    <option value="">請選擇活動場次</option>
                    {sessions.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
                {errors.session && <div className="invalid-feedback d-block">{errors.session}</div>}
            </div>

            {/* 參加人數 */}
            <div>
                <label className="mb-2">
                    參加人數<span className="text-red ps-1">*</span>
                </label>

                <div className="input-group mb-1">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => handleQty(-1)}
                    >
                        －
                    </button>

                    <input
                        className={`form-control text-center ${errors.qty ? 'is-invalid' : ''}`}
                        name="qty"
                        type="text"
                        min="0"
                        max="10"
                        value={form.qty}
                        onChange={(e) => {
                            const v = e.target.value;
                            if (v === '') return setForm((p) => ({ ...p, qty: '' }));
                            setForm((p) => ({
                                ...p,
                                qty: Math.max(0, Math.min(10, Number(v))),
                            }));
                        }}
                        onBlur={() => setForm((p) => ({ ...p, qty: p.qty === '' ? 0 : p.qty }))}
                    />

                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => handleQty(1)}
                    >
                        ＋
                    </button>
                </div>

                {errors.qty && <div className="invalid-feedback d-block">{errors.qty}</div>}
            </div>

            {/* 同意條款 */}
            <div className="form-check">
                <input
                    className={`form-check-input ${errors.consent ? 'is-invalid' : ''}`}
                    id="checkDefaultOn"
                    name="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={handleChange}
                />
                <label
                    className="form-check-label text-black-700"
                    htmlFor="checkDefaultOn"
                    style={{ cursor: 'pointer' }}
                >
                    我同意活動照片可作為宣傳使用
                </label>
                {errors.consent && <div className="invalid-feedback d-block">{errors.consent}</div>}
            </div>

            <button type="submit" className="btn btn-primary">
                送出
            </button>
        </form>
    );
};

const Theme = () => {
    const { trails, loading: trailsLoading } = useTrails();
    const trailsByType = groupByType(trails);
    const [activeId, setActiveId] = useState('monthlyActivity');
    const navItems = useMemo(
        () => [
            { id: 'monthlyActivity', label: '每月活動' },
            { id: 'fantasy', label: '忙裡偷閒' },
            { id: 'relaxing', label: '舒壓放鬆' },
            { id: 'familyHiking', label: '親子步道' },
        ],
        [],
    );

    const scrollToId = (id) => {
        setActiveId(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        document.title = '主題活動 | YeStep';

        const sections = navItems.map((i) => document.getElementById(i.id)).filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                // 取最先進入視窗中心的那個 section
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visible?.target?.id) {
                    setActiveId(visible.target.id);
                }
            },
            {
                rootMargin: '-50% 0px -50% 0px',
                threshold: [0.1, 0.25, 0.5, 0.75, 1],
            },
        );

        sections.forEach((sec) => observer.observe(sec));

        return () => observer.disconnect();
    }, [navItems]);

    return (
        <>
            <Nav />
            <header
                style={{
                    backgroundImage: `url("${bg02}"), url("https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
                    backgroundRepeat: 'no-repeat',
                    height: 'clamp(300px, calc(310px + 15.5vw), 600px)',
                    backgroundSize: 'contain, cover',
                    backgroundPosition: '50% 103%, 50% 80%',
                }}
                className="d-flex flex-column align-items-center justify-content-center position-relative"
            >
                <h1 className="sub1-medium text-white">主題活動</h1>
                <h2 className="text-white fs-4 fs-lg-1 py-4 pt-sm-24 text-center">
                    一起走進自然
                    <span className="d-inline-block">找回你的節奏</span>
                </h2>
                <p className="text-primary-100 sub1-medium">讓自然成為你的休息室</p>

                <ul
                    className="nav nav-underline position-absolute bottom-0 d-sm-none opacity-75"
                    style={{
                        flexWrap: 'nowrap',
                        overflowX: 'scroll',
                        scrollbarWidth: 'none',
                    }}
                >
                    {navItems.map((item) => (
                        <li key={item.id} className="nav-item" style={{ minWidth: 'fit-content' }}>
                            <button
                                type="button"
                                className={`nav-link body1-medium ${
                                    activeId === item.id ? 'active' : ''
                                }`}
                                aria-current={activeId === item.id ? 'page' : undefined}
                                onClick={() => scrollToId(item.id)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <ul className="nav nav-pills mt-8 d-none d-sm-flex gap-2">
                    {navItems.map((item) => (
                        <li key={item.id} className="nav-item">
                            <button
                                type="button"
                                className={`nav-link body1-bold ${
                                    activeId === item.id ? 'active' : ''
                                }`}
                                aria-current={activeId === item.id ? 'page' : undefined}
                                onClick={() => scrollToId(item.id)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </header>

            <section
                className="monthlyActivity py-8 container-fluid"
                style={{ maxWidth: '1360px', scrollMarginTop: '75px', padding: '0 5%' }}
                id="monthlyActivity"
            >
                <h2 className="body1-medium text-primary-300">每月活動</h2>

                <h3 className="fs-5 fs-md-2 mb-4">油桐花季</h3>

                <ul className="activityIntro list-unstyled bg-white p-4 p-md-6 rounded-24 d-grid mb-3 mb-md-6 gap-5 gap-md-6">
                    {activityIntroData.map((item, index) => (
                        <li key={index}>
                            <img
                                src={item.picUrl}
                                alt=""
                                className="card-img rounded-12"
                                style={{
                                    maxHeight: '250px',
                                    objectFit: 'cover',
                                    aspectRatio: '350/240',
                                }}
                            />
                            <div className="mt-3">
                                <p className="text-black-700">{item.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <section className="navigationAndRegistration d-grid gap-3 gap-md-6">
                    <div className="navigation bg-white p-4 p-md-6 rounded-24">
                        <h2 className="sub1-bold text-primary-300 text-center">
                            桐花漫遊導覽｜帶你走入桐花步道，認識油桐花生態與文化事
                        </h2>
                        <img
                            src="https://images.unsplash.com/photo-1746180339820-3d1741f52f4a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="card-img rounded-12 mt-3 mb-6"
                        />
                        <ul className="list-unstyled d-flex flex-column pb-3">
                            <li className="d-flex gap-6 py-3 border-bottom border-primary-100">
                                <h3 className="body2-medium text-primary-300 flex-shrink-0">
                                    活動名稱
                                </h3>
                                <p className="text-black-800">
                                    桐花漫遊導覽｜帶你走入桐花步道，認識油桐花生態與文化故事
                                </p>
                            </li>
                            <li className="d-flex gap-6 py-3 border-bottom border-primary-100">
                                <h3 className="body2-medium text-primary-300 flex-shrink-0">
                                    活動地點
                                </h3>
                                <p className="text-black-800">神棹山桐花步道</p>
                            </li>
                            <li className="d-flex gap-6 py-3 border-bottom border-primary-100">
                                <h3 className="body2-medium text-primary-300 flex-shrink-0">
                                    活動對象
                                </h3>
                                <p className="text-black-800">
                                    親子家庭、朋友同樂、攝影愛好者、健行愛好者
                                </p>
                            </li>
                            <li className="d-flex gap-6 py-3 border-bottom border-primary-100">
                                <h3 className="body2-medium text-primary-300 flex-shrink-0">
                                    活動內容
                                </h3>
                                <p className="text-black-800">桐花步道導覽</p>
                            </li>
                            <li className="d-flex gap-6 py-3 border-bottom border-primary-100">
                                <h3 className="body2-medium text-primary-300 flex-shrink-0">
                                    活動日期
                                </h3>
                                <p className="text-black-800">
                                    2026年4月18日~5月9日｜每週六、週日 上午 9:00 – 上午 11:00
                                </p>
                            </li>
                            <li className="d-flex gap-6 py-3 border-bottom border-primary-100">
                                <h3 className="body2-medium text-primary-300 flex-shrink-0">
                                    活動費用
                                </h3>
                                <p className="text-black-800">免費</p>
                            </li>
                        </ul>
                        <p className="body3-regular text-black-700">
                            報名結果將以 E-mail 通知。如有任何疑問請洽
                            <Link to="#" className="btn btn-textLink body3-regular ps-1" disabled>
                                line官方客服
                            </Link>
                        </p>
                    </div>
                    <RegistrationForm />
                </section>
            </section>

            <section
                className="themeSection"
                style={{ maxWidth: '1360px', margin: 'auto', padding: '0 5% 100px' }}
            >
                {trailsLoading ? (
                    <p className="text-center py-10">載入中...</p>
                ) : (
                    <ol className="p-0 m-0 border-0 d-grid">
                        {THEME_SECTIONS.map((sec) => {
                            const list = trailsByType[sec.type] || [];
                            const cards = list.slice(0, 4);

                            return (
                                <li
                                    key={sec.id}
                                    className="px-3 py-8 p-md-16 list-unstyled d-grid gap-6"
                                    style={{
                                        background: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), ${sec.bg}`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        scrollMarginTop: '75px',
                                    }}
                                    id={sec.id}
                                >
                                    <aside className="d-flex flex-column">
                                        <ul className="list-unstyled d-flex gap-3 flex-wrap">
                                            {(Array.isArray(sec.chips) ? sec.chips : []).map(
                                                (chip, idx) => (
                                                    <li
                                                        key={`${sec.id}-${idx}`}
                                                        className="body2-bold text-primary-300 bg-primary-50 px-3 py-1 rounded-100"
                                                    >
                                                        {chip}
                                                    </li>
                                                ),
                                            )}
                                        </ul>

                                        <h2 className="text-white fs-5 fs-md-2 py-3">
                                            {sec.title}
                                        </h2>
                                        <p className="text-white my-auto body1-regular">
                                            {sec.desc}
                                        </p>
                                    </aside>

                                    <ul className="list-unstyled d-grid gap-3 gap-md-4 themeList">
                                        {cards.map((trail) => (
                                            <li key={trail.id}>
                                                <Link
                                                    to={`/detail/${trail.id}`}
                                                    className="rounded-24 p-4 d-grid align-content-end justify-content-between align-items-center"
                                                    style={{
                                                        background: `url(${trail.trail_image})`,
                                                        width: '100%',
                                                        height: '260px',
                                                        backgroundPosition: 'center',
                                                        gridTemplateColumns: 'auto auto',
                                                    }}
                                                >
                                                    <aside>
                                                        <h3 className="text-white sub1-medium">
                                                            {trail.trail_name}
                                                        </h3>
                                                        <p className="body3-regular text-black-100 pt-1">
                                                            {trail.trail_address ||
                                                                trail.trail_region}
                                                        </p>
                                                    </aside>

                                                    <i
                                                        className="btn btn-primary p-0 d-flex"
                                                        style={{
                                                            width: '48px',
                                                            aspectRatio: '1/1',
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="24px"
                                                            viewBox="0 -960 960 960"
                                                            width="24px"
                                                            fill="currentColor"
                                                            className="m-auto"
                                                        >
                                                            <path d="M630-444H192v-72h438L429-717l51-51 288 288-288 288-51-51 201-201Z" />
                                                        </svg>
                                                    </i>
                                                </Link>
                                            </li>
                                        ))}

                                        {cards.length === 0 && (
                                            <li className="text-white opacity-75">
                                                目前沒有「{sec.type}」的活動
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </section>
        </>
    );
};

export default Theme;
