//React套件
import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

//狀態管理
import { createMessage } from '../slices/infoSlice';

//元件
import Nav from '../components/Nav';
import ThemeRegistrationForm from '../components/ThemeRegistrationForm';

//圖片
import bg02 from '../assets/images/trailtheme/bg02.png';

// API
import { TrailsApi } from '../server/api';
import { useDispatch } from 'react-redux';

// Unsplash 圖片最佳化（非 Unsplash 來源就原樣回傳）
const optimizeImgUrl = (rawUrl, { q = 70, w = 520, fm = 'webp', fit = 'crop' } = {}) => {
  if (!rawUrl) return rawUrl;
  try {
    const url = new URL(rawUrl);
    const isUnsplash =
      url.hostname === 'images.unsplash.com' ||
      url.hostname === 'plus.unsplash.com' ||
      url.hostname.endsWith('.unsplash.com');

    if (!isUnsplash) return rawUrl;

    url.searchParams.set('q', String(q));
    url.searchParams.set('w', String(w));
    url.searchParams.set('fm', fm);
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', fit);
    return url.toString();
  } catch {
    return rawUrl;
  }
};

//取出API資料
const useTrails = () => {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState([]);
  const [themeSection, setThemeSection] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTrails = async () => {
      try {
        setLoading(true);
        const res = await TrailsApi.get('/trails');
        setTrails(res.data);
      } catch (error) {
        dispatch(createMessage({ text: `API 錯誤${error}`, type: 'red' }));
      } finally {
        setLoading(false);
      }
    };
    getTrails();
    //每月活動內容
    const activityIntroData = async () => {
      try {
        const res = await TrailsApi.get('/activity');
        setActivity(res.data);
      } catch (error) {
        dispatch(createMessage({ text: `API 錯誤${error}`, type: 'red' }));
      }
    };
    activityIntroData();

    //四大主題內容
    const themeSectionData = async () => {
      try {
        const res = await TrailsApi.get('/themeSections');
        setThemeSection(res.data);
      } catch (error) {
        dispatch(createMessage({ text: `API 錯誤${error}`, type: 'red' }));
      }
    };
    themeSectionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { trails, loading, activity, themeSection };
};
//工具－依主題分組
const groupByType = (trails) =>
  trails.reduce((acc, t) => {
    const key = t.trail_type || '未分類';
    (acc[key] ||= []).push(t);
    return acc;
  }, {});

// 元件-每月活動：活動資訊卡
const MonthlyActivityInfoCard = ({
  title,
  imageUrl,
  items,
  noteText,
  noteLinkText,
  noteLinkTo,
}) => {
  return (
    <div className="navigation bg-white p-4 p-md-6 rounded-24">
      <h2 className="sub1-bold text-primary-300 text-center">{title}</h2>
      <img
        src={optimizeImgUrl(imageUrl, { q: 70, w: 900 })}
        alt="主題背景"
        className="card-img rounded-12 mt-3 mb-6"
        loading="lazy"
        decoding="async"
      />

      <ul className="list-unstyled d-flex flex-column pb-3">
        {items.map((row, idx) => (
          <li key={idx} className="d-flex gap-6 py-3 border-bottom border-primary-100">
            <h3 className="body2-medium text-primary-300 flex-shrink-0">{row.label}</h3>
            <p className="text-black-800">{row.value}</p>
          </li>
        ))}
      </ul>

      <p className="body3-regular text-black-700">
        {noteText}
        <Link to={noteLinkTo} target="_blank" className="btn btn-textLink body3-regular ps-1">
          {noteLinkText}
        </Link>
      </p>
    </div>
  );
};

// 元件-每月活動：資訊 + 報名表單（關注點分離）
const MonthlyActivityRegistrationSection = ({ infoProps }) => {
  return (
    <section className="navigationAndRegistration d-grid gap-3 gap-md-6">
      <MonthlyActivityInfoCard {...infoProps} />
      <ThemeRegistrationForm />
    </section>
  );
};

const Theme = () => {
  const { trails, loading: trailsLoading, activity, themeSection } = useTrails();
  const trailsByType = groupByType(trails);
  const [activeId, setActiveId] = useState('fantasy');
  const navItems = useMemo(
    () => [
      { id: 'fantasy', label: '忙裡偷閒' },
      { id: 'relaxing', label: '舒壓放鬆' },
      { id: 'familyHiking', label: '親子步道' },
      { id: 'tungBlossom', label: '桐花步道' },
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
        className="d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden"
        style={{ height: 'clamp(300px, calc(310px + 15.5vw), 600px)' }}
      >
        {/* cover 圖（建議不 lazy，避免首屏閃爍） */}
        <img
          src={optimizeImgUrl('https://images.unsplash.com/photo-1533240332313-0db49b459ad6', {
            q: 80,
            w: 1600,
          })}
          alt="主題背景"
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: 'cover', objectPosition: '50% 80%' }}
        />

        {/* 前景裝飾（bg02） */}
        <img
          src={bg02}
          alt="主題背景"
          aria-hidden="true"
          decoding="async"
          className="position-absolute start-50"
          style={{
            bottom: -5,
            transform: 'translateX(-50%)',
            width: '100%',
            height: 'auto',
          }}
        />

        <div className="text-center w-100" style={{ zIndex: 1 }}>
          <h1 className="sub1-medium text-white">主題活動</h1>
          <h2 className="text-white fs-4 fs-lg-1 py-4 pt-sm-24 text-center">
            一起走進自然
            <span className="d-inline-block">找回你的節奏</span>
          </h2>
          <p className="text-primary-100 sub1-medium">讓自然成為你的休息室</p>

          <ul
            className="nav nav-underline position-absolute bottom-0 start-50 translate-middle-x d-sm-none opacity-75"
            style={{
              width: 385,
              flexWrap: 'nowrap',
              overflowX: 'scroll',
              scrollbarWidth: 'none',
            }}
          >
            {navItems.map((item) => (
              <li key={item.id} className="nav-item" style={{ minWidth: 'fit-content' }}>
                <button
                  type="button"
                  className={`nav-link body1-medium ${activeId === item.id ? 'active' : ''}`}
                  aria-current={activeId === item.id ? 'page' : undefined}
                  onClick={() => scrollToId(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <ul className="nav nav-pills mt-lg-8 mt-0 d-none d-sm-inline-flex gap-2 mx-auto">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-link body1-bold ${activeId === item.id ? 'active' : ''}`}
                  aria-current={activeId === item.id ? 'page' : undefined}
                  onClick={() => scrollToId(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section
        className="monthlyActivity py-8 container-fluid"
        style={{ maxWidth: '1360px', scrollMarginTop: '75px', padding: '0 5%' }}
        id="monthlyActivity"
      >
        <h2 className="body1-medium text-primary-300">每月活動</h2>

        <h3 className="fs-5 fs-md-2 mb-4">油桐花季</h3>

        <ul className="activityIntro list-unstyled bg-white p-4 p-md-6 rounded-24 d-grid mb-3 mb-md-6 gap-5 gap-md-6">
          {activity.map((item, index) => (
            <li key={index}>
              <img
                src={optimizeImgUrl(item.picUrl, { q: 70, w: 520 })}
                alt="主題背景"
                className="card-img rounded-12"
                loading="lazy"
                decoding="async"
                style={{
                  maxHeight: '250px',
                  objectFit: 'cover',
                  aspectRatio: '350/240',
                }}
              />
              <div className="mt-3">
                <p className="text-black-700" style={{ textAlign: 'justify' }}>
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <MonthlyActivityRegistrationSection
          infoProps={{
            title: '桐花漫遊導覽｜帶你走入桐花步道，認識油桐花生態與文化事',
            imageUrl:
              'https://images.unsplash.com/photo-1746180340275-dd6fbf81010c?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            items: [
              {
                label: '活動名稱',
                value: '桐花漫遊導覽｜帶你走入桐花步道，認識油桐花生態與文化故事',
              },
              { label: '活動地點', value: '神棹山桐花步道' },
              {
                label: '活動對象',
                value: '親子家庭、朋友同樂、攝影愛好者、健行愛好者',
              },
              { label: '活動內容', value: '桐花步道導覽' },
              {
                label: '活動日期',
                value: '2026年4月18日~5月9日｜每週六、週日 上午 9:00 – 上午 11:00',
              },
              { label: '活動費用', value: '免費' },
              {
                label: '活動備注',
                value: '如遇天候不佳，將會在24小時內通知延期或是依照辦法取消。',
              },
            ],
            noteText: '報名結果將以 E-mail 通知。如有任何疑問請洽',
            noteLinkText: 'line官方客服',
            noteLinkTo: 'https://www.line.me/tw/',
          }}
        />
      </section>

      <section
        className="themeSection"
        style={{ maxWidth: '1360px', margin: 'auto', padding: '0 5% 100px' }}
      >
        {trailsLoading ? (
          <p className="text-center py-10">載入中...</p>
        ) : (
          <ol className="p-0 m-0 border-0 d-grid gap-5">
            {themeSection.map((sec) => {
              const list = trailsByType[sec.type] || [];
              const cards = list.slice(0, 4);

              return (
                <li
                  key={sec.id}
                  className="themeSectionItem px-3 py-8 p-md-16 list-unstyled"
                  style={{ scrollMarginTop: '75px' }}
                  id={sec.id}
                >
                  <img
                    src={optimizeImgUrl(sec.bg, { q: 75, w: 1600 })}
                    alt="主題背景"
                    aria-hidden="true"
                    className="themeSectionBg"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="themeSectionContent d-grid gap-6">
                    <aside className="d-flex flex-column">
                      <ul className="list-unstyled d-flex gap-3 flex-wrap">
                        {(Array.isArray(sec.chips) ? sec.chips : []).map((chip, idx) => (
                          <li
                            key={`${sec.id}-${idx}`}
                            className="body2-bold text-primary-300 bg-primary-50 px-3 py-1 rounded-100"
                          >
                            {chip}
                          </li>
                        ))}
                      </ul>

                      <h2 className="text-white fs-5 fs-md-2 py-3">{sec.title}</h2>
                      <p className="text-white my-auto body1-regular">{sec.desc}</p>
                    </aside>

                    <ul className="list-unstyled d-grid gap-3 gap-md-4 themeList">
                      {cards.map((trail) => (
                        <li key={trail.id}>
                          <Link to={`/detail/${trail.id}`} className="themeCard">
                            <img
                              src={optimizeImgUrl(trail.trail_image, {
                                q: 70,
                                w: 520,
                              })}
                              alt={trail.trail_name}
                              loading="lazy"
                              decoding="async"
                              className="themeCardImg"
                            />

                            <aside className="themeCardBody">
                              <div className="themeCardText">
                                <h3 className="text-white sub1-medium">{trail.trail_name}</h3>
                                <p className="body3-regular text-black-100 pt-1">
                                  {trail.trail_address || trail.trail_region}
                                </p>
                              </div>

                              <span
                                className="themeCardCta btn btn-primary p-0 d-flex"
                                aria-hidden="true"
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
                              </span>
                            </aside>
                          </Link>
                        </li>
                      ))}

                      {cards.length === 0 && (
                        <li className="text-white opacity-75">目前沒有「{sec.type}」的活動</li>
                      )}
                    </ul>
                  </div>
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
