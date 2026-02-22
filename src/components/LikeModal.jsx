//React套件
import { Modal } from 'bootstrap';
//第三方套件
import { useEffect, useRef } from 'react';

const LikeModal = ({ isOpen, detailData, onClose, onConfirm }) => {
    const likeRef = useRef(null);
    const likeInstance = useRef(null);

    // 1. 負責初始化 Modal 與綁定事件
    useEffect(() => {
        const modalElement = likeRef.current;
        if (!modalElement) return;

        // 確保 Modal 實體只會被建立一次，避免重複 new 產生破圖
        if (!likeInstance.current) {
            likeInstance.current = new Modal(modalElement, { backdrop: 'static' });
        }

        const handleHidden = () => {
            if (onClose) onClose();
        };

        // 綁定隱藏事件
        modalElement.addEventListener('hidden.bs.modal', handleHidden);

        return () => {
            // 只移除事件監聽，不要在這裡 dispose！
            modalElement.removeEventListener('hidden.bs.modal', handleHidden);
        };
    }, [onClose]);

    // 2. 負責在元件完全卸載時，清空記憶體中的 Modal 實體
    useEffect(() => {
        return () => {
            if (likeInstance.current) {
                likeInstance.current.dispose();
                likeInstance.current = null;
            }
        };
    }, []);

    // 3. 監控 isOpen 狀態來開關 Modal
    useEffect(() => {
        if (!likeInstance.current) return;
        if (isOpen) {
            likeInstance.current.show();
        } else {
            likeInstance.current.hide();
        }
    }, [isOpen]);

    return (
        <>
            <div className="modal" tabIndex="-1" ref={likeRef}>
                <div className="modal-dialog modal-dialog-centered rounded-24">
                    <div className="modal-content">
                        <div className="modal-body p-6">
                            <div className="mb-6">
                                <h5 className="sub1-bold text-center text-primary-300 mb-3">
                                    {`您確定要取消收藏 ${detailData.trail_name} 步道嗎？ `}
                                </h5>
                            </div>
                            <div className="d-flex justify-content-between align-items-center gap-3 px-6">
                                <button
                                    type="button"
                                    className={`btn btn-outline-primary-300 w-50 `}
                                    onClick={() => likeInstance.current.hide()}
                                >
                                    我再想想
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-primary-100 w-50 `}
                                    onClick={() => {
                                        onConfirm();
                                    }}
                                >
                                    確定取消
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LikeModal;
