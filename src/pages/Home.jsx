const Home = () => {
  return (
    <>
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
        <form action="" className="form-floating" onSubmit={(e) => onSubmit(e)}>
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
    </>
  );
};

export default Home;
