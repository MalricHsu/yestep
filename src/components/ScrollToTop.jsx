//React套件
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 不同路由對應顏色
const routeColorMap = {
    // '/search': 'btn-red',
    '/detail': 'btn-black-600',
    '/trails': 'btn-black-700',
    '/theme': 'btn-primary-200 opacity-75 text-white',
    '/member': 'btn-primary-200 opacity-75 text-white',
};

function ScrollToTop() {
    // 預設按鈕不顯示
    const [isVisible, setIsVisible] = useState(false);

    //處理按鈕顏色
    const location = useLocation();

    const getButtonColor = () => {
        const { pathname } = location;

        if (pathname.startsWith('/detail')) {
            return routeColorMap['/detail'];
        }

        return routeColorMap[pathname] || 'btn-primary-300';
    };

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            // 如果滾動超過 300px，就顯示按鈕
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        // 清除監聽器
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    type="button"
                    className={`to-top-btn p-0 btn ${getButtonColor()} rounded-pill`}
                    onClick={handleScrollToTop}
                >
                    <span className="material-symbols-outlined p-3">keyboard_arrow_up</span>
                </button>
            )}
        </>
    );
}
export default ScrollToTop;
