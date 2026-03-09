//按鈕元件
const DetailsActionButtons = ({ favoriteId, handleAction }) => {
  // 利用 !! 將 ID 轉為布林值來決定樣式
  const isLiked = !!favoriteId;
  return (
    <>
      <button
        type="button"
        className={`btn px-6 py-3 d-flex justify-content-center align-items-center me-3 ${isLiked ? 'btn-primary-100 text-white' : 'btn-outline-primary-300'} `}
        onClick={() => {
          handleAction('like');
        }}
      >
        <span className="material-symbols-outlined m-0">favorite</span>
        <p className="ms-1 body1-bold">{isLiked ? '已收藏' : '加入收藏'}</p>
      </button>
    </>
  );
};

export default DetailsActionButtons;
