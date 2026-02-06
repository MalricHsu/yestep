import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess } from '../slices/authSlice';
import axios from 'axios';

// API
// const LoginApi = axios.create({ baseURL: 'http://localhost:3000/' });
const LoginApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });
const Login = () => {
    useEffect(() => {
        document.title = '登入 | YeStep';
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await LoginApi.post('/login', data);
            const { accessToken, user } = res.data;
            dispatch(loginSuccess({ accessToken, user }));
            alert(`歡迎回來，${user.name} YeStep`);
            navigate('/');
        } catch (error) {
            console.error('登入失敗', error);
            // 處理錯誤訊息
            if (error.response) {
                alert(error.response.data || '帳號或密碼錯誤');
            } else {
                alert('伺服器連線失敗');
            }
        }
    };

    return (
        <>
            <section
                className=""
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1587951326187-c9baa4606bff?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    minHeight: '100vh',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: '0.8',
                }}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="loginContainer rounded-5 position-relative d-flex flex-column"
                    style={{
                        maxWidth: '500px',
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '5em calc(1em + 2vw) 2em',
                        margin: '0 2em 0 3em',
                    }}
                >
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
                            className="form-control bg-transparent text-white"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        {errors.email ? <p className="text-red"> {errors?.email?.message}</p> : ''}
                        <label htmlFor="floatingInput" className="text-white">
                            帳號
                        </label>
                    </div>
                    <div className="form-floating">
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
                            className="form-control bg-transparent text-white"
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        {errors.password ? (
                            <p className="text-red"> {errors?.password?.message}</p>
                        ) : (
                            ''
                        )}
                        <label htmlFor="floatingPassword" className="text-white">
                            密碼
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary rounded-3 mt-5 w-100">
                        登入
                    </button>
                    <Link to="/register" className="btn btn-text align-self-end body1-medium p-3">
                        立即註冊
                    </Link>
                    <p
                        className="slg position-absolute fs-4 text-white"
                        style={{
                            left: 'calc(-1em - 2vw)',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 'min-content',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        每 一 步 ， 都 是 為 出 發 做 準 備 。
                    </p>
                </form>
            </section>
        </>
    );
};

export default Login;
