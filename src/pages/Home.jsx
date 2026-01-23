import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = '首頁 | YeStep';
    }, []);
    return (
        <>
            <div>我是首頁</div>
        </>
    );
};

export default Home;
