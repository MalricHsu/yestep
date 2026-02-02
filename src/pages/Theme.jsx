import { useEffect } from 'react';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import bg02 from '../assets/images/trailtheme/bg02.png';

const Theme = () => {
    useEffect(() => {
        document.title = '主題活動 | YeStep';
    }, []);
    return (
        <>
            <Nav />
            <header
                style={{
                    backgroundImage: `url("${bg02}"), url("https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
                    backgroundRepeat: 'no-repeat',
                    height: 'clamp(300px, 28vw, 550px)',
                    backgroundSize: 'contain, cover',
                    backgroundPosition: '50% 103%, 50% 80%',
                }}
                className="d-flex flex-column align-items-center justify-content-center position-relative"
            >
                <h1 className="sub1-medium text-white">主題活動</h1>
                <h2 className="text-white fs-4 fs-lg-1 py-4 pt-sm-8 text-center">
                    一起走進自然
                    <span className="d-inline-block">找回你的節奏</span>
                </h2>
                <p className="text-primary-100 sub1-medium">讓自然成為你的休息室</p>

                <ul
                    class="nav nav-underline position-absolute bottom-0 d-sm-none"
                    style={{
                        flexWrap: 'nowrap',
                        overflowX: 'scroll',
                        scrollbarWidth: 'none',
                    }}
                >
                    <li class="nav-item" style={{ minWidth: 'fit-content' }}>
                        <a class="nav-link body1-medium active" aria-current="page" href="#">
                            每月活動
                        </a>
                    </li>
                    <li class="nav-item" style={{ minWidth: 'fit-content' }}>
                        <a class="nav-link body1-medium" href="#">
                            忙裡偷閒
                        </a>
                    </li>
                    <li class="nav-item" style={{ minWidth: 'fit-content' }}>
                        <a class="nav-link body1-medium" href="#">
                            舒壓放鬆
                        </a>
                    </li>
                    <li class="nav-item" style={{ minWidth: 'fit-content' }}>
                        <a class="nav-link body1-medium" href="#">
                            親子步道
                        </a>
                    </li>
                </ul>
                <ul class="nav nav-pills mt-8 d-none d-sm-flex">
                    <li class="nav-item">
                        <button
                            class="nav-link body1-bold active"
                            aria-current="page"
                            type="button"
                        >
                            每月活動
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link body1-bold" type="button">
                            忙裡偷閒
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link body1-bold" type="button">
                            舒壓放鬆
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link body1-bold" type="button">
                            親子步道
                        </button>
                    </li>
                </ul>
            </header>

            {/* 每月活動 */}
            <section className="monthlyActivity px-3 py-8 container-fluid">
                <h2 className="body1-medium text-primary-300">每月活動</h2>

                <h3 className="fs-5 fs-md-2 mb-4">油桐花季</h3>
                <ul className="activityIntro list-unstyled bg-white p-4 p-md-6 rounded-24 d-grid mb-3 mb-md-6 gap-5 gap-md-6">
                    <li className="">
                        <img
                            src="https://images.unsplash.com/photo-1746180339336-a07e5106cb87?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="card-img rounded-12"
                            style={{ minHeight: '200px', objectFit: 'cover' }}
                        />
                        <div className="mt-3">
                            <p className="text-black-700">
                                油​桐花​是​落葉​喬木，​花期​約​在​每​年​4月​至​5月，​盛開時​花朵​如雪般​飄落，​因而​有​「五​月​雪」​的​美稱，​主要​品種​有​白花​桐樹​和​千年​桐。​
                            </p>
                        </div>
                    </li>
                    <li className="">
                        <img
                            src="https://images.unsplash.com/photo-1746180339336-a07e5106cb87?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="card-img rounded-12"
                            style={{ minHeight: '200px', objectFit: 'cover' }}
                        />
                        <div className="mt-3">
                            <p className="text-black-700">
                                油​桐花​是​落葉​喬木，​花期​約​在​每​年​4月​至​5月，​盛開時​花朵​如雪般​飄落，​因而​有​「五​月​雪」​的​美稱，​主要​品種​有​白花​桐樹​和​千年​桐。​
                            </p>
                        </div>
                    </li>
                    <li className="">
                        <img
                            src="https://images.unsplash.com/photo-1746180339336-a07e5106cb87?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="card-img rounded-12"
                            style={{ minHeight: '200px', objectFit: 'cover' }}
                        />
                        <div className="mt-3">
                            <p className="text-black-700">
                                油​桐花​是​落葉​喬木，​花期​約​在​每​年​4月​至​5月，​盛開時​花朵​如雪般​飄落，​因而​有​「五​月​雪」​的​美稱，​主要​品種​有​白花​桐樹​和​千年​桐。​
                            </p>
                        </div>
                    </li>
                </ul>

                <section className="navigationAndRegistration d-grid gap-3 gap-md-6">
                    <div className="navigation bg-white p-4 p-md-6 rounded-24">
                        <h2 className="sub1-bold text-primary-300">
                            桐花​漫遊導覽​｜帶​你​走入​桐​花​步道，​認識​油桐​花生態​與​文化​故事
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
                                    桐花​漫遊導覽​｜帶​你​走入​桐​花​步道，​認識​油桐​花生態​與​文化​故事
                                </p>
                            </li>
                            <li className="d-flex gap-6 py-3 border-bottom border-primary-100">
                                <h3 className="body2-medium text-primary-300 flex-shrink-0">
                                    活動地點
                                </h3>
                                <p className="text-black-800">神棹山​桐​花​步道​</p>
                            </li>
                            <li className="d-flex gap-6 py-3 border-bottom border-primary-100">
                                <h3 className="body2-medium text-primary-300 flex-shrink-0">
                                    活動對象
                                </h3>
                                <p className="text-black-800">
                                    親子​家庭、​朋友​同樂、​攝影愛​好者、​健行​愛好者​
                                </p>
                            </li>
                            <li className="d-flex gap-6 py-3 border-bottom border-primary-100">
                                <h3 className="body2-medium text-primary-300 flex-shrink-0">
                                    活動內容
                                </h3>
                                <p className="text-black-800">桐花​步道​導​覽</p>
                            </li>
                            <li className="d-flex gap-6 py-3 border-bottom border-primary-100">
                                <h3 className="body2-medium text-primary-300 flex-shrink-0">
                                    活動日期
                                </h3>
                                <p className="text-black-800">
                                    2026年​4月​18日​~5月​9日​｜​每​週六、​週日​ ​上午​ 9​:00 –
                                    ​上午​ ​1​1​:00
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
                            報名​結果將以 ​E-​mail ​通知。如有任何疑問請洽
                            <Link to="/contact" className="btn btn-textLink body3-regular ps-1">
                                line官方客服
                            </Link>
                        </p>
                    </div>
                    <form className="registration bg-white p-4 p-md-6 rounded-24 d-flex flex-column gap-4 gap-md-5">
                        <h2 className="sub1-bold text-primary-300 text-center">
                            <span className="fw-normal text-primary-200 fs-5">\</span> 立即報名導覽{' '}
                            <span className="fw-normal text-primary-200 fs-5">/</span>
                        </h2>
                        <div class="form-floating">
                            <input
                                class="form-control"
                                id="registerName"
                                placeholder="name@example.com"
                                type="text"
                            />
                            <label htmlFor="registerName" class="form-label">
                                姓名
                                <span class="text-red ps-1">*</span>
                            </label>
                        </div>
                        <div class="form-floating">
                            <input
                                class="form-control"
                                id="phoneNumber"
                                placeholder="0900-000-000"
                                type="tel"
                            />
                            <label htmlFor="phoneNumber" class="form-label">
                                聯絡電話
                                <span class="text-red ps-1">*</span>
                            </label>
                        </div>
                        <div class="form-floating">
                            <input
                                class="form-control"
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                            />
                            <label htmlFor="email" class="form-label">
                                E-mail
                                <span class="text-red ps-1">*</span>
                            </label>
                        </div>
                        <div class="">
                            <label htmlFor="exampleFormControlSelect1" class="form-label">
                                活動場次
                                <span class="text-red ps-1">*</span>
                            </label>
                            <select class="form-select" id="exampleFormControlSelect1" required="">
                                <option>請選擇活動場次</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2">
                                參加人數
                                <span class="text-red ps-1">*</span>
                            </label>
                            <div class="input-group mb-1">
                                <button
                                    class="btn btn-outline-secondary"
                                    type="button"
                                    id="btn-minus"
                                >
                                    －
                                </button>
                                <input
                                    class="form-control text-center"
                                    id="qty"
                                    min="0"
                                    max="10"
                                    type="number"
                                    value="0"
                                />
                                <button
                                    class="btn btn-outline-secondary"
                                    type="button"
                                    id="btn-plus"
                                >
                                    ＋
                                </button>
                            </div>
                        </div>
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                id="checkDefaultOn"
                                type="checkbox"
                                value=""
                            />
                            <label class="form-check-label text-black-700" htmlFor="checkDefaultOn">
                                我同意活動照片可作為宣傳使用
                            </label>
                        </div>
                        <button type="button" class="btn btn-primary">
                            送出
                        </button>
                    </form>
                </section>
            </section>

            <section className="themeSection">
                <ol className="p-0 m-0 border-0 d-grid">
                    <li
                        className="px-3 py-8 p-md-16  list-unstyled d-grid gap-6"
                        style={{
                            background:
                                'url(https://images.unsplash.com/photo-1572715381359-002b1eabd56b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <aside className="d-flex flex-column">
                            <ul className="list-unstyled d-flex gap-3 flex-wrap">
                                <li className="body2-bold text-primary-300 bg-primary-50 px-3 py-1 rounded-100">
                                    交通便利
                                </li>
                                <li className="body2-bold text-primary-300 bg-primary-50 px-3 py-1 rounded-100">
                                    時程短
                                </li>
                                <li className="body2-bold text-primary-300 bg-primary-50 px-3 py-1 rounded-100">
                                    無需裝備
                                </li>
                            </ul>
                            <h2 className="text-white fs-5 fs-md-2 py-3">忙裡偷閒</h2>
                            <p className="text-white mt-auto">
                                在城市與山林之間，不用遠行、不必準備太多，就能走進自然、放慢腳步。
                                挑一條適合今天心情的步道，讓呼吸回到剛剛好的節奏。
                            </p>
                        </aside>

                        <ul className="list-unstyled d-grid gap-3 gap-md-4 themeList">
                            <li
                                className="rounded-24 p-4 d-grid align-content-end justify-content-between align-items-center"
                                style={{
                                    backgroundImage:
                                        'url(https://images.unsplash.com/photo-1732421384351-c549122245f9?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                                    backgroundSize: 'cover',
                                    width: '100%',
                                    height: '245px',
                                    backgroundPosition: 'center',
                                    gridTemplateColumns: 'auto auto',
                                }}
                            >
                                <aside>
                                    <h3 className="text-white sub1-medium">圓山​水神​社​步道​</h3>
                                    <p className="body3-regular text-black-100 pt-1">
                                        捷運​圓山站​
                                    </p>
                                </aside>
                                <Link
                                    className="btn btn-primary p-0 d-flex"
                                    style={{ width: '48px', aspectRatio: '1/1' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#4F6947"
                                        className="m-auto"
                                    >
                                        <path d="M630-444H192v-72h438L429-717l51-51 288 288-288 288-51-51 201-201Z" />
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        className="px-3 py-8 p-md-16  list-unstyled d-grid gap-6"
                        style={{
                            background:
                                'url(https://images.unsplash.com/photo-1572715381359-002b1eabd56b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <aside className="d-flex flex-column">
                            <ul className="list-unstyled d-flex gap-3 flex-wrap">
                                <li className="body2-bold text-primary-300 bg-primary-50 px-3 py-1 rounded-100">
                                    交通便利
                                </li>
                                <li className="body2-bold text-primary-300 bg-primary-50 px-3 py-1 rounded-100">
                                    時程短
                                </li>
                                <li className="body2-bold text-primary-300 bg-primary-50 px-3 py-1 rounded-100">
                                    無需裝備
                                </li>
                            </ul>
                            <h2 className="text-white fs-5 fs-md-2 py-3">忙裡偷閒</h2>
                            <p className="text-white mt-auto">
                                在城市與山林之間，不用遠行、不必準備太多，就能走進自然、放慢腳步。
                                挑一條適合今天心情的步道，讓呼吸回到剛剛好的節奏。
                            </p>
                        </aside>

                        <ul className="list-unstyled d-grid gap-3 gap-md-4 themeList">
                            <li
                                className="rounded-24 p-4 d-grid align-content-end justify-content-between align-items-center"
                                style={{
                                    backgroundImage:
                                        'url(https://images.unsplash.com/photo-1732421384351-c549122245f9?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                                    backgroundSize: 'cover',
                                    width: '100%',
                                    height: '245px',
                                    backgroundPosition: 'center',
                                    gridTemplateColumns: 'auto auto',
                                }}
                            >
                                <aside>
                                    <h3 className="text-white sub1-medium">圓山​水神​社​步道​</h3>
                                    <p className="body3-regular text-black-100 pt-1">
                                        捷運​圓山站​
                                    </p>
                                </aside>
                                <Link
                                    className="btn btn-primary p-0 d-flex"
                                    style={{ width: '48px', aspectRatio: '1/1' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#4F6947"
                                        className="m-auto"
                                    >
                                        <path d="M630-444H192v-72h438L429-717l51-51 288 288-288 288-51-51 201-201Z" />
                                    </svg>
                                </Link>
                            </li>
                            <li
                                className="rounded-24 p-4 d-grid align-content-end justify-content-between align-items-center"
                                style={{
                                    backgroundImage:
                                        'url(https://images.unsplash.com/photo-1732421384351-c549122245f9?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                                    backgroundSize: 'cover',
                                    width: '100%',
                                    height: '245px',
                                    backgroundPosition: 'center',
                                    gridTemplateColumns: 'auto auto',
                                }}
                            >
                                <aside>
                                    <h3 className="text-white sub1-medium">圓山​水神​社​步道​</h3>
                                    <p className="body3-regular text-black-100 pt-1">
                                        捷運​圓山站​
                                    </p>
                                </aside>
                                <Link
                                    className="btn btn-primary p-0 d-flex"
                                    style={{ width: '48px', aspectRatio: '1/1' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#4F6947"
                                        className="m-auto"
                                    >
                                        <path d="M630-444H192v-72h438L429-717l51-51 288 288-288 288-51-51 201-201Z" />
                                    </svg>
                                </Link>
                            </li>
                            <li
                                className="rounded-24 p-4 d-grid align-content-end justify-content-between align-items-center"
                                style={{
                                    backgroundImage:
                                        'url(https://images.unsplash.com/photo-1732421384351-c549122245f9?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                                    backgroundSize: 'cover',
                                    width: '100%',
                                    height: '245px',
                                    backgroundPosition: 'center',
                                    gridTemplateColumns: 'auto auto',
                                }}
                            >
                                <aside>
                                    <h3 className="text-white sub1-medium">圓山​水神​社​步道​</h3>
                                    <p className="body3-regular text-black-100 pt-1">
                                        捷運​圓山站​
                                    </p>
                                </aside>
                                <Link
                                    className="btn btn-primary p-0 d-flex"
                                    style={{ width: '48px', aspectRatio: '1/1' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#4F6947"
                                        className="m-auto"
                                    >
                                        <path d="M630-444H192v-72h438L429-717l51-51 288 288-288 288-51-51 201-201Z" />
                                    </svg>
                                </Link>
                            </li>
                            <li
                                className="rounded-24 p-4 d-grid align-content-end justify-content-between align-items-center"
                                style={{
                                    backgroundImage:
                                        'url(https://images.unsplash.com/photo-1732421384351-c549122245f9?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                                    backgroundSize: 'cover',
                                    width: '100%',
                                    height: '245px',
                                    backgroundPosition: 'center',
                                    gridTemplateColumns: 'auto auto',
                                }}
                            >
                                <aside>
                                    <h3 className="text-white sub1-medium">圓山​水神​社​步道​</h3>
                                    <p className="body3-regular text-black-100 pt-1">
                                        捷運​圓山站​
                                    </p>
                                </aside>
                                <Link
                                    className="btn btn-primary p-0 d-flex"
                                    style={{ width: '48px', aspectRatio: '1/1' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#4F6947"
                                        className="m-auto"
                                    >
                                        <path d="M630-444H192v-72h438L429-717l51-51 288 288-288 288-51-51 201-201Z" />
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ol>
            </section>
        </>
    );
};

export default Theme;
