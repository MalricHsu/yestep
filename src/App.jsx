// import { useState } from "react";
import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./assets/scss/all.scss";
=======
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";

>>>>>>> d376fbb4db599283eabb8a29dc2f47b9b34b731c
function App() {
  return (
    <>
      <Header />
<<<<<<< HEAD
=======
      <button type="button" className="btn btn-primary-50 rounded-16">
        按我
      </button>
      <h1>我是標題</h1>
      <p>aaaaaa</p>
>>>>>>> d376fbb4db599283eabb8a29dc2f47b9b34b731c
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
