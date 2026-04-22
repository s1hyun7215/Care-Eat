// containers/NavbarContainer.jsx
// Navbar 컨테이너 - 로그인 상태 연결

import React from "react";
import { connect } from "react-redux";
import Navbar from "../components/layout/Navbar/Navbar";
import { logout } from "../modules/auth";

const NavbarContainer = ({ username, isLoggedIn, logout }) => {
  const onLogout = () => {
    if (window.confirm("로그아웃 하시겠어요?")) {
      logout();
    }
  };

  return (
    <Navbar
      username={username}
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
    />
  );
};

export default connect(
  ({ auth }) => ({
    username: auth.username,
    isLoggedIn: auth.isLoggedIn,
  }),
  { logout },
)(NavbarContainer);
