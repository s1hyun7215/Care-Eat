// components/layout/Layout/Layout.jsx
// 전체 레이아웃 공통 컴포넌트
// - 상단 NavbarContainer
// - 하위 라우트는 Outlet 위치에 렌더링

import { Outlet } from "react-router-dom";
import NavbarContainer from "../../../containers/NavbarContainer";
import styles from "./Layout.module.scss";

function Layout() {
  return (
    <div className={styles.layout}>
      <NavbarContainer />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
