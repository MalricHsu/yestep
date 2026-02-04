import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Modal } from 'bootstrap';
import { useNavigate } from 'react-router-dom';

const MODAL_CONFIG = {
    //沒登入
    like_guest: {
        title: '還沒​加入​會員嗎？​',
        desc: '加入​會員，​立即​蒐集​你​想走​的​每​一​步',
        buttons: [{ text: '前往登入', action: 'redirect', path: '/login', style: 'primary-100' }],
    },
    plan_guest: {
        title: '還沒​加入​會員嗎？​',
        desc: '加入​會員，​立即​規劃​你​想走​的​每​一​步​',
        buttons: [{ text: '前往登入', action: 'redirect', path: '/login', style: 'primary-100' }],
    },
    //有登入
    like_auth: {
        title: '已加入 YeStep！​',
        desc: '你的專屬步道清單已準備就緒，隨時都能出發',
        buttons: [
            { text: '我知道了', action: 'close', style: 'outline-primary-300' },
            {
                text: '查看收藏',
                action: 'redirect',
                path: '/member',
                style: 'primary-100',
            },
        ],
    },
    plan_auth: {
        title: '已加入 YeStep！​',
        desc: '一起跟YeStep前往規劃旅程吧',
        buttons: [
            { text: '我知道了', action: 'close', style: 'outline-primary-300' },
            {
                text: '查看行程',
                action: 'redirect',
                path: '/member',
                style: 'primary-100',
            },
        ],
    },
};

const ActionModal = forwardRef((props, ref) => {
    const ModalRef = useRef(null);
    //建立一個實例
    const modalInstanceRef = useRef(null);
    const [currentMode, setCurrentModal] = useState('like_guest');
    const navigate = useNavigate();

    useEffect(() => {
        if (ModalRef.current) {
            modalInstanceRef.current = new Modal(ModalRef.current, {
                backdrop: true,
            });
        }
        return () => {
            modalInstanceRef.current.dispose();
            modalInstanceRef.current = null;
        };
    }, []);

    // 對外公開的方法
    useImperativeHandle(ref, () => {
        return {
            open: (key) => {
                if (MODAL_CONFIG[key]) {
                    setCurrentModal(key);
                    modalInstanceRef.current?.show();
                }
            },
            close: () => {
                modalInstanceRef.current?.hide();
            },
        };
    });

    //取得當前設定
    const content = MODAL_CONFIG[currentMode];

    //處理按鈕點擊
    const handleButtonClick = (btn) => {
        modalInstanceRef.current?.hide();
        if (btn.action === 'redirect' && navigate) {
            navigate(btn.path);
        }
    };

    return (
        <>
            <div className="modal" tabIndex="-1" ref={ModalRef}>
                <div className="modal-dialog modal-dialog-centered rounded-24">
                    <div className="modal-content">
                        <div className="modal-body p-6">
                            <div className="mb-6">
                                <h5 className="sub1-bold text-center text-primary-300 mb-3">
                                    {content.title}
                                </h5>
                                <p className="body-regular text-center text-black-700">
                                    {content.desc}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center gap-3 px-6">
                                {content.buttons.map((btn, index) => {
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`btn btn-${btn.style} ${content.buttons.length === 1 ? 'w-100' : 'w-50'}`}
                                            onClick={() => {
                                                handleButtonClick(btn);
                                            }}
                                        >
                                            {btn.text}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
export default ActionModal;
