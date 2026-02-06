import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    useEffect(() => {
        document.title = '登入 | YeStep';
    }, []);

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
                            type="email"
                            className="form-control bg-transparent text-white"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput" className="text-white">
                            帳號
                        </label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control bg-transparent text-white"
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword" className="text-white">
                            密碼
                        </label>
                    </div>
                    <Link type="submit" className="btn btn-primary rounded-3 mt-5 w-100">
                        登入
                    </Link>
                    <Link className="btn btn-text align-self-end body1-medium p-3">立即註冊</Link>
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
                        每​ 一​ 步 ，​ 都​ 是​ 為​ 出 發 ​做​ 準 ​備 。​
                    </p>
                </form>
            </section>
        </>
    );
};

export default Login;
