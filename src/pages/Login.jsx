import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginSuccess } from '../slices/authSlice';
import { createMessage, clearMessage } from '../slices/infoSlice';
import axios from 'axios';
import Cookies from 'js-cookie';

// API
const LoginApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.title = '登入 | YeStep';
        dispatch(clearMessage());
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange' });

    const onSubmit = async (data) => {
        dispatch(clearMessage());
        try {
            const res = await LoginApi.post('/login', data);
            const { accessToken, user } = res.data;
            //後端路由取得userId 只能看到自己的部分
            Cookies.set('accessToken', accessToken, { expires: 7 });
            Cookies.set('user', JSON.stringify(user), { expires: 7 });
            dispatch(loginSuccess({ accessToken, user }));
            dispatch(createMessage({ text: `${user.name}，歡迎回來 YeStep`, type: 'success' }));
            // 取得當初傳過來的來源路徑，如果沒有就回首頁
            const origin = location.state?.from || '/';
            setTimeout(() => navigate(origin, { replace: true }), 500);
        } catch (error) {
            const text = error.response ? '帳號或密碼錯誤' : '伺服器連線失敗';
            dispatch(createMessage({ text, type: 'danger' }));
        }
    };

    return (
        <section
            className="d-flex align-items-center min-vh-100 position-relative"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop&sat=-20')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background:
                        'linear-gradient(to right, rgba(44, 46, 48, 0.15), rgba(44, 46, 48, 0.05))',
                }}
            ></div>
            <div className="container position-relative z-1">
                <div className="row justify-content-center align-items-center">
                    {/* 左側：品牌標語區 */}
                    <div className="col-lg-6 mb-5 mb-lg-0 text-white px-4">
                        <div className="d-flex flex-column align-items-center align-items-lg-start text-center text-lg-start">
                            <h1
                                className="fs-1 fw-bold mb-3 text-white"
                                style={{ textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}
                            >
                                YeStep
                            </h1>
                            <h2
                                className="fs-lg-3 fs-5 fw-bold mb-4 text-white"
                                style={{
                                    letterSpacing: '0.1em',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                                }}
                            >
                                每一步 都是為出發做準備
                            </h2>
                            <p
                                className="lead text-white fw-medium d-none d-md-block"
                                style={{
                                    maxWidth: '400px',
                                    textShadow: '0 2px 5px rgba(0,0,0,0.8)',
                                }}
                            >
                                紀錄你的軌跡，探索未知的路徑。
                                <br />
                                讓每一次的啟程，都充滿意義。
                            </p>
                        </div>
                    </div>

                    {/* 右側：登入表單區 */}
                    <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div
                            className="p-4 p-md-5 rounded-4 shadow-lg rounded-20"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            <h3 className="fs-5 text-white text-center mb-4 fw-bold ls-2">
                                啟程登入
                            </h3>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-floating mb-3">
                                    <input
                                        {...register('email', {
                                            required: 'Email 是必填項目',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Email 格式錯誤',
                                            },
                                        })}
                                        type="email"
                                        className={`form-control bg-transparent text-white border-primary-100 ${errors.email ? 'is-invalid' : ''}`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                    />
                                    <label htmlFor="floatingInput" className="text-primary-100">
                                        帳號
                                    </label>
                                    {errors.email && (
                                        <div className="invalid-feedback text-red">
                                            {errors.email.message}
                                        </div>
                                    )}
                                </div>

                                <div className="form-floating mb-4">
                                    <input
                                        {...register('password', {
                                            required: '密碼是必填項目',
                                            minLength: { value: 6, message: '至少 6 個字元' },
                                        })}
                                        type="password"
                                        className={`form-control bg-transparent text-white border-primary-100 ${errors.password ? 'is-invalid' : ''}`}
                                        id="floatingPassword"
                                        placeholder="Password"
                                    />
                                    <label htmlFor="floatingPassword" className="text-primary-100">
                                        密碼
                                    </label>
                                    {errors.password && (
                                        <div className="invalid-feedback text-red">
                                            {errors.password.message}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary-200 text-white w-100 py-3 rounded-3 fw-bold mb-4 shadow-sm"
                                    style={{
                                        letterSpacing: '1px',
                                        cursor: 'pointer',
                                        transform: 'scale(1.05)',
                                        transition: 'transform 0.2s',
                                    }}
                                >
                                    立即登入
                                </button>
                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    <Link
                                        to="/"
                                        className="text-white fw-bold text-decoration-none small"
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        <span className="border-bottom border-primary-100 pb-1 me-1">
                                            首頁
                                        </span>
                                        ｜
                                    </Link>

                                    <div className="ms-2 d-flex align-items-center gap-3">
                                        <Link
                                            to="/register"
                                            className="text-white fw-bold text-decoration-none small"
                                        >
                                            還沒有帳號嗎？
                                            <span className="border-bottom border-primary-100 pb-1 ms-1">
                                                在此登入
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
