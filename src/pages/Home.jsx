// 引入關於我們圖片
import aboutImg from "../assets/images/home/about-img.svg";
import aboutBgLg from "../assets/images/home/about-bg-lg.svg";

const Home = () => {
  return (
    <>
      <main>
        {/* HERO */}
        <section>
          <div className="hero ratio ratio-16x9">
            <img
              src="https://plus.unsplash.com/premium_photo-1669839774560-f4524492b1d7?q=80&w=640&h=360&0&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="object-fit-cover"
              alt="hero圖片"
            />
          </div>
        </section>
        {/* 關於我們 */}
        <section className="bg-primary-50 py-32 position-relative">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="about__card bg-white rounded-lg-60 p-6 position-relative z-1">
                  <div className="row align-items-center">
                    <div className="col-lg-7">
                      <div className="about__card-img">
                        <img src={aboutImg} alt="關於我們圖片" />
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="about__card-content">
                        <h2 className="mb-6">關於我們</h2>
                        <div className="about__card-paragraph mb-4">
                          <p>
                            人生的旅途中，我們經常問自己：「我做得到嗎？我能再往前走嗎？」
                          </p>
                          <p>大多時候，答案只差那麼一步 —— </p>
                          <p>
                            <strong className="text-primary-200">
                              一個肯定的Yes
                            </strong>
                          </p>
                        </div>
                        <div className="about__card-paragraph mb-4">
                          <p>YeStep的誕生，來自一個簡單卻重要的想法：</p>
                          <p>
                            把每一個「Yes（願意）」化為實際的「Step（行動）」
                          </p>
                          <p>選擇向前、選擇相信、選擇可行</p>
                          <p>第一步可以很輕、很小、很不確定。</p>
                          <p>但它依然是找回呼吸的開始</p>
                          <p>
                            讓你看見森林的寧靜、山稜的光線，還有踏出每一步的自己
                          </p>
                        </div>
                        <div className="about__card-paragraph text-primary-200 mb-4">
                          <p>Yes to nature.</p>
                          <p>Yes to slowing down.</p>
                          <p>Yes to breathing with every step.</p>
                        </div>
                        <p>只要你願意開始，世界就會為你敞開更多可行的道路。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 背景山脈圖 */}
          <div className="about__bg w-100 position-absolute opacity-75 bottom-0">
            <img src={aboutBgLg} alt="背景山脈圖" />
          </div>
        </section>
        <button type="button" className="btn btn-primary disabled">
          <p>按我</p>
        </button>
        <div className="">
          <input type="text" name="" id="" />
          <button type="button" className="btn btn-primary"></button>
        </div>
        <h1>我是標題</h1>
        <h1>我是標題</h1>
        <h1>我是標題</h1>
        <h1>我是標題</h1>
        <h1>我是標題</h1>
        <h1>我是標題</h1>
        <h1>我是標題</h1>
        <h1>我是標題</h1>
        <p>aaaaaa</p>
        <div className="container login">
          <h1>請先登入</h1>
          <form
            action=""
            className="form-floating"
            onSubmit={(e) => onSubmit(e)}
          >
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name="username"
                placeholder="name@example.com"
              />
              <label htmlFor="username">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-2">
              登入
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;
