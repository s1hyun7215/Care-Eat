// pages/Result/Result.jsx
// 결과 페이지 - 프레젠테이셔널 컴포넌트 (UI만)
//
// Props:
// - query: 쿼리스트링 q 값 (사용자 증상)
// - nutrients: Redux recommend.nutrients
// - status: Redux recommend.status

import { Outlet, NavLink } from "react-router-dom";
import styles from "./Result.module.scss";

function Result({ query, nutrients, status }) {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <p className={styles.queryLabel}>입력한 증상</p>
        <h1 className={styles.query}>"{query || "증상이 입력되지 않았습니다"}"</h1>
      </section>

      <nav className={styles.tabs}>
        <NavLink
          to="supplements"
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.tabActive : ""}`
          }
        >
          영양제 추천
        </NavLink>
        <NavLink
          to="foods"
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.tabActive : ""}`
          }
        >
          식재료 추천
        </NavLink>
      </nav>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Result;
