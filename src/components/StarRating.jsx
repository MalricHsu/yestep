const StarRating = ({ rating, fontSize, color }) => {
    const difficultyMap = {
        休閒級: 1,
        入門級: 2,
        健行級: 3,
        挑戰級: 4,
        專業級: 5,
    };

    const getStarCount = (val) => {
        // 1. 先看是不是對應的中文關鍵字
        if (difficultyMap[val]) return difficultyMap[val];

        // 2. 嘗試轉成數字
        const num = parseInt(val, 10);

        // 3. 如果是有效數字，限制在 0~5 之間；否則回傳預設值 1
        return !isNaN(num) ? Math.min(Math.max(num, 0), 5) : 1;
    };

    const starCount = getStarCount(rating);
    const totalStars = 5;

    return (
        <div className="d-flex">
            {[...Array(totalStars)].map((_, index) => (
                <span
                    key={index}
                    style={{ fontSize: `${fontSize}px` }}
                    className={`material-icons ${index < starCount ? `${color}` : 'text-black-200'}`}
                >
                    star
                </span>
            ))}
        </div>
    );
    text - primary - 300;
};

export default StarRating;
