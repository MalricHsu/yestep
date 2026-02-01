import { useEffect } from 'react';
import Nav from '../components/Nav';

const Theme = () => {
    useEffect(() => {
        document.title = '主題活動 | YeStep';
    }, []);
    return (
        <>
            <header className="theme-header">
                <Nav />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <h3 className="text-white text-center fw-medium fs-7 mb-8">主題活動</h3>
                            <h1 className="text-white text-center mb-8">
                                一起走進自然 找回你的節奏
                            </h1>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="py-8">
                    <div className="container"></div>
                </div>
            </main>
        </>
    );
};

export default Theme;
