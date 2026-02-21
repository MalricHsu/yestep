//React套件
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate(); // 初始化導航功能

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            // 帶參數跳轉
            navigate(`/search?q=${encodeURIComponent(keyword)}`);
        }
    };

    return (
        <form className="search-bar mb-3 px-3 py-2 bg-white rounded-pill" onSubmit={handleSearch}>
            <div className="input-group align-items-center">
                <input
                    type="text"
                    className="form-control px-4"
                    placeholder="Next Step！想要去哪裡？"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="btn btn-primary rounded-pill px-6" type="submit">
                    搜尋
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
