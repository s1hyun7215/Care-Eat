import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import styles from './Home.module.scss';
import { useDebounce } from '../../hooks/useDebounce';

const QUICK_CHIPS = [
  '눈이 침침해요',
  '피로가 심해요',
  '잠을 못 자요',
  '관절이 아파요',
  '피부가 건조해요',
  '소화가 안 돼요',
];

const MALL_OPTIONS = [
  { value: 'both', label: '전체' },
  { value: 'naver', label: '네이버쇼핑' },
  { value: 'coupang', label: '쿠팡' },
];

const Home = ({
  symptom,
  onChangeSymptom,
  onSubmit,
  loading,
  preferredMall,
  onChangeMall,
  recentHistory,
  onSelectHistory,
}) => {
  const navigate = useNavigate();
  const debouncedSymptom = useDebounce(symptom, 800);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h1 className={styles.title}>오늘 몸 상태가 어떠세요?</h1>
          <p className={styles.subtitle}>
            증상을 입력하면 AI가 필요한 영양소와 추천 영양제·식재료를 알려드려요
          </p>
        </div>

        {/* 입력 영역 */}
        <div className={styles.inputBox}>
          <textarea
            className={styles.textarea}
            placeholder="예: 요즘 눈이 자주 피로하고 침침해요. 어깨도 자주 결려요."
            value={symptom}
            onChange={(e) => onChangeSymptom(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            disabled={loading}
          />

          {/* 빠른 선택 칩 */}
          <div className={styles.chips}>
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip}
                className={`${styles.chip} ${symptom === chip ? styles.chipActive : ''}`}
                onClick={() => onChangeSymptom(chip)}
                disabled={loading}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* 쇼핑몰 토글 */}
          <div className={styles.mallRow}>
            <span className={styles.mallLabel}>쇼핑몰</span>
            <div className={styles.mallOptions}>
              {MALL_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`${styles.mallBtn} ${preferredMall === opt.value ? styles.mallBtnActive : ''}`}
                  onClick={() => onChangeMall(opt.value)}
                  disabled={loading}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 분석 버튼 */}
          <button
            className={styles.submitBtn}
            onClick={onSubmit}
            disabled={loading || !debouncedSymptom.trim()}
          >
            {loading ? <LoadingSpinner size="small" /> : 'AI 영양 분석하기'}
          </button>
        </div>

        {/* 최근 기록 */}
        {recentHistory.length > 0 && (
          <div className={styles.recentSection}>
            <h2 className={styles.recentTitle}>최근 검색 기록</h2>
            <ul className={styles.recentList}>
              {recentHistory.map((item) => (
                <li
                  key={item.id}
                  className={styles.recentItem}
                  onClick={() => onSelectHistory(item)}
                >
                  <span className={styles.recentQuery}>{item.query}</span>
                  <div className={styles.recentNutrients}>
                    {item.nutrients.map((n) => (
                      <span key={n} className={styles.nutrientChip}>
                        {n}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
