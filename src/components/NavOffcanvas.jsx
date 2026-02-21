//React套件
import { useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

//狀態管理
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { createMessage } from '../slices/infoSlice.js';

//第三方套件
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import Cookies from 'js-cookie';
//圖檔
import logoDark from '../assets/images/logo/logo.png';
import yestepDark from '../assets/images/logo/yestep.svg';

const NavOffcanvas = ({ show, onClose }) => {
    const location = useLocation();
    const offcanvasRef = useRef(null);
    const instanceRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //取出狀態
    const isLogin = useSelector((state) => state.auth.isLogin);
    const user = useSelector((state) => state.auth.user);
    // 優化：點擊連結後同時關閉選單並置頂
    const handleLinkClick = useCallback(() => {
        onClose?.();
        window.scrollTo(0, 0);
    }, [onClose]);

    const handleLogout = (e) => {
        e.preventDefault();
        Cookies.remove('token');
        Cookies.remove('user');
        dispatch(logout());
        dispatch(
            createMessage({
                text: `${user.name}，登出成功`,
                type: 'success',
            }),
        );
        onClose?.(); // 登出後關閉選單
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    useEffect(() => {
        if (!offcanvasRef.current) return;

        instanceRef.current = instanceRef.current || new Offcanvas(offcanvasRef.current);

        if (show) {
            instanceRef.current.show();
        } else {
            instanceRef.current.hide();
        }
    }, [show]);

    useEffect(() => {
        const el = offcanvasRef.current;
        if (!el) return;

        const handler = () => onClose?.();
        el.addEventListener('hidden.bs.offcanvas', handler);

        return () => {
            el.removeEventListener('hidden.bs.offcanvas', handler);
        };
    }, [onClose]);

    return (
        <div ref={offcanvasRef} className="offcanvas offcanvas-end bg-primary-50" tabIndex="-1">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title">
                    <Link
                        to="/"
                        className="d-flex column-gap-2 pe-4 me-10"
                        onClick={handleLinkClick}
                    >
                        <img className="logo" src={logoDark} alt="logo圖片" />
                        <img className="logo-yestep" src={yestepDark} alt="logo圖片" />
                    </Link>
                </h5>
                <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="offcanvas-body py-8 px-3 d-flex flex-column">
                {/* logo + 導覽列 */}
                <div className="d-flex justify-content-center">
                    <ul className="list-unstyled d-flex flex-column row-gap-12">
                        <li className="decor-lined">
                            <NavLink to="/theme" className="nav-link" onClick={onClose}>
                                主題活動
                            </NavLink>
                        </li>
                        <li className="decor-lined">
                            <NavLink to="/search" className="nav-link" onClick={onClose}>
                                步道總覽
                            </NavLink>
                        </li>
                        {/* 熱門步道要連到首頁的點擊率小卡 */}
                        <li>
                            <NavLink
                                to="/#popular-trails"
                                className={() =>
                                    location.pathname === '/' && location.hash === '#popular-trails'
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                                onClick={onClose}
                            >
                                熱門步道
                            </NavLink>
                        </li>
                    </ul>
                </div>
                {/* 登入註冊 */}
                {isLogin ? (
                    <>
                        <div className="d-flex justify-content-center mt-auto">
                            <Link
                                to="/member"
                                className="d-flex align-items-center text-decoration-none link-primary-300"
                            >
                                <span>會員中心</span>
                            </Link>
                            <span className="mx-2">｜</span>
                            <a
                                href="#"
                                onClick={handleLogout}
                                className="d-flex align-items-center text-decoration-none link-primary-300"
                            >
                                <span>登出</span>
                            </a>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="d-flex justify-content-center mt-auto">
                            <Link
                                to="/login"
                                className="d-flex align-items-center text-decoration-none link-primary-300"
                            >
                                <i className="material-symbols-outlined me-2">account_circle</i>
                                <span>登入/註冊</span>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavOffcanvas;
