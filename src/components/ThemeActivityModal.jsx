//React套件
import { useEffect, useRef } from 'react';
//第三方套件
import { Modal } from 'bootstrap';

const ThemeActivityModal = ({ isOpen, status, onClose }) => {
  const activityRef = useRef(null);
  const activityInstance = useRef(null);
  // 合併初始化與清理邏輯
  useEffect(() => {
    // 確保元素存在才初始化
    if (activityRef.current) {
      activityInstance.current = new Modal(activityRef.current, {
        backdrop: 'static',
      });
    }
    const element = activityRef.current;
    const handleHidden = () => {
      onClose(); // 當動畫結束、徹底隱藏後，才回傳給父組件
    };

    element.addEventListener('hidden.bs.modal', handleHidden);

    // 清理機制：當組件卸載時，銷毀 Modal 實例與監聽器
    return () => {
      element.removeEventListener('hidden.bs.modal', handleHidden);
      if (activityInstance.current) {
        activityInstance.current.dispose();
      }
    };
  }, [onClose]);

  // 監聽 isOpen
  useEffect(() => {
    // 必須檢查實例是否存在
    if (!activityInstance.current) return;
    if (isOpen) {
      activityInstance.current.show();
    } else {
      activityInstance.current.hide();
    }
  }, [isOpen]);

  const isSuccess = status === 'success';
  return (
    <>
      <div className="modal" tabIndex="-1" ref={activityRef}>
        <div className="modal-dialog modal-dialog-centered rounded-24">
          <div className="modal-content">
            <div className="modal-body p-6">
              <div className="mb-6">
                <h5 className="sub1-bold text-center text-primary-300 mb-3">
                  {isSuccess ? '您已報名本次活動' : '您此本次活動報名失敗'}
                </h5>
                <p className="body-regular1 text-center text-black-700">
                  {isSuccess ? '報名結果將以 Email 通知為主' : '請檢查輸入資訊或稍後再試'}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center gap-3 px-6">
                <button
                  type="button"
                  className={`btn btn-outline-primary-300 w-100 `}
                  onClick={() => {
                    activityInstance.current.hide();
                  }}
                >
                  {isSuccess ? '我知道了' : '請重新申請表單'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ThemeActivityModal;
