import { Link } from 'react-router';

// 引入logo-white
import logoWhite from '../assets/images/logo/logo-white.png';
import yestepWhite from '../assets/images/logo/yestep-white.svg';

// 引入icon
import iconFacebook from '../assets/images/community/icon-facebook.svg';
import iconInstagram from '../assets/images/community/icon-ins.svg';
import iconLine from '../assets/images/community/icon-line.svg';
import iconThread from '../assets/images/community/icon-thread.svg';

const Footer = () => {
    return (
        <>
            <footer className="bg-black py-8 py-sm-16">
                <div className="container">
                    <div className="row row-gap-6">
                        {/* 🚩左欄logo + nav */}
                        <div className="col-lg-5">
                            <div className="brand__logo d-flex flex-column align-items-center align-items-lg-start mb-6 mb-sm-13">
                                <Link to="/" className="d-flex column-gap-2 mb-2">
                                    <img className="logo" src={logoWhite} alt="footer logo圖" />
                                    <img
                                        className="logo-yestep"
                                        src={yestepWhite}
                                        alt="footer logo圖"
                                    />
                                </Link>
                                <p className="brand__logo-slogan text-black-100">
                                    每一步，找回生活的呼吸
                                </p>
                            </div>
                            <nav className="footer__nav">
                                <ul className="footer-links list-unstyled d-flex justify-content-center justify-content-lg-start gap-8 ">
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
                                    <li className="decor-lined">
                                        <Link to="/#popular-trails" className="nav-link">
                                            熱門步道
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        {/* 🚩右欄icons+版權 */}
                        <div className="col-lg-7">
                            <ul className="footer__icons list-unstyled d-flex justify-content-center justify-content-lg-end gap-3 mb-5">
                                <li>
                                    <a href="/" className="text-white p-2">
                                        <img src={iconFacebook} alt="facebook icon" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-white p-2">
                                        <img src={iconLine} alt="line icon" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-white p-2">
                                        <img src={iconInstagram} alt="instagram icon" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-white p-2">
                                        <img src={iconThread} alt="thread icon" />
                                    </a>
                                </li>
                            </ul>
                            <div className="copyright__content d-flex flex-column align-items-center align-items-lg-end text-white text-center text-lg-end gap-2">
                                <p>本網站僅供作品參考，並非真實營運販售</p>
                                <p>Copyright © YeStep All Rights Reserved. 版權所有</p>
                                <ul className="footer-links list-unstyled d-flex flex-wrap justify-content-center justify-content-lg-end column-gap-8 row-gap-2">
                                    <li className="decor-lined">
                                        <a href="/" className="text-decoration-none text-black-100">
                                            {/*  */}
                                            隱私權政策
                                        </a>
                                    </li>
                                    <li className="decor-lined">
                                        <a href="/" className="text-decoration-none text-black-100">
                                            使用條款
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://icons8.com/"
                                            className="text-decoration-none text-black-100"
                                        >
                                            illustrations by icons8.
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
