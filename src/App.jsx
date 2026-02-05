import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
// import Nav from './components/Nav';
import Footer from './components/Footer';
// import ScrollToTop from './components/ScrollToTop';

function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }, [pathname]);

    return (
        <>
            {/* <Nav /> */}
            <Outlet />
            <Footer />

            {/* 到頂端按鈕 */}
            {/* <ScrollToTop /> */}
        </>
    );
}

export default App;
