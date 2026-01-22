const Member = () => {
  return (
    <>
      <h1>我是Menber</h1>
      <p>aaaaaa</p>
      <button type="button" className="btn btn-primary disabled">
        <p>按我</p>
      </button>
      <button type="button" className="btn btn-primary">
        <p>按我</p>
      </button>
      <button type="button" className="btn btn-secondary">
        <p>按我</p>
      </button>
      <button type="button" className="btn btn-secondary disabled">
        <p>按我</p>
      </button>
      <button type="button" className="btn btn-text ">
        <p>按我</p>
      </button>
      <button type="button" className="btn btn-text disabled">
        <p>按我</p>
      </button>
      <button type="button" className="btn btn-textLink ">
        <p>按我</p>
      </button>
      <button type="button" className="btn btn-textLink disabled">
        <p>按我</p>
      </button>
      <div className="">
        <h2>text要加上search</h2>
        <input
          type="search"
          name="input"
          id="111"
          placeholder="Next Step！想要去哪裡？"
        />
        <button type="button" className="btn btn-primary"></button>
      </div>
      <form className="form-control">
        <input
          type="search"
          name="input"
          id="111"
          placeholder="Next Step！想要去哪裡？"
        />
        <button type="button" className="btn btn-primary"></button>
      </form>
    </>
  );
};

export default Member;
