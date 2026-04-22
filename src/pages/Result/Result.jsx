import { Outlet, NavLink } from 'react-router-dom';
import Skeleton from '../../components/common/Skeleton/Skeleton';
import styles from './Result.module.scss';

function Result({ query, nutrients, status }) {
  const isLoading = status === 'loading';

  return (
    <div className={styles.container}>
      {/* 증상 요약 카드 */}
      <section className={styles.header}>
        <p className={styles.queryLabel}>입력한 증상</p>
        {isLoading ? (
          <Skeleton width="60%" height="32px" />
        ) : (
          <h1 className={styles.query}>
            "{query || '증상이 입력되지 않았습니다'}"
          </h1>
        )}

        {/* 영양소 pill */}
        {isLoading ? (
          <div className={styles.nutrients}>
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                width="80px"
                height="28px"
                borderRadius="9999px"
              />
            ))}
          </div>
        ) : (
          nutrients.length > 0 && (
            <div className={styles.nutrients}>
              {nutrients.map((n) => (
                <span key={n.name} className={styles.nutrientPill}>
                  {n.name}
                </span>
              ))}
            </div>
          )
        )}
      </section>

      {/* 탭 네비 */}
      <nav className={styles.tabs}>
        <NavLink
          to="supplements"
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.tabActive : ''}`
          }
        >
          영양제 추천
        </NavLink>
        <NavLink
          to="foods"
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.tabActive : ''}`
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
