// components/layout/Navbar/Navbar.jsx
// 상단 네비게이션 - 프레젠테이셔널 컴포넌트
//
// Props:
// - username: 로그인한 사용자 아이디 (없으면 빈 문자열)
// - isLoggedIn: 로그인 여부
// - onLogout(): 로그아웃 버튼 클릭 핸들러

import { NavLink, Link } from "react-router-dom";
import { FiHome, FiHeart, FiClock, FiLogOut, FiUser } from "react-icons/fi";
import { GiHealthNormal } from "react-icons/gi";
import styles from "./Navbar.module.scss";

function Navbar({ username, isLoggedIn, onLogout }) {
  const menuItems = [
    { path: "/", label: "홈", icon: <FiHome size={18} />, end: true },
    { path: "/favorites", label: "즐겨찾기", icon: <FiHeart size={18} /> },
    { path: "/history", label: "검색기록", icon: <FiClock size={18} /> },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>
            <GiHealthNormal size={20} />
          </span>
          <span className={styles.logoText}>CareEat</span>
        </Link>

        {isLoggedIn && (
          <nav className={styles.menu}>
            {menuItems.map(({ path, label, icon, end }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.linkActive : ""}`
                }
              >
                {icon}
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        )}

        {isLoggedIn && (
          <div className={styles.user}>
            <span className={styles.userBadge}>
              <FiUser size={14} />
              {username}
            </span>
            <button
              type="button"
              className={styles.logout}
              onClick={onLogout}
              aria-label="로그아웃"
            >
              <FiLogOut size={16} />
              <span>로그아웃</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
