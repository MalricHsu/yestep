const Home = () => {
  return (
    <>
      <main>
        {/* 關於我們 */}
        <section class="bg-primary-50 py-32">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="about__card bg-white rounded-12 p-6">
                  <div class="row align-items-center">
                    <div class="col-lg-7">
                      <div class="about__card-img">
                        <img
                          src="https://images.plurk.com/UyjTawqYm4EEoIZnpCL3c.png"
                          alt="關於我們圖片"
                        />
                      </div>
                    </div>
                    <div class="col-lg-5">
                      <div class="about__card-content">
                        <h2 class="mb-6">關於我們</h2>
                        <div class="about__card-paragraph mb-4">
                          <p>
                            人生的旅途中，我們經常問自己：「我做得到嗎？我能再往前走嗎？」
                          </p>
                          <p>大多時候，答案只差那麼一步—— </p>
                          <p>
                            <strong>一個肯定的Yes</strong>
                          </p>
                        </div>
                        <div class="about__card-paragraph mb-4">
                          <p>YeStep的誕生，來自一個簡單卻重要的想法：</p>
                          <p>
                            {" "}
                            把每一個「Yes（願意）」化為實際的「Step（行動）」
                          </p>
                          <p>選擇向前、選擇相信、選擇可行</p>
                          <p>第一步可以很輕、很小、很不確定。</p>
                          <p>但它依然是找回呼吸的開始</p>
                          <p>
                            讓你看見森林的寧靜、山稜的光線，還有踏出每一步的自己
                          </p>
                        </div>
                        <div class="about__card-paragraph text-primary-200 mb-4">
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
          <div className="about__bg"></div>
        </section>
      </main>
    </>
  );
};

export default Home;
