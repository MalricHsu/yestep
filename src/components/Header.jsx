// 引入Link
import { Link } from "react-router-dom";

// 引入logo-white
// import { logoWhite } from "../assets/images/ori-logo-white.svg";
import logoWhiteLg from "../assets/images/ori-logo-lg-white.svg";

// 引入logo-primary
// import { logoPri } from "../assets/images/ori-logo-pri.svg";
// import { logoPriLg } from "../assets/images/ori-logo-lg-pri.svg";

import iconAccount from "../assets/images/icon-account.svg";

// 🚩還沒做，Header 滑動超過2/3屏時，轉換樣式
const Header = () => {
  return (
    <>
      <header className="py-6">
        <div className="container">
          <div className="header__links d-flex justify-content-between align-items-center ">
            {/* logo + 導覽列 */}
            <div className="header__nav d-flex align-items-center ">
              <Link to="/" className="px-4 me-10">
                <img src={logoWhiteLg} alt="logo圖片" />
              </Link>
              <nav>
                <ul className="list-unstyled d-flex gap-8">
                  <li className="decor-lined">
                    <Link
                      to="/trailtheme"
                      className="text-decoration-none text-white"
                    >
                      主題活動
                    </Link>
                  </li>
                  <li className="decor-lined">
                    <Link
                      to="/trailsearch"
                      className="text-decoration-none text-white"
                    >
                      步道總覽
                    </Link>
                  </li>
                  {/* 熱門步道要連到首頁的點擊率小卡 */}
                  <li>
                    <Link to="/" className="text-decoration-none text-white ">
                      熱門步道
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            {/* 登入註冊 */}
            <div className="header__login">
              <Link to="/login" className="text-decoration-none text-white">
                <img src={iconAccount} className="me-2" alt="登入/註冊按鈕" />
                <span>登入/註冊</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
