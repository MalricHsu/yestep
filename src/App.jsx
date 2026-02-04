import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
// import Nav from './components/Nav';
import Footer from './components/Footer';

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
        </>
    );
}

export default App;
