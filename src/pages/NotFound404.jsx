//React套件
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';

const NotFound404 = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    document.title = 'NotFound404 | YeStep';
    setTimeout(() => {
      Navigate('/');
    }, 10000);
  }, [Navigate]);
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center px-4"
      style={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1
        className="fw-bold text-primary-300 fs-1"
        style={{
          lineHeight: 0.8,
          marginBottom: '20px',
          opacity: 0.8,
        }}
      >
        404
      </h1>

      <h2 className="fs-lg-1 fs-4 fw-bold text-black-800 mb-3">哎呀！這裡是一片荒野</h2>

      <p className="text-black-600 fs-6 mb-5" style={{ maxWidth: '480px', lineHeight: '1.6' }}>
        似乎偏離了步道，走進地圖上沒有標示的區域。
        <br />
        別擔心，深呼吸，讓我們帶你回到起點。
      </p>

      <Link
        to="/"
        className="btn btn-primary rounded-pill px-5 py-3 fs-lg-5 fs-6 fw-bold shadow-sm"
        style={{ transition: 'all 0.3s ease' }}
        onMouseEnter={(e) => (e.target.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
      >
        回到首頁
      </Link>

      <div className="mt-5 text-primary-200 opacity-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z" />
        </svg>
      </div>
    </div>
  );
};

export default NotFound404;
