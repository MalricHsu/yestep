// 引入Link
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// 引入 logo
import logoWhite from '../assets/images/Logo-white.png';
import logoDark from '../assets/images/Logo.png';

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`py-6 ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <div className="header__links d-flex justify-content-between align-items-center ">
                        {/* logo + 導覽列 */}
                        <div className="header__nav d-flex align-items-center ">
                            <Link to="/" className="px-4 me-10">
                                <img
                                    className="logo"
                                    src={scrolled ? logoDark : logoWhite}
                                    alt="logo圖片"
                                />
                            </Link>
                            <ul className="list-unstyled d-flex gap-8">
                                <li className="decor-lined">
                                    <Link to="/trailtheme" className="text-decoration-none">
                                        主題活動
                                    </Link>
                                </li>
                                <li className="decor-lined">
                                    <Link to="/trailsearch" className="text-decoration-none">
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
                        <div className="header__login">
                            <Link
                                to="/login"
                                className="d-flex align-items-center text-decoration-none"
                            >
                                <i className="material-symbols-outlined me-2">account_circle</i>
                                <span>登入/註冊</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;
