import { useEffect } from 'react';
import Nav from '../components/Nav';

const Theme = () => {
    useEffect(() => {
        document.title = '主題活動 | YeStep';
    }, []);
    return (
        <>
            <header
                style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
                    height: '300px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                }}
                className="d-flex flex-column align-items-center justify-content-center position-relative"
            >
                <h1 className="sub1-bold text-white">主題活動</h1>
                <h2 className="text-white fs-1 py-4">
                    一起走進自然&nbsp;
                    <br style={{ display: 'none' }} />
                    {/* 手機版以上取消 br */}
                    找回你的節奏
                </h2>
                <p className="text-primary-100 sub1-medium">讓自然成為你的休息室</p>

                <ul
                    class="nav nav-underline position-absolute bottom-0"
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
            </header>

            {/* 每月活動 */}
            <section className="monthlyActivity">
                <h2 className="body1-medium text-primary-300">每月活動</h2>

                <h3 className="fs-2">油桐花季</h3>
                <ul
                    className="bg-white p-4 rounded-24 d-flex flex-column"
                    style={{ listStyle: 'none' }}
                >
                    <li className="">
                        <img
                            src="https://images.unsplash.com/photo-1746180339336-a07e5106cb87?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="card-img rounded-12"
                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                        />
                        <div className="mt-3">
                            <p className="text-black-700">
                                油​桐花​是​落葉​喬木，​花期​約​在​每​年​4月​至​5月，​盛開時​花朵​如雪般​飄落，​因而​有​「五​月​雪」​的​美稱，​主要​品種​有​白花​桐樹​和​千年​桐。​
                            </p>
                        </div>
                    </li>
                </ul>

                <section className="navigationAndRegistration">
                    <div className="navigation">
                        <h2 className="sub1-bold text-primary-300">
                            桐花​漫遊導覽​｜帶​你​走入​桐​花​步道，​認識​油桐​花生態​與​文化​故事
                        </h2>
                        <img
                            src="https://images.unsplash.com/photo-1746180339820-3d1741f52f4a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="card-img rounded-12"
                        />
                    </div>
                    <div className="registration"></div>
                </section>
            </section>
        </>
    );
};

export default Theme;
