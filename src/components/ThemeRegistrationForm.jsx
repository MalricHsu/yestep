//React套件
import { useMemo, useState } from 'react';

//狀態管理
import { createMessage } from '../slices/infoSlice';
import { useDispatch } from 'react-redux';

//元件
import ThemeActivityModal from './ThemeActivityModal';

//API
import { TrailsApi } from '../server/api';

const ThemeRegistrationForm = () => {
  const dispatch = useDispatch();
  const sessions = useMemo(() => Array.from({ length: 7 }, (_, i) => i + 1), []);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    session: '',
    qty: 0,
    consent: false,
  });
  const [errors, setErrors] = useState({});
  //顯示modal
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    status: 'success',
  });
  // 共用 input change
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 人數加減
  const handleQty = (delta) => {
    setForm((prev) => {
      const next = Math.max(0, Math.min(10, Number(prev.qty) + delta));
      return { ...prev, qty: next };
    });
  };

  //表單驗證
  const validate = () => {
    const newErrors = {};
    // 姓名
    if (!form.name.trim()) {
      newErrors.name = '請輸入您的姓名';
    }
    // 電話（09xxxxxxxx 或 10 碼數字）
    if (!form.phone.trim()) {
      newErrors.phone = '請輸入您的聯絡電話';
    } else if (!/^(\d{10}|09\d{8})$/.test(form.phone)) {
      newErrors.phone = '您的電話格式不正確';
    }
    // Email
    if (!form.email.trim()) {
      newErrors.email = '請輸入您的Email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = '您的Email格式不正確';
    }
    // 場次
    if (!form.session) {
      newErrors.session = '請您選擇想要參與的活動場次';
    }
    // 人數
    if (form.qty <= 0) {
      newErrors.qty = '人數至少 1 人';
    }
    // 同意條款
    if (!form.consent) {
      newErrors.consent = '請勾選同意條款';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 送出
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await TrailsApi.post('/registrations', form);
      setModalConfig({ isOpen: true, status: 'success' });
      setForm({ name: '', phone: '', email: '', session: '', qty: 0, consent: false });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || '連線伺服器失敗';
      dispatch(createMessage({ text: errorMessage, type: 'red' }));
      setModalConfig({ isOpen: true, status: 'error' });
    }
  };
  return (
    <>
      <form
        className="registration bg-white p-4 p-md-6 rounded-24 d-flex flex-column gap-4 gap-md-5"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="sub1-bold text-primary-300 text-center">
          <span className="fw-normal text-primary-200 fs-5">\</span> 立即報名導覽
          <span className="fw-normal text-primary-200 fs-5">/</span>
        </h2>

        {/* 姓名 */}
        <div className="form-floating">
          <input
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="registerName"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="姓名"
            required
          />
          <label htmlFor="registerName">
            姓名<span className="text-red ps-1">*</span>
          </label>
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* 聯絡電話 */}
        <div className="form-floating">
          <input
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            id="phoneNumber"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="0900-000-000"
            required
          />
          <label htmlFor="phoneNumber">
            聯絡電話<span className="text-red ps-1">*</span>
          </label>
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        {/* Email */}
        <div className="form-floating">
          <input
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />
          <label htmlFor="email">
            E-mail<span className="text-red ps-1">*</span>
          </label>
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* 活動場次 */}
        <div>
          <label htmlFor="session" className="form-label">
            活動場次<span className="text-red ps-1">*</span>
          </label>
          <select
            className={`form-select ${errors.session ? 'is-invalid' : ''}`}
            id="session"
            name="session"
            value={form.session}
            onChange={handleChange}
          >
            <option value="">請選擇活動場次</option>
            {sessions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.session && <div className="invalid-feedback d-block">{errors.session}</div>}
        </div>

        {/* 參加人數 */}
        <div>
          <label className="mb-2">
            參加人數<span className="text-red ps-1">*</span>
          </label>

          <div className="input-group mb-1">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => handleQty(-1)}
            >
              －
            </button>

            <input
              // Bootstrap 5 的 class 寫得很好，這裡保留
              className={`form-control text-center ${errors.qty ? 'is-invalid' : ''}`}
              name="qty"
              type="number"
              min="0"
              max="10"
              value={form.qty}
              // 防護一：直接在鍵盤按下時，阻擋 e, E, +, -, . 的輸入
              onKeyDown={(e) => {
                if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const v = e.target.value;
                // 允許清空
                if (v === '') return setForm((p) => ({ ...p, qty: '' }));
                const numValue = Number(v);
                // 防護二：如果真的有漏網之魚導致轉換出 NaN，直接 return 阻止 state 壞掉
                if (Number.isNaN(numValue)) return;
                setForm((p) => ({
                  ...p,
                  qty: Math.max(0, Math.min(10, numValue)),
                }));
              }}
              onBlur={() => setForm((p) => ({ ...p, qty: p.qty === '' ? 0 : p.qty }))}
            />

            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => handleQty(1)}
            >
              ＋
            </button>
          </div>

          {errors.qty && <div className="invalid-feedback d-block">{errors.qty}</div>}
        </div>

        {/* 同意條款 */}
        <div className="form-check">
          <input
            className={`form-check-input ${errors.consent ? 'is-invalid' : ''}`}
            id="checkDefaultOn"
            name="consent"
            type="checkbox"
            checked={form.consent}
            onChange={handleChange}
          />
          <label
            className="form-check-label text-black-700"
            htmlFor="checkDefaultOn"
            style={{ cursor: 'pointer' }}
          >
            我同意活動照片可作為宣傳使用
          </label>
          {errors.consent && <div className="invalid-feedback d-block">{errors.consent}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          送出
        </button>
      </form>
      <ThemeActivityModal
        isOpen={modalConfig.isOpen}
        status={modalConfig.status}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </>
  );
};
export default ThemeRegistrationForm;
