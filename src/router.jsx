import { createHashRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import TrailSearchPage from './pages/TrailSearchPage';
import TrailDetail from './pages/TrailDetail';
import Theme from './pages/Theme';
import Member from './pages/Member';
import NotFound404 from './pages/NotFound404';
import TrailTag from './pages/TrailTag';
import Login from './pages/Login';
import Register from './pages/Register';
import ThemeDetail from './pages/ThemeDetail';
import ProtectedRoute from './pages/ProtectedRoute';

const router = createHashRouter([
    {
        path: '/',
        element: <App />, // 設定 App 為最外層容器
        children: [
            {
                index: true, // 當網址是 / 時
                element: <Home />,
            },
            {
                path: 'search', // 當網址是 /search 時
                element: <TrailSearchPage />,
            },
            {
                path: 'detail/:id', // 當網址是 /trails/123 時
                element: <TrailDetail />,
            },
            {
                path: 'trails', // 當網址是 /trails/123 時
                element: <TrailTag />,
            },
            {
                path: 'theme', // 當網址是 /trails/123 時
                element: <Theme />,
            },
            {
                path: 'theme/:id', // 當網址是 /trails/123 時
                element: <ThemeDetail />,
            },
            {
                path: 'member',
                element: (
                    <ProtectedRoute>
                        <Member />
                    </ProtectedRoute>
                ),
            },
            {
                path: '*',
                element: <NotFound404 />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
]);

export default router;
