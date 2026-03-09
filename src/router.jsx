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
import ProtectedRoute from './pages/ProtectedRoute';

const router = createHashRouter([
  {
    path: '/',
    element: <App />, // 設定 App 為最外層容器
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: 'search',
        element: <TrailSearchPage />,
      },
      {
        path: 'detail/:id',
        element: <TrailDetail />,
      },
      {
        path: 'trails',
        element: <TrailTag />,
      },
      {
        path: 'theme',
        element: <Theme />,
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
]);

export default router;
