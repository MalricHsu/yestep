// react套件
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// 狀態管理
import { useDispatch } from 'react-redux';
import { createMessage } from '../slices/infoSlice';
import { updateName } from '../slices/authSlice';
import TrailLoading from '../components/TrailLoading';

// API
import { TrailsApi } from '../server/api';

// 第三方套件
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Doughnut, Bar } from 'react-chartjs-2';
import Cookies from 'js-cookie';

// 元件
import Nav from '../components/Nav';

// 圖表設定
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const withImgParams = (url, { q = 75, w = 520 } = {}) => {
  if (!url) return '';
  const params = `q=${q}&w=${w}&fm=webp&auto=format&fit=crop`;
  return url.includes('?') ? `${url}&${params}` : `${url}?${params}`;
};

const OptimizedImg = ({ src, alt = '', q = 75, w = 520, className, style, ...rest }) => {
  return (
    <img
      src={withImgParams(src, { q, w })}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
};

// 刪除收藏 Modal
const ConfirmModal = ({ open, title, content, onConfirm, onClose }) => {
  if (!open) return null;

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1060 }} onClick={onClose} />
      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        style={{ display: 'block', zIndex: 1061 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-24 overflow-hidden shadow">
            <div className="modal-body p-4 p-md-5">
              <div className="mb-4">
                <h5 className="sub1-bold text-center text-primary-300 mb-3">{title}</h5>
                <p className="body-regular text-center text-black-700 mb-0">{content}</p>
              </div>

              <div className="d-flex justify-content-center align-items-center gap-3">
                <button
                  type="button"
                  className="btn btn-outline-primary-300 w-50 rounded-pill"
                  onClick={onClose}
                >
                  我再想想
                </button>
                <button
                  type="button"
                  className="btn btn-primary-100 w-50 rounded-pill"
                  onClick={onConfirm}
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

// Itinerary modal
const ItineraryModal = ({
  open,
  data,
  note,
  isEdit,
  onChangeNote,
  onClose,
  onSaveNote,
  saving,
}) => {
  if (!open || !data) return null;
  const dateText = (() => {
    try {
      return new Date(data.date).toLocaleString('zh-TW');
    } catch {
      return data.date || '';
    }
  })();

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1050 }} />
      <div className="modal fade show" style={{ display: 'block', zIndex: 1051 }} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-24 overflow-hidden">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-semibold">{isEdit ? '編輯行程規劃' : '已加入行程'}</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body pt-3">
              <div className="d-flex gap-3 align-items-center mb-3">
                <OptimizedImg
                  src={data.trailImage}
                  alt={data.trailName || ''}
                  w={220}
                  style={{ width: 88, height: 64, borderRadius: 16, objectFit: 'cover' }}
                />
                <div className="flex-grow-1">
                  <div className="fw-semibold">{data.trailName}</div>
                  <div className="small text-muted">加入日期：{dateText}</div>
                </div>
              </div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="新增筆記"
                  style={{ minHeight: 110 }}
                  value={note}
                  onChange={(e) => onChangeNote(e.target.value)}
                />
                <label>筆記（可選）</label>
              </div>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button className="btn btn-outline-secondary" onClick={onClose}>
                關閉
              </button>
              <button className="btn btn-primary" onClick={onSaveNote} disabled={saving}>
                {saving ? '儲存中…' : isEdit ? '更新規劃' : '儲存規劃'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// 我的收藏 dropdown
const MobileFavoriteDropdown = ({ favorites = [], onRemove, onAddItinerary }) => {
  return (
    <div className="accordion d-flex flex-column gap-2" id="favoriteAccordion">
      {favorites.map((item) => (
        <div className="accordion-item border-0 rounded-md-24 overflow-hidden" key={item.id}>
          <h2 className="accordion-header border-0" id={`heading-${item.id}`}>
            <button
              className="accordion-button collapsed p-3 p-md-4 border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse-${item.id}`}
              aria-expanded="false"
              aria-controls={`collapse-${item.id}`}
            >
              <div className="d-flex w-100 align-items-center gap-3">
                <OptimizedImg
                  src={item.image}
                  alt={item.name || ''}
                  q={75}
                  w={160}
                  style={{
                    width: 64,
                    height: 48,
                    borderRadius: '0.75vw',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <div className="flex-grow-1 text-start">
                  <div className="fw-semibold text-primary-300">{item.name}</div>
                  <div className="small text-muted">
                    {item.length} • {item.altitude}
                  </div>
                </div>
              </div>
            </button>
          </h2>
          <div
            id={`collapse-${item.id}`}
            className="accordion-collapse collapse border-0"
            aria-labelledby={`heading-${item.id}`}
            data-bs-parent="#favoriteAccordion"
          >
            <div className="accordion-body p-3 p-md-4 border-0">
              <div className="p-3 p-md-4 rounded-4">
                <div className="d-grid gap-2 mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">長度</span>
                    <span className="fw-semibold">{item.length}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">海拔</span>
                    <span className="fw-semibold">{item.altitude} 公尺</span>
                  </div>
                </div>

                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center">
                  <Link
                    to={`/detail/${item.trailId ?? item.id}`}
                    target="_blank"
                    className="btn btn-primary-100 body1-bold fs-9 w-100 w-md-auto"
                  >
                    查看步道
                  </Link>
                  <button
                    type="button"
                    className="btn btn-primary-100 body1-bold fs-9 w-100 w-md-auto"
                    onClick={() => onAddItinerary?.(item)}
                  >
                    規劃行程
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary-100 body1-bold fs-9 w-100 w-md-auto"
                    onClick={() => onRemove(item.id)}
                  >
                    取消收藏
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Tab會員頁面
const MEMBER_TABS = [
  {
    key: 'member',
    label: '我的帳號',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z" />
      </svg>
    ),
  },
  {
    key: 'favorite',
    label: '我的收藏',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
      </svg>
    ),
  },
  {
    key: 'analytics',
    label: '統計分析',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path d="M160-160v-320h160v320H160Zm240 0v-640h160v640H400Zm240 0v-440h160v440H640Z" />
      </svg>
    ),
  },
  {
    key: 'recommend',
    label: '你可能會喜歡',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path d="M200-200v-560 179-19 400Zm80-240h221q2-22 10-42t20-38H280v80Zm0 160h157q17-20 39-32.5t46-20.5q-4-6-7-13t-5-14H280v80Zm0-320h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v258q-14-26-34-46t-46-33v-179H200v560h202q-1 6-1.5 12t-.5 12v56H200Zm409-229q-29-29-29-71t29-71q29-29 71-29t71 29q29 29 29 71t-29 71q-29 29-71 29t-71-29ZM480-120v-56q0-24 12.5-44.5T528-250q36-15 74.5-22.5T680-280q39 0 77.5 7.5T832-250q23 9 35.5 29.5T880-176v56H480Z" />
      </svg>
    ),
  },
];

const MemberTabs = ({ activeTab, onChange }) => {
  return (
    <ul className="nav nav-underline flex-nowrap w-100 opacity-75">
      {MEMBER_TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <li key={tab.key} className={`nav-item w-100 memberTabBtn ${isActive ? 'active' : ''}`}>
            <button
              type="button"
              className={`nav-link w-100 d-flex justify-content-center ${isActive ? 'active' : ''}`}
              onClick={() => onChange(tab.key)}
            >
              {tab.svg}
              <span className="memberTabLabel">{tab.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const scrollToTopMinus = (id, offset = 50) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

// 會員資料頁面元件
const ProfileCard = ({ title, children, actions }) => (
  <div className="profileCard rounded-24 p-4 p-md-5 shadow-sm border-0">
    <header className="mb-4">
      <h3 className="fw-bold m-0 text-primary-dark">{title}</h3>
      {actions}
    </header>
    {children}
  </div>
);

const ProfileSectionTitle = ({ children }) => (
  <h5
    className="text-muted small fw-bold text-uppercase mb-4 border-bottom border-primary-200 pb-2"
    style={{ letterSpacing: '1px' }}
  >
    {children}
  </h5>
);

const ReadonlyField = ({ label, value }) => (
  <div className="mb-4">
    <label className="form-label small text-muted ps-2">{label}</label>
    <input
      type="text"
      className="form-control-plaintext border-0 px-2 py-0 fw-bold text-primary-300"
      value={value ?? ''}
      readOnly
    />
  </div>
);

const FloatingInput = ({ id, label, type = 'text', placeholder, disabled, register, error }) => (
  <div className="form-floating">
    <input
      id={id}
      type={type}
      placeholder={placeholder || label}
      disabled={disabled}
      className={`form-control rounded-16 ${disabled ? 'border-transparent bg-light opacity-75' : 'border-primary'} ${error ? 'is-invalid' : ''}`}
      {...register}
    />
    <label htmlFor={id}>{label}</label>
    {error && <div className="invalid-feedback d-block ps-2">{error}</div>}
  </div>
);

const FloatingSelect = ({ id, label, disabled, register, options }) => (
  <div className="form-floating">
    <select
      id={id}
      disabled={disabled}
      className={`form-select rounded-16 ${disabled ? 'border-transparent bg-light opacity-75' : 'border-primary'}`}
      {...register}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <label htmlFor={id}>{label}</label>
  </div>
);

const ProfileActions = ({ isEditing, onEdit, onCancel, submitting }) => {
  if (!isEditing) {
    return (
      <button type="button" className="btn btn-primary rounded-pill px-6" onClick={onEdit}>
        <i className="bi bi-pencil-square"></i>編輯資料
      </button>
    );
  }
  return (
    <div className="d-flex gap-2">
      <button
        type="button"
        className="btn btn-outline-secondary rounded-pill px-3"
        onClick={onCancel}
        disabled={submitting}
      >
        取消
      </button>
      <button
        type="submit"
        form="member-profile-form"
        className="btn btn-primary rounded-pill px-6"
        disabled={submitting}
      >
        {submitting ? '儲存中…' : '確認儲存'}
      </button>
    </div>
  );
};

// MemberProfile 元件
const MemberProfile = ({ user, setUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get('accessToken');
  const userId = user?.id ?? Number(Cookies.get('userId'));

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      gender: '',
      gender_detail: '',
      birthday: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onBlur',
  });

  const genderValue = watch('gender');
  const authHeaders = useMemo(() => (token ? { Authorization: `Bearer ${token}` } : {}), [token]);

  useEffect(() => {
    const getProfile = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const res = await TrailsApi.get(`/users/${userId}`, { headers: authHeaders });
        const u = res?.data;
        if (!u) return;

        reset({
          email: u.email || '',
          name: u.name || '',
          phone: u.phone || '',
          gender: u.gender || '',
          gender_detail: u.gender_detail || '',
          birthday: u.birthday || '',
          password: '',
          passwordConfirm: '',
        });

        if (setUser) setUser((prev) => ({ ...(prev || {}), ...u }));
        Cookies.set('user', JSON.stringify({ ...(user || {}), ...u }));
        if (u.id != null) Cookies.set('userId', String(u.id));
      } catch (err) {
        dispatch(
          createMessage({
            text: err.response?.data?.message || '會員資料載入失敗，請重新登入',
            type: 'red',
          }),
        );
        navigate('/login', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, reset, dispatch, navigate, authHeaders]);

  const onSubmit = async (data) => {
    if (!userId) return;
    const nextPassword = (data.password || '').trim();
    if (nextPassword) {
      if (nextPassword.length < 6)
        return dispatch(createMessage({ text: '密碼至少 6 碼', type: 'red' }));
      if (nextPassword !== (data.passwordConfirm || '').trim())
        return dispatch(createMessage({ text: '兩次輸入的密碼不一致', type: 'red' }));
    }

    const payload = {
      name: (data.name || '').trim(),
      phone: String(data.phone || '').trim(),
      gender: String(data.gender || '').trim(),
      gender_detail: String(data.gender_detail || '').trim(),
      birthday: String(data.birthday || '').trim(),
      ...(nextPassword ? { password: nextPassword } : {}),
    };

    try {
      const res = await TrailsApi.patch(`/users/${userId}`, payload, { headers: authHeaders });
      const updated = res?.data || payload;

      dispatch(updateName(updated));
      dispatch(createMessage({ text: '會員資料更新成功', type: 'success' }));
      reset({
        ...getValues(),
        name: updated.name ?? payload.name,
        password: '',
        passwordConfirm: '',
      });

      if (setUser) setUser((prev) => ({ ...(prev || {}), ...updated }));
      Cookies.set('user', JSON.stringify({ ...(user || {}), ...updated }));
      setIsEditing(false);
    } catch (err) {
      dispatch(createMessage({ text: err.response?.data?.message || '更新資料失敗', type: 'red' }));
    }
  };

  return (
    <ProfileCard
      title={
        <>
          <i className="bi bi-person-badge me-2"></i>基本資料
        </>
      }
      actions={
        <ProfileActions
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onCancel={() => {
            setIsEditing(false);
            reset(getValues());
          }}
          submitting={isSubmitting}
        />
      }
    >
      {loading ? (
        <TrailLoading />
      ) : (
        <form id="member-profile-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <ProfileSectionTitle>帳號資訊</ProfileSectionTitle>
            <ReadonlyField label="Email (不可修改)" value={getValues('email')} />
          </div>
          <div className="mb-4">
            <ProfileSectionTitle>基本資料</ProfileSectionTitle>
            <div className="d-flex flex-column gap-3 gap-md-4">
              <FloatingInput
                id="nameInput"
                label="暱稱（可修改）"
                disabled={!isEditing}
                register={register('name', {
                  required: '暱稱不能為空',
                  minLength: { value: 2, message: '至少 2 個字' },
                  maxLength: { value: 20, message: '最多 20 個字' },
                })}
                error={errors.name?.message}
              />
              <FloatingInput
                id="passwordInput"
                label="新密碼"
                type="password"
                placeholder="至少 6 碼"
                disabled={!isEditing}
                register={register('password')}
                error={errors.password?.message}
              />
              <FloatingInput
                id="passwordConfirmInput"
                label="確認新密碼"
                type="password"
                disabled={!isEditing}
                register={register('passwordConfirm')}
                error={errors.passwordConfirm?.message}
              />
              <FloatingInput
                id="phoneInput"
                label="手機號碼"
                disabled={!isEditing}
                register={register('phone', {
                  validate: (v) =>
                    !isEditing || !v || /^(09\d{8}|\d{10})$/.test(v) || '手機號碼格式不正確',
                })}
                error={errors.phone?.message}
              />
              <FloatingSelect
                id="genderSelect"
                label="性別"
                disabled={!isEditing}
                register={register('gender')}
                options={[
                  { value: '', label: '未指定' },
                  { value: 'female', label: '女性' },
                  { value: 'male', label: '男性' },
                  { value: 'custom', label: '自我描述（自行輸入）' },
                ]}
              />

              {genderValue === 'custom' && (
                <FloatingInput
                  id="genderDetailInput"
                  label="性別自我描述"
                  disabled={!isEditing}
                  register={register('gender_detail', {
                    validate: (v) =>
                      !isEditing ||
                      genderValue !== 'custom' ||
                      (v && v.trim()) ||
                      '請輸入性別自我描述',
                  })}
                  error={errors.gender_detail?.message}
                />
              )}

              <FloatingInput
                id="birthdayInput"
                label="生日"
                type="date"
                disabled={!isEditing}
                register={register('birthday')}
                error={errors.birthday?.message}
              />
            </div>
          </div>
        </form>
      )}
    </ProfileCard>
  );
};

// 收藏頁面元件
const MemberFavorite = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [itineraryIds, setItineraryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const [itineraryModalOpen, setItineraryModalOpen] = useState(false);
  const [itineraryData, setItineraryData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [itineraryNote, setItineraryNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const token = Cookies.get('accessToken');
        const [favRes, itiRes] = await Promise.all([
          TrailsApi.get(`/favorites?userId=${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          TrailsApi.get(`/itinerary?userId=${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (mounted) {
          setFavorites(
            favRes.data.map((f) => ({
              id: f.id,
              trailId: f.trailId,
              name: f.trailName,
              image: f.trailImage,
              length: f.trail_length ?? '—',
              altitude: f.trail_altitude ?? '—',
            })),
          );
          setItineraryIds(itiRes.data.map((i) => String(i.trailId)));
        }
      } catch (err) {
        if (mounted) {
          dispatch(createMessage({ text: err, type: 'red' }));
          setError('資料載入失敗');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [user, dispatch]);

  const handleRequestRemove = (id) => setDeleteConfirm({ open: true, id });

  const handleConfirmRemove = async () => {
    const favId = deleteConfirm.id;
    const token = Cookies.get('accessToken');
    const prev = favorites;
    setFavorites((p) => p.filter((x) => x.id !== favId));
    setDeleteConfirm({ open: false, id: null });

    try {
      await TrailsApi.delete(`/favorites/${favId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      setFavorites(prev);
      dispatch(createMessage({ text: e, type: 'red' }));
    }
  };

  const handleAddItinerary = async (item) => {
    if (!user?.id) return;
    try {
      const token = Cookies.get('accessToken');
      const trailId = String(item.trailId ?? item.id);
      const checkRes = await TrailsApi.get(`/itinerary?userId=${user.id}&trailId=${trailId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let itineraryToOpen;
      if (checkRes.data && checkRes.data.length > 0) {
        itineraryToOpen = checkRes.data[0];
        setIsEditMode(true);
      } else {
        const payload = {
          userId: user.id,
          trailId,
          trailName: item.name,
          trailImage: item.image,
          date: new Date().toISOString(),
          note: '',
        };
        const postRes = await TrailsApi.post('/itinerary', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        itineraryToOpen = postRes.data || payload;
        setIsEditMode(false);
        setItineraryIds((prev) => [...prev, trailId]);
      }
      setItineraryData(itineraryToOpen);
      setItineraryNote(itineraryToOpen.note || '');
      setItineraryModalOpen(true);
    } catch (e) {
      dispatch(createMessage({ text: e, type: 'red' }));
    }
  };

  const handleSaveItineraryNote = async () => {
    if (!itineraryData?.id) return;
    try {
      setSavingNote(true);
      const token = Cookies.get('accessToken');
      await TrailsApi.patch(
        `/itinerary/${itineraryData.id}`,
        { note: itineraryNote },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch(createMessage({ text: isEditMode ? '更新成功' : '儲存成功', type: 'success' }));
      setItineraryModalOpen(false);
    } catch (e) {
      dispatch(createMessage({ text: e, type: 'red' }));
    } finally {
      setSavingNote(false);
    }
  };

  return (
    <div className="d-grid gap-3" style={{ maxWidth: 520, minHeight: 450 }}>
      {loading && <p className="text-muted mb-0">載入收藏中...</p>}
      {error && <div className="alert alert-danger py-2 px-3 rounded-16 small mb-0">{error}</div>}
      {!loading && favorites.length === 0 && !error && (
        <div className="text-center py-5 text-black bg-primary-100 rounded-24 opacity-75">
          目前沒有收藏步道
        </div>
      )}

      <MobileFavoriteDropdown
        favorites={favorites}
        itineraryIds={itineraryIds}
        onRemove={handleRequestRemove}
        onAddItinerary={handleAddItinerary}
      />

      <ConfirmModal
        open={deleteConfirm.open}
        title="確認刪除"
        content="確定要將此步道從收藏中移除嗎？"
        onConfirm={handleConfirmRemove}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
      />
      {itineraryData && (
        <ItineraryModal
          open={itineraryModalOpen}
          data={itineraryData}
          note={itineraryNote}
          isEdit={isEditMode}
          onChangeNote={setItineraryNote}
          onClose={() => setItineraryModalOpen(false)}
          onSaveNote={handleSaveItineraryNote}
          saving={savingNote}
        />
      )}
    </div>
  );
};

// 統計分析頁面元件
const REGION_KEYS = ['北部', '中部', '南部', '東部'];

const countByRegion = (list, getRegion) => {
  const acc = { 北部: 0, 中部: 0, 南部: 0, 東部: 0 };
  (Array.isArray(list) ? list : []).forEach((item) => {
    const region = getRegion(item);
    if (REGION_KEYS.includes(region)) acc[region] += 1;
  });
  return acc;
};

const calcPercent = (num, den) => {
  if (!den) return 0;
  return Math.round((num / den) * 1000) / 10;
};

export const MemberAnalytics = ({ user }) => {
  const [trails, setTrails] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      if (!user || !user.id) return;
      try {
        setLoading(true);
        setErr('');
        const token = Cookies.get('accessToken');
        const [trailsRes, favRes] = await Promise.all([
          TrailsApi.get('/trails', { params: { _limit: 9999 } }),
          TrailsApi.get('/favorites', {
            params: { userId: user.id, _limit: 9999 },
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (!mounted) return;
        setTrails(Array.isArray(trailsRes.data) ? trailsRes.data : []);
        setFavorites(Array.isArray(favRes.data) ? favRes.data : []);
      } catch (err) {
        if (!mounted) return;
        dispatch(
          createMessage({ text: err.response?.data?.message || '統計資料載入失敗', type: 'red' }),
        );
        setErr('統計資料載入失敗');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAll();
    return () => {
      mounted = false;
    };
  }, [dispatch, user]);

  const REGION_COLORS = useMemo(
    () => ({ 北部: '#4F6947', 中部: '#8AA96B', 南部: '#F2C14E', 東部: '#4D9DE0' }),
    [],
  );

  const favRateByRegion = useMemo(() => {
    const trailCounts = countByRegion(trails, (t) => t.trail_region || t.region);
    const favCounts = countByRegion(favorites, (f) => f.trail_region || f.region);
    return REGION_KEYS.map((region) => ({
      region,
      favCount: favCounts[region] || 0,
      trailCount: trailCounts[region] || 0,
      rate: calcPercent(favCounts[region] || 0, trailCounts[region] || 0),
    }));
  }, [trails, favorites]);

  const doughnutDataTrails = {
    labels: REGION_KEYS,
    datasets: [
      {
        data: REGION_KEYS.map((r) => favRateByRegion.find((x) => x.region === r)?.favCount || 0),
        backgroundColor: REGION_KEYS.map((r) => REGION_COLORS[r]),
      },
    ],
  };

  const barDataFavRate = {
    labels: REGION_KEYS,
    datasets: [
      {
        label: '收藏率 (%)',
        data: REGION_KEYS.map((r) => favRateByRegion.find((x) => x.region === r)?.rate || 0),
        backgroundColor: REGION_KEYS.map((r) => REGION_COLORS[r]),
      },
    ],
  };
  const barOptionsFavRate = {};

  return (
    <div className="d-grid gap-4">
      {loading && <TrailLoading />}
      {err && <p className="text-danger mb-0">{err}</p>}

      {!loading && !err && (
        <>
          <div className="bg-primary-50 rounded-24 p-4 p-md-8 overflow-hidden">
            <h3 className="mb-3">各區收藏分佈</h3>
            <div style={{ maxWidth: 520, margin: '0 auto' }}>
              <Doughnut data={doughnutDataTrails} />
            </div>
            <div className="mt-4">
              <div className="small text-muted mb-2">各區收藏佔比</div>
              <ul className="list-unstyled d-grid gap-2 mb-0">
                {favRateByRegion.map((x) => (
                  <li
                    key={x.region}
                    className="d-flex justify-content-between align-items-center rounded-12 px-3 py-2"
                    style={{
                      backgroundColor: `${REGION_COLORS[x.region]}22`,
                      border: `1px solid ${REGION_COLORS[x.region]}55`,
                    }}
                  >
                    <span className="d-flex align-items-center gap-2">
                      <span
                        aria-hidden="true"
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 999,
                          backgroundColor: REGION_COLORS[x.region],
                          display: 'inline-block',
                        }}
                      />
                      <span className="fw-semibold">{x.region}</span>
                    </span>
                    <span className="text-muted" style={{ width: 120 }}>
                      {x.favCount} / {x.trailCount}（{x.rate}%）
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-primary-50 rounded-24 p-4 p-md-8 overflow-hidden">
            <div className="d-flex align-items-end justify-content-between gap-3 mb-3">
              <div>
                <h3 className="mb-1">各區收藏佔比</h3>
                <div className="text-muted small">總步道收藏數：{favorites.length}</div>
              </div>
            </div>
            <Bar data={barDataFavRate} options={barOptionsFavRate} />
          </div>
        </>
      )}
    </div>
  );
};

// 推薦頁面元件
const pickRandomUnique = (arr, count) => {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  const pool = [...arr];
  const result = [];
  const n = Math.min(count, pool.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return result;
};

const MemberRecommend = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    const fetchRecommend = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await TrailsApi.get('/trails', { params: { _limit: 200 } });
        const list = Array.isArray(res.data) ? res.data : [];
        const picked = pickRandomUnique(list, 6);
        if (isMounted) setItems(picked);
      } catch (err) {
        if (isMounted) {
          dispatch(
            createMessage({ text: err.response?.data?.message || '推薦資料載入失敗', type: 'red' }),
          );
          setError('推薦步道載入失敗');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchRecommend();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className="pb-6">
      {loading && <TrailLoading />}
      {(error || items.length === 0) && !loading ? (
        <div
          className="card border-0 rounded-24 shadow-sm overflow-hidden"
          style={{ maxWidth: 420 }}
        >
          <OptimizedImg
            src="https://images.unsplash.com/photo-1502439502085-ebf78244370a"
            alt="recommend placeholder"
            q={75}
            w={720}
            style={{ height: 160, width: '100%', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title mb-2">猜你喜歡</h5>
            <p className="text-muted small mb-0">
              {error ? error : '目前沒有推薦步道，稍後再試。'}
            </p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {items.map((trail) => (
            <div className="col-sm-6 col-xl-4" key={trail.id}>
              <div className="card border-0 rounded-24 shadow-sm h-100 overflow-hidden">
                <OptimizedImg
                  src={trail.trail_image}
                  className="card-img-top rounded-top-24"
                  alt={trail.trail_name}
                  q={75}
                  w={520}
                  style={{ height: 180, objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-2">{trail.trail_name}</h5>
                  <p className="text-muted small mb-1">
                    {trail.trail_address || trail.trail_region || '—'}
                  </p>
                  <p className="text-muted small mb-3">{trail.trail_hour || ''}</p>
                  <Link
                    to={`/detail/${trail.id}`}
                    target="_blank"
                    className="btn btn-primary mt-auto"
                  >
                    查看步道
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 主要 Page Component
const Member = () => {
  const [activeTab, setActiveTab] = useState('member');
  const [currentUser, setCurrentUser] = useState(() => {
    const userStr = Cookies.get('user');
    return userStr ? JSON.parse(userStr) : null;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = '會員中心 | YeStep';
    const token = Cookies.get('accessToken');
    if (!currentUser || !token) {
      dispatch(createMessage({ text: '請先登入會員', type: 'red' }));
      navigate('/login', { replace: true });
    }
  }, [currentUser, dispatch, navigate]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    scrollToTopMinus('member-main', 120);
  };

  const currentTab = MEMBER_TABS.find((tab) => tab.key === activeTab) || MEMBER_TABS[0];

  if (!currentUser) return null;

  return (
    <div className="memberPage">
      <Nav />
      <OptimizedImg
        src="https://images.unsplash.com/photo-1502439502085-ebf78244370a"
        alt="會員中心背景"
        q={70}
        w={1600}
        className="bgImg w-100"
      />
      <div className="memberContainer">
        <MemberTabs activeTab={activeTab} onChange={handleTabChange} />
        <main id="member-main" className="memberMain">
          <h2 className="fs-5 fs-md-2 pt-8 pb-4 pt-md-0 pb-md-14">{currentTab.label}</h2>
          {activeTab === 'member' && <MemberProfile user={currentUser} setUser={setCurrentUser} />}
          {activeTab === 'favorite' && <MemberFavorite user={currentUser} />}
          {activeTab === 'analytics' && <MemberAnalytics user={currentUser} />}
          {activeTab === 'recommend' && <MemberRecommend />}
        </main>
      </div>
    </div>
  );
};

export default Member;
