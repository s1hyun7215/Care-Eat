import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { FiArrowLeft, FiPlus, FiShoppingCart, FiX } from 'react-icons/fi';
import {
  parseIngredients,
  extractIngredientName,
  parseManualSteps,
} from '../../services/foodApi';
import {
  getCoupangSearchUrl,
  getNaverShoppingSearchUrl,
} from '../../services/coupangLink';
import naverLogo from '../../assets/naver.png';
import coupangLogo from '../../assets/coupang.png';
import styles from './Recipe.module.scss';

const RecipeModal = ({ recipe, onClose }) => {
  const steps = parseManualSteps(recipe);
  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{recipe.RCP_NM} 조리방법</h3>
          <button className={styles.modalClose} onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>
        <div className={styles.modalBody}>
          {steps.length === 0 ? (
            <p className={styles.noSteps}>조리방법 정보가 없어요.</p>
          ) : (
            <ol className={styles.stepList}>
              {steps.map((step) => (
                <li key={step.step} className={styles.stepItem}>
                  <span className={styles.stepNum}>{step.step}</span>
                  <div className={styles.stepContent}>
                    <p className={styles.stepDesc}>
                      {step.desc.replace(/^\d+\.\s*/, '')}
                    </p>
                    {step.image && (
                      <img
                        src={step.image}
                        alt={`조리 ${step.step}단계`}
                        className={styles.stepImage}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

const RecipeCard = ({ recipe, isOpen, onToggle, minHeight }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);
  const ingredients = parseIngredients(recipe.RCP_PARTS_DTLS, recipe.RCP_NM);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setShowAccordion(true);
    } else if (showAccordion) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShowAccordion(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const openModal = (e) => {
    e.stopPropagation();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight =
      window.innerWidth - document.documentElement.clientWidth + 'px';
    setModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    setModalOpen(false);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.cardHeader}
        onClick={onToggle}
        data-header
        style={!isOpen && minHeight ? { minHeight } : {}}
      >
        {recipe.ATT_FILE_NO_MAIN && (
          <img
            src={recipe.ATT_FILE_NO_MAIN}
            alt={recipe.RCP_NM}
            className={styles.cardImage}
          />
        )}
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{recipe.RCP_NM}</h3>
          <div className={styles.cardMeta}>
            {recipe.INFO_ENG && (
              <span className={styles.calorie}>{recipe.INFO_ENG} kcal</span>
            )}
            {recipe.HASH_TAG && (
              <span className={styles.hashTag}>
                #{recipe.HASH_TAG.replace(/\s/g, ' #')}
              </span>
            )}
          </div>
          <div className={styles.nutriRow}>
            {recipe.INFO_CAR && (
              <span className={`${styles.nutriChip} ${styles.nutriChipCarb}`}>
                탄수화물 {recipe.INFO_CAR}g
              </span>
            )}
            {recipe.INFO_PRO && (
              <span
                className={`${styles.nutriChip} ${styles.nutriChipProtein}`}
              >
                단백질 {recipe.INFO_PRO}g
              </span>
            )}
            {recipe.INFO_FAT && (
              <span className={`${styles.nutriChip} ${styles.nutriChipFat}`}>
                지방 {recipe.INFO_FAT}g
              </span>
            )}
          </div>
        </div>
        <button
          className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnOpen : ''}`}
          aria-label="재료 보기"
        >
          <FiPlus size={20} />
        </button>
      </div>

      {showAccordion && (
        <div className={isClosing ? styles.accordionClosing : styles.accordion}>
          <div className={styles.accordionHeader}>
            <p className={styles.accordionLabel}>재료</p>
            <p className={styles.accordionLabel}>구매하기</p>
          </div>
          <ul className={styles.ingredientList}>
            {ingredients.map((ing, idx) => (
              <li key={idx} className={styles.ingredientItem}>
                <span className={styles.ingName}>{ing}</span>
                <div className={styles.ingLinks}>
                  <a
                    href={getNaverShoppingSearchUrl(extractIngredientName(ing))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkBtn}
                  >
                    <img
                      src={naverLogo}
                      alt="네이버"
                      className={styles.linkLogo}
                    />
                  </a>
                  <a
                    href={getCoupangSearchUrl(extractIngredientName(ing))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.linkBtn} ${styles.linkBtnCoupang}`}
                  >
                    <img
                      src={coupangLogo}
                      alt="쿠팡"
                      className={styles.linkLogo}
                    />
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <button className={styles.viewStepsBtn} onClick={openModal}>
            조리방법 보기
          </button>
        </div>
      )}

      {modalOpen && <RecipeModal recipe={recipe} onClose={closeModal} />}
    </div>
  );
};

const Recipe = ({
  foodId,
  recipes,
  loading,
  loadingMore,
  hasMore,
  error,
  onGoBack,
  onLoadMore,
}) => {
  const [openId, setOpenId] = useState(null);
  const [rowMinHeights, setRowMinHeights] = useState({});
  const cardRefs = useRef([]);
  const observerRef = useRef(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const lastCardRef = useCallback(
    (el) => {
      if (loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) onLoadMore();
      });
      if (el) observerRef.current.observe(el);
    },
    [loadingMore, hasMore, onLoadMore],
  );

  const calcHeights = useCallback(() => {
    if (cardRefs.current.length === 0) return;
    const cols = 3;
    const heights = {};
    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const header = el.querySelector('[data-header]');
      if (!header) return;
      const row = Math.floor(idx / cols);
      const prevMin = header.style.minHeight;
      header.style.minHeight = '';
      const h = header.getBoundingClientRect().height;
      header.style.minHeight = prevMin;
      if (!heights[row] || h > heights[row]) heights[row] = h;
    });
    setRowMinHeights(heights);
  }, []);

  useEffect(() => {
    if (!loading && recipes.length > 0) setTimeout(calcHeights, 100);
  }, [loading, recipes, calcHeights]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onGoBack}>
          <FiArrowLeft size={20} /> 뒤로가기
        </button>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>
            <span className={styles.foodName}>{foodId}</span> 레시피
          </h1>
          {recipes.length > 0 && (
            <span className={styles.countBadge}>{recipes.length}개</span>
          )}
        </div>
      </div>

      {loading && (
        <div className={styles.center}>
          <LoadingSpinner size="md" message="레시피를 불러오는 중..." />
        </div>
      )}
      {error && !loading && (
        <div className={styles.center}>
          <EmptyState title="레시피를 불러올 수 없어요" subtitle={error} />
        </div>
      )}
      {!loading && !error && recipes.length === 0 && (
        <div className={styles.center}>
          <EmptyState
            title={`'${foodId}' 레시피가 없어요`}
            subtitle="다른 재료로 검색해보세요"
            icon={<FiShoppingCart size={48} />}
          />
        </div>
      )}
      {!loading && !error && recipes.length > 0 && (
        <>
          <div className={styles.grid}>
            {recipes.map((recipe, idx) => {
              const id = idx;
              const row = Math.floor(idx / 3);
              const minHeight = rowMinHeights[row]
                ? `${rowMinHeights[row]}px`
                : undefined;
              const isLast = idx === recipes.length - 1;
              return (
                <div
                  key={id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                    if (isLast) lastCardRef(el);
                  }}
                >
                  <RecipeCard
                    recipe={recipe}
                    isOpen={openId === id}
                    onToggle={() => handleToggle(id)}
                    minHeight={minHeight}
                  />
                </div>
              );
            })}
          </div>
          {loadingMore && (
            <div className={styles.center} style={{ padding: '20px 0' }}>
              <LoadingSpinner size="sm" message="더 불러오는 중..." />
            </div>
          )}
          {!hasMore && (
            <p className={styles.noMore}>모든 레시피를 불러왔어요 😊</p>
          )}
        </>
      )}
    </div>
  );
};

export default Recipe;
