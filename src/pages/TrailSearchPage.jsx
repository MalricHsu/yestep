import { useState, useRef, useEffect, useCallback } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const searchApi = axios.create({ baseURL: "https://yestep.zeabur.app/" });
// 顯示 API 錯誤
const getErrorMessage = (error) => {
  return error?.response?.data?.message || error.message || "發生未知錯誤";
};

const TrailSearchPage = () => {
  const [trailSceneryCount, setTrailSceneryCount] = useState(0);
  const fetchRef = useRef(null);

  const getTrailSceneryCount = useCallback(async () => {
    try {
      const res = await searchApi.get("/trails");
      setTrailSceneryCount(res.data.length ?? 0);
    } catch (error) {
      console.error("API 錯誤:", getErrorMessage(error));
    }
  }, []);

  useEffect(() => {
    fetchRef.current = getTrailSceneryCount;
  }, [getTrailSceneryCount]);

  useEffect(() => {
    fetchRef.current?.();
  }, []);

  return (
    <>
      <header className="search-header">
        <Nav />
        <div className="container">
          <h3 className="text-white text-center fw-medium fs-8 mb-8">
            步道總覽
          </h3>
          <h1 className="text-white text-center mb-8">
            Next Step！想要去哪裡？
          </h1>
        </div>
      </header>
      <main>
        <div className="bg-primary-50 py-8">
          <div className="container">
            <div className="d-flex align-items-center column-gap-4 mb-3">
              <h2 className="text-black-900">步道列表</h2>
              <p className="text-black-700 fw-medium">
                找到
                <span className="text-primary-300 fw-bold mx-1">
                  {trailSceneryCount}筆
                </span>
                你可能喜歡的步道景觀
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TrailSearchPage;
