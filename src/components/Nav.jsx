// 引入Link
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// 引入 logo
import logoWhite from '../assets/images/logo/logo-white.png';
import logoDark from '../assets/images/logo/logo.png';
import yestepWhite from '../assets/images/logo/yestep-white.svg';
import yestepDark from '../assets/images/logo/yestep.svg';

// 元件
import NavOffcanvas from './NavOffcanvas.jsx';

//狀態管理
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { createMessage } from '../slices/infoSlice.js';

//預設nav的字一開始就是非綠色的
const Nav = () => {
    const isLogin = useSelector((state) => {
        console.log(state);
        return state.auth.isLogin;
    });
    const user = useSelector((state) => {
        console.log(state);
        return state.auth.user;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    //處理登出
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        dispatch(
            createMessage({
                text: `${user.name}，登入成功`,
                type: 'success',
            }),
        );
        navigate('/'); // 回到首頁
    };

    return (
        <>
            <nav className={`py-3 py-lg-6 ${scrolled ? 'scrolled shadow-sm' : ''}`}>
                <div className="container">
                    <div className="header__links d-flex justify-content-between align-items-center">
                        {/* logo + 導覽列 */}
                        <div className="header__nav d-flex align-items-center ">
                            <Link to="/" className="d-flex column-gap-2 pe-4 me-10">
                                <img
                                    className="logo"
                                    src={scrolled ? logoDark : logoWhite}
                                    alt="logo圖片"
                                />
                                <img
                                    className="logo-yestep"
                                    src={scrolled ? yestepDark : yestepWhite}
                                    alt="logo圖片"
                                />
                            </Link>
                            <ul className="list-unstyled d-none d-lg-flex gap-8">
                                <li className="decor-lined">
                                    <Link to="/theme" className="text-decoration-none">
                                        主題活動
                                    </Link>
                                </li>
                                <li className="decor-lined">
                                    <Link to="/search" className="text-decoration-none">
                                        步道總覽
                                    </Link>
                                </li>
                                {/* 熱門步道要連到首頁的點擊率小卡 */}
                                <li>
                                    <Link to="/" className="text-decoration-none ">
                                        熱門步道
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* 登入註冊 */}
                        <div className="dropdown header__login d-none d-lg-flex ">
                            <button
                                type="button"
                                className="dropdown-btn d-flex align-items-center text-decoration-none border-0 bg-transparent mb-2"
                                data-bs-display="static"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span className="material-symbols-outlined me-2">
                                    account_circle
                                </span>
                                <span>{isLogin ? `嗨，${user?.name || '會員'}` : '登入/註冊'}</span>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end px-3 py-2">
                                {isLogin ? (
                                    <>
                                        <li>
                                            <Link
                                                className="dropdown-item text-primary-300 px-4 py-2"
                                                to="/member"
                                            >
                                                會員中心
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                onClick={handleLogout}
                                                className="dropdown-item text-primary-300 px-4 py-2"
                                            >
                                                登出
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                className="dropdown-item text-primary-300 px-4 py-2"
                                                to="/login"
                                            >
                                                會員登入
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item text-primary-300 px-4 py-2"
                                                to="/register"
                                            >
                                                註冊帳號
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                        {/* 手機用 Nav */}
                        <button
                            type="button"
                            className="btn btn-menu d-block d-lg-none p-3"
                            onClick={() => setShow(true)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </nav>
            <NavOffcanvas show={show} onClose={() => setShow(false)} />
        </>
    );
};

export default Nav;
