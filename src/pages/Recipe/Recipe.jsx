// pages/Recipe/Recipe.jsx
// 레시피 페이지 - 프레젠테이셔널
//
// Props:
// - foodId: URL 파라미터 (식재료명)
// - onAddFavorite(item): 레시피 즐겨찾기 추가 핸들러
// - favorites: 현재 즐겨찾기 목록

import styles from "./Recipe.module.scss";

function Recipe({ foodId, onAddFavorite, favorites }) {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <p className={styles.label}>✦ 레시피 추천</p>
        <h1 className={styles.title}>
          <span className={styles.highlight}>{foodId || "식재료"}</span>(으)로 만들 수 있는 요리
        </h1>
      </section>

      <div className={styles.placeholder}>
        <p>레시피 페이지는 담당자가 구현합니다.</p>
        <p className={styles.muted}>
          식약처 API 연동, 레시피 카드, 재료별 쇼핑 링크, react-virtualized 적용 예정.
        </p>
      </div>
    </div>
  );
}

export default Recipe;
