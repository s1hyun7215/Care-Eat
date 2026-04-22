// pages/History/History.jsx
// 검색 기록 페이지 - 프레젠테이셔널
//
// Props:
// - history: 검색 기록 배열
// - onRemove(id): 개별 삭제 핸들러
// - onClearAll(): 전체 삭제 핸들러
// - onSelectItem(item): 항목 클릭 핸들러 (해당 결과 페이지로 재진입)

import styles from "./History.module.scss";

function History({ history, onRemove, onClearAll, onSelectItem }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>검색 기록</h1>
        <p className={styles.subtitle}>내가 물어본 증상과 결과를 다시 확인해요</p>
      </header>

      <div className={styles.placeholder}>
        <p>검색기록 페이지는 담당자가 구현합니다.</p>
        <p className={styles.muted}>
          타임라인 목록, 재진입 기능이 들어갈 예정. (메모/별점은 즐겨찾기에서 관리)
        </p>
      </div>
    </div>
  );
}

export default History;
