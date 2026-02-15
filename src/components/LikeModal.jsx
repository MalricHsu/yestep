import { Modal } from 'bootstrap';
import { useEffect, useRef } from 'react';

const LikeModal = ({ isOpen, detailData, onClose, onConfirm }) => {
    const likeRef = useRef(null);
    const likeInstance = useRef(null);

    useEffect(() => {
        if (likeRef.current) {
            likeInstance.current = new Modal(likeRef.current, { backdrop: 'static' });
        }
        //更新isUnfavoriteModalOpen狀態
        const handleHidden = () => onClose();
        likeRef.current.addEventListener('hidden.bs.modal', handleHidden);

        return () => {
            if (likeRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                likeRef.current.removeEventListener('hidden.bs.modal', handleHidden);
            }
            if (likeInstance.current) likeInstance.current.dispose();
        };
    }, [onClose]);

    useEffect(() => {
        if (!likeInstance.current) return;
        isOpen ? likeInstance.current.show() : likeInstance.current.hide();
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
                                    我在想想
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
