//React套件
import { useId, memo } from 'react';

const FILTER_OPTIONS = {
  trail_difficulty: ['休閒級', '入門級', '健行級', '挑戰級', '專業級'],
  trail_hour: ['3小時內', '3-6小時', '6-12小時', '12小時-兩天', '兩天以上'],
  trail_landscape: ['瀑布', '日出', '雲海', '晚霞', '觀星', '神木', '賞花', '賞鳥'],
};

const SearchFilterDropdown = ({ label, selectedValues, apiKey, onCheckboxChange }) => {
  const uniquePrefix = useId();

  // 根據 apiKey 取得對應的選項，若找不到則回傳空陣列
  const options = FILTER_OPTIONS[apiKey] || [];

  // 判斷是否為景觀，若是則開啟網格排版 (isGrid)
  const isGrid = apiKey === 'trail_landscape';
  const selectedCount = selectedValues.length;

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
      >
        <span className="ms-1">{selectedCount > 0 ? `${label} (${selectedCount})` : label}</span>
      </button>
      <ul className="dropdown-menu py-2 shadow mt-2" style={isGrid ? { minWidth: '240px' } : {}}>
        <div className={isGrid ? 'row row-cols-2' : ''}>
          {options.map((option, index) => {
            const inputId = `${uniquePrefix}-${apiKey}-${index}`;
            return (
              <div className={isGrid ? 'col py-2' : 'py-2'} key={option}>
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={inputId}
                    checked={selectedValues.includes(option)}
                    onChange={() => onCheckboxChange(apiKey, option, selectedValues)}
                  />
                  <label className="form-check-label text-black-700 w-100 ms-2" htmlFor={inputId}>
                    {option}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default memo(SearchFilterDropdown);
