// import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <button type="button" className="btn btn-primary-50 rounded-16">
        按我
      </button>
      <h1>我是標題</h1>
      <p>aaaaaa</p>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
