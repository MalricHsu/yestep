import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Offcanvas from 'bootstrap/js/dist/offcanvas';

import logoDark from '../assets/images/logo/logo.png';
import yestepDark from '../assets/images/logo/yestep.svg';

const NavOffcanvas = ({ show, onClose }) => {
    const offcanvasRef = useRef(null);
    const instanceRef = useRef(null);

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
                    <Link to="/" className="d-flex column-gap-2 pe-4 me-10">
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
                            <Link to="/theme" className="nav-link">
                                主題活動
                            </Link>
                        </li>
                        <li className="decor-lined">
                            <Link to="/search" className="nav-link">
                                步道總覽
                            </Link>
                        </li>
                        {/* 熱門步道要連到首頁的點擊率小卡 */}
                        <li>
                            <Link to="/" className="nav-link">
                                熱門步道
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* 登入註冊 */}
                <div className="d-flex justify-content-center mt-auto">
                    <Link
                        to="/login"
                        className="d-flex align-items-center text-decoration-none link-primary-300"
                    >
                        <i className="material-symbols-outlined me-2">account_circle</i>
                        <span>登入/註冊</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavOffcanvas;
