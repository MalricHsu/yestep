import { useEffect } from 'react';

const Theme = () => {
    useEffect(() => {
        document.title = '主題活動 | YeStep';
    }, []);
    return (
        <>
            <button type="button" className="btn btn-primary-50 rounded-16">
                按我
            </button>
            <h1>我是標題</h1>
            <p>aaaaaa</p>
        </>
    );
};

export default Theme;
