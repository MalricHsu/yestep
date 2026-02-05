function ScrollToTop() {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // 'smooth' 可以讓畫面平滑地滾動上去
        });
    };

    return (
        <button
            type="button"
            className="to-top-btn p-0 btn btn-primary-300 rounded-100"
            onClick={handleScrollToTop}
        >
            <span className="material-symbols-outlined p-3">keyboard_arrow_up</span>
        </button>
    );
}

export default ScrollToTop;
