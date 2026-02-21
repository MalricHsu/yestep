//React套件
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

//狀態管理
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess } from '../slices/authSlice';
import { createMessage, clearMessage } from '../slices/infoSlice';

//第三方套件
import Cookies from 'js-cookie';

// API
import { TrailsApi } from '../server/api';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '註冊 | YeStep';
        dispatch(clearMessage());
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange' });

    const onSubmit = async (data) => {
        try {
            const res = await TrailsApi.post('/register', {
                name: data.username,
                email: data.email,
                password: data.password,
            });
            const { accessToken, user } = res.data;
            Cookies.set('accessToken', accessToken, { expires: 7 });
            Cookies.set('userId', user.id, { expires: 7 });
            Cookies.set('nickname', user.name, { expires: 7 });
            dispatch(loginSuccess({ accessToken, user }));
            dispatch(
                createMessage({
                    text: `${user.name}，歡迎加入 YeStep！`,
                    type: 'success',
                }),
            );
            navigate('/');
        } catch (error) {
            // 優化錯誤處理邏輯
            if (error.response) {
                const errorMsg =
                    error.response.data === 'Email already exists'
                        ? '此 Email 已被註冊過'
                        : '註冊失敗，請稍後再試';
                dispatch(createMessage({ text: errorMsg, type: 'danger' }));
            } else {
                dispatch(createMessage({ text: '伺服器連線失敗', type: 'danger' }));
            }
        }
    };

    return (
        <section
            className="d-flex align-items-center min-vh-100 position-relative"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop&sat=-20')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background:
                        'linear-gradient(to right, rgba(44, 46, 48, 0.3), rgba(44, 46, 48, 0.1))',
                }}
            ></div>

            <div className="container position-relative z-1">
                <div className="row justify-content-center align-items-center flex-row-reverse">
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
                                下一站 讓我們陪你抵達遠方
                            </h2>
                            <p
                                className="lead text-white fw-medium d-none d-md-block"
                                style={{
                                    maxWidth: '400px',
                                    textShadow: '0 2px 5px rgba(0,0,0,0.8)',
                                }}
                            >
                                建立你的專屬檔案，
                                <br />
                                開啟屬於你的戶外冒險地圖。
                            </p>
                        </div>
                    </div>

                    {/* 表單區 */}
                    <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div
                            className="p-4 p-md-5 rounded-4 shadow-lg rounded-20"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            <h3 className="fs-5 text-white text-center mb-4 fw-bold ls-2">
                                踏出第一步
                            </h3>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* 暱稱輸入 */}
                                <div className="form-floating mb-3">
                                    <input
                                        {...register('username', {
                                            required: '暱稱是必填項目',
                                        })}
                                        type="text"
                                        className={`form-control bg-transparent text-white border-primary-100 ${errors.username ? 'is-invalid' : ''}`}
                                        id="floatingName"
                                        placeholder="User Name"
                                    />
                                    <label htmlFor="floatingName" className="text-primary-100">
                                        暱稱
                                    </label>
                                    {errors.username && (
                                        <div className="invalid-feedback text-red">
                                            {errors.username.message}
                                        </div>
                                    )}
                                </div>

                                {/* Email 輸入 */}
                                <div className="form-floating mb-3">
                                    <input
                                        {...register('email', {
                                            required: 'Email 是必填項目',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: '請輸入有效的 Email 格式',
                                            },
                                        })}
                                        type="email"
                                        className={`form-control bg-transparent text-white border-primary-100 ${errors.email ? 'is-invalid' : ''}`}
                                        id="floatingEmail"
                                        placeholder="name@example.com"
                                    />
                                    <label htmlFor="floatingEmail" className="text-primary-100">
                                        帳號
                                    </label>
                                    {errors.email && (
                                        <div className="invalid-feedback text-red">
                                            {errors.email.message}
                                        </div>
                                    )}
                                </div>

                                {/* 密碼輸入 */}
                                <div className="form-floating mb-4">
                                    <input
                                        {...register('password', {
                                            required: '密碼是必填項目',
                                            minLength: {
                                                value: 6,
                                                message: '密碼長度至少需為 6 個字元',
                                            },
                                            maxLength: {
                                                value: 12,
                                                message: '密碼長度不得超過 12 個字元',
                                            },
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
                                    style={{ letterSpacing: '1px' }}
                                >
                                    立即註冊
                                </button>

                                <div className="d-flex justify-content-center align-items-center mt-3 border-top border-primary-100 border-opacity-25 pt-4">
                                    <Link
                                        to="/login"
                                        className="text-white fw-bold text-decoration-none small"
                                    >
                                        已經有帳號？
                                        <span className="border-bottom border-primary-100 pb-1">
                                            在此登入
                                        </span>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
