// pages/Favorites/Favorites.jsx
// 즐겨찾기 페이지 - 프레젠테이셔널
//
// Props:
// - favorites: 즐겨찾기 목록 배열
// - onRemove(id): 삭제 핸들러
// - onUpdateMemo(id, memo): 메모 수정 핸들러

import styles from "./Favorites.module.scss";

function Favorites({ favorites, onRemove, onUpdateMemo }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>즐겨찾기</h1>
        <p className={styles.subtitle}>저장한 영양제, 식재료, 레시피를 모아봐요</p>
      </header>

      <div className={styles.placeholder}>
        <p>즐겨찾기 페이지는 담당자가 구현합니다.</p>
        <p className={styles.muted}>
          필터 탭, 저장 목록, 메모 편집, 삭제 기능이 들어갈 예정.
        </p>
      </div>
    </div>
  );
}

export default Favorites;
