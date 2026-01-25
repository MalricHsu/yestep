const StarRating = ({ rating }) => {
    const difficultyMap = {
        休閒級: 1,
        入門級: 2,
        健行級: 3,
        挑戰級: 4,
        專業級: 5,
        default: 1,
    };
    const starCount = difficultyMap[rating] || difficultyMap['default'];
    const totalStars = 5;
    return (
        <div className="d-flex">
            {Array.from({ length: totalStars }).map((_, index) => {
                const isActive = index < starCount;
                return (
                    <span
                        key={index}
                        style={{ fontSize: '12px' }}
                        className={`material-icons ${isActive ? 'text-primary-300' : 'text-black-200'}`}
                    >
                        star
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;
