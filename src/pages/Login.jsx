import { useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        document.title = '登入 | YeStep';
    }, []);

    return (
        <>
            <section
                className=""
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.6)), url('https://images.unsplash.com/photo-1587951326187-c9baa4606bff?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    // 為了讓背景填滿，建議加這行 (視需求調整)
                    minHeight: '100vh',
                    width: '100%',
                    backgroundSize: 'cover', // 建議用 cover 填滿畫面，contain 可能會留白
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    className="loginContainer rounded-5"
                    // 3. 修正這裡的 style，字串改為物件
                    style={{
                        maxWidth: '500px',
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '5em 2em',
                    }}
                >
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control bg-transparent text-white"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        {/* 4. for 改為 htmlFor */}
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
                </div>
            </section>
        </>
    );
};

export default Login;
