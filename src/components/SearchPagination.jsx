const SearchPagination = ({ totalPages, currentPage, updateRoute }) => {
  // 處理頁碼 Prev、Next
  const handlePageChange = (targetPage) => {
    if (targetPage < 1 || targetPage > totalPages) return;

    // 修正：傳入物件而非單一字串
    updateRoute({ _page: targetPage });

    window.scrollTo({
      top: 200,
      behavior: 'smooth',
    });
  };

  // 處理頁碼點擊
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>,
      );
    }
    return pages;
  };

  return (
    <div className="d-flex justify-content-center">
      <ul className="pagination gap-1">
        {/* 上一頁 */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
            <span className="material-symbols-outlined">keyboard_arrow_left</span>
          </button>
        </li>

        {/* 動態產生頁碼按鈕 */}
        {renderPagination()}

        {/* 下一頁 */}
        <li
          className={`page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}
        >
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
            <span className="material-symbols-outlined">keyboard_arrow_right</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SearchPagination;
