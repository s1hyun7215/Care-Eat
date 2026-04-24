import React, { useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { List, AutoSizer } from 'react-virtualized';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { FiArrowLeft, FiShoppingCart, FiX, FiPlus } from 'react-icons/fi';
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

const RecipeDetailModal = ({ recipe, onClose }) => {
  const ingredients = parseIngredients(recipe.RCP_PARTS_DTLS, recipe.RCP_NM);
  const steps = parseManualSteps(recipe);
  const [tab, setTab] = useState('ingredients');

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{recipe.RCP_NM}</h3>
          <button className={styles.modalClose} onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <div className={styles.tabRow}>
          <button
            className={`${styles.tabBtn} ${tab === 'ingredients' ? styles.tabBtnActive : ''}`}
            onClick={() => setTab('ingredients')}
          >
            재료
          </button>
          <button
            className={`${styles.tabBtn} ${tab === 'steps' ? styles.tabBtnActive : ''}`}
            onClick={() => setTab('steps')}
          >
            조리방법
          </button>
        </div>

        <div className={styles.modalBody}>
          {tab === 'ingredients' && (
            <>
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
                        href={getNaverShoppingSearchUrl(
                          extractIngredientName(ing),
                        )}
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
            </>
          )}

          {tab === 'steps' && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

const RecipeCard = ({ recipe, onCardClick, isSaved, onToggleFavorite }) => {
  return (
    <div className={styles.card} onClick={() => onCardClick(recipe)}>
      <div className={styles.cardHeader} data-header>
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
          className={styles.toggleBtn}
          aria-label="즐겨찾기"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe);
          }}
        >
          {isSaved ? '❤️' : '🤍'}
        </button>
      </div>
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
  favorites,
  onAddFavorite,
  onRemoveFavorite,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const isSaved = useCallback(
    (recipe) => favorites.some((fav) => fav.name === recipe.RCP_NM),
    [favorites],
  );

  const onToggleFavorite = useCallback(
    (recipe) => {
      if (isSaved(recipe)) {
        const found = favorites.find((fav) => fav.name === recipe.RCP_NM);
        if (found) onRemoveFavorite(found.id);
      } else {
        onAddFavorite(recipe);
      }
    },
    [isSaved, favorites, onAddFavorite, onRemoveFavorite],
  );

  const handleCardClick = useCallback((recipe) => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight =
      window.innerWidth - document.documentElement.clientWidth + 'px';
    setSelectedRecipe(recipe);
  }, []);

  const handleCloseModal = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    setSelectedRecipe(null);
  }, []);

  const getCols = () => {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  };

  const rowCount = Math.ceil(recipes.length / getCols());
  const observerRef = useRef(null);

  const lastRowRef = useCallback(
    (el) => {
      if (loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          onLoadMore();
        }
      });
      if (el) observerRef.current.observe(el);
    },
    [loadingMore, hasMore, onLoadMore],
  );

  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const cols = getCols();
      const startIdx = index * cols;
      const rowItems = recipes.slice(startIdx, startIdx + cols);
      const isLastRow = index === rowCount - 1;

      return (
        <div
          key={key}
          ref={isLastRow ? lastRowRef : null}
          style={{
            ...style,
            display: 'flex',
            gap: 16,
            paddingBottom: 16,
            alignItems: 'stretch',
          }}
        >
          {rowItems.map((recipe, i) => (
            <div
              key={startIdx + i}
              style={{ flex: 1, minWidth: 0, display: 'flex' }}
            >
              <RecipeCard
                recipe={recipe}
                onCardClick={handleCardClick}
                isSaved={isSaved(recipe)}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
          {rowItems.length < cols &&
            Array.from({ length: cols - rowItems.length }).map((_, i) => (
              <div key={`empty-${i}`} style={{ flex: 1 }} />
            ))}
        </div>
      );
    },
    [recipes, handleCardClick, rowCount, lastRowRef, isSaved, onToggleFavorite],
  );

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
        <div className={styles.virtualWrap}>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                width={width}
                height={rowCount * 280}
                rowCount={rowCount}
                rowHeight={250}
                overscanRowCount={rowCount}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        </div>
      )}

      {loadingMore && (
        <div className={styles.center} style={{ padding: '20px 0' }}>
          <LoadingSpinner size="sm" message="더 불러오는 중..." />
        </div>
      )}
      {!hasMore && recipes.length > 0 && (
        <p className={styles.noMore}>모든 레시피를 불러왔어요 😊</p>
      )}

      {selectedRecipe && (
        <RecipeDetailModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Recipe;
