// containers/ProtectedRoute.jsx
// 로그인 보호 라우트
// - 로그인 안 된 상태로 접근 시 /login으로 리다이렉트

import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default connect(({ auth }) => ({
  isLoggedIn: auth.isLoggedIn,
}))(ProtectedRoute);
