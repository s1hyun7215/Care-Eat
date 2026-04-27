// containers/LoginContainer.jsx
// 로그인 페이지 컨테이너

import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login, loadUsersFromStorage } from "../modules/auth";
import Login from "../pages/Login/Login";

const LoginContainer = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 회원가입 완료 후 넘어온 경우 성공 메시지 표시
  const location = useLocation();
  const registered = location.state?.registered || false;
  const registeredUsername = location.state?.username || "";

  const onChangeUsername = (value) => {
    setUsername(value);
    if (errors.username) setErrors((prev) => ({ ...prev, username: "" }));
  };

  const onChangePassword = (value) => {
    setPassword(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
  };

  const onSubmit = () => {
    const trimmedId = username.trim();
    const newErrors = {};

    // 유효성 검사
    if (!trimmedId) {
      newErrors.username = "아이디를 입력해주세요.";
    }
    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 유저 목록에서 일치하는 계정 찾기
    const users = loadUsersFromStorage();
    const matched = users.find(
      (u) => u.username === trimmedId && u.password === password
    );

    if (!matched) {
      setErrors({ form: "아이디 또는 비밀번호가 올바르지 않아요." });
      return;
    }

    login(trimmedId);
    navigate("/");
  };

  return (
    <Login
      username={username}
      password={password}
      onChangeUsername={onChangeUsername}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
      errors={errors}
      registered={registered}
      registeredUsername={registeredUsername}
    />
  );
};

export default connect(null, { login })(LoginContainer);
