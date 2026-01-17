import { createHashRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import TrailSearchPage from "./pages/TrailSearchPage";
import TrailDetail from "./pages/TrailDetail";
import Theme from "./pages/Theme";
import Member from "./pages/Member";
import NotFound404 from "./pages/NotFound404";

const router = createHashRouter([
  {
    path: "/",
    element: <App />, // 設定 App 為最外層容器
    children: [
      {
        index: true, // 當網址是 / 時
        element: <Home />,
      },
      {
        path: "trailsearch", // 當網址是 /search 時
        element: <TrailSearchPage />,
      },
      {
        path: "traildetail", // 當網址是 /trails/123 時
        element: <TrailDetail />,
      },
      {
        path: "trailtheme", // 當網址是 /trails/123 時
        element: <Theme />,
      },
      {
        path: "trailmember", // 當網址是 /trails/123 時
        element: <Member />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);

export default router;
