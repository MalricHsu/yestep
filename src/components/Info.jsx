//React套件
import { useEffect, useRef } from 'react';
//狀態管理
import { useDispatch, useSelector } from 'react-redux';
import { removeMessage } from '../slices/infoSlice';
//圖檔
import logoImg from '../assets/images/logo/logo-white.png';

const Info = () => {
  const messageState = useSelector((state) => state.info);
  const { isShow, text, type, time } = messageState;
  const dispatch = useDispatch();

  const timeoutRef = useRef(null);
  //Toast 訊息自動消失
  useEffect(() => {
    if (isShow) {
      // 1. 先檢查：有沒有「舊的」計時器正在跑？
      if (timeoutRef.current) {
        // 有的話，把舊的殺掉！(重置倒數)
        clearTimeout(timeoutRef.current);
      }
      // 2. 設定「新的」計時器
      timeoutRef.current = setTimeout(() => {
        dispatch(removeMessage());
      }, 2000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isShow, dispatch]);

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <div
        className={`toast ${isShow ? 'show' : ''}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className={`toast-header ${type === 'success' ? 'bg-primary-200' : 'bg-red'}`}>
          <img src={logoImg} className="rounded me-2" alt="logo" width="20" />

          <strong className={`me-auto text-white`}>YeStep</strong>

          <small className="text-white">{time}</small>
        </div>
        <div className={`toast-body `}>{text}</div>
      </div>
    </div>
  );
};

export default Info;
