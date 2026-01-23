import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const NotFound404 = () => {
    const Navigate = useNavigate();

    useEffect(() => {
        document.title = 'NotFound404 | YeStep';
        setTimeout(() => {
            Navigate('/');
        }, 3000);
    }, [Navigate]);
    return (
        <>
            <h1>這是不存在的頁面</h1>
        </>
    );
};

export default NotFound404;
