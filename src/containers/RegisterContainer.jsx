// containers/RegisterContainer.jsx
// 회원가입 페이지 컨테이너

import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../modules/auth";
import { loadUsersFromStorage } from "../modules/auth";
import Register from "../pages/Register/Register";

const RegisterContainer = ({ register }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChangeUsername = (value) => {
    setUsername(value);
    if (errors.username) setErrors((prev) => ({ ...prev, username: "" }));
  };

  const onChangePassword = (value) => {
    setPassword(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
  };

  const onChangePasswordConfirm = (value) => {
    setPasswordConfirm(value);
    if (errors.passwordConfirm)
      setErrors((prev) => ({ ...prev, passwordConfirm: "" }));
  };

  const onSubmit = () => {
    const trimmedId = username.trim();
    const newErrors = {};

    // 유효성 검사
    if (!trimmedId) {
      newErrors.username = "아이디를 입력해주세요.";
    } else if (trimmedId.length < 2) {
      newErrors.username = "아이디는 2자 이상이어야 해요.";
    } else if (!/^[a-zA-Z0-9가-힣_]+$/.test(trimmedId)) {
      newErrors.username = "아이디는 영문, 숫자, 한글, 밑줄(_)만 사용 가능해요.";
    }

    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (password.length < 4) {
      newErrors.password = "비밀번호는 4자 이상이어야 해요.";
    }

    if (!passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호 확인을 입력해주세요.";
    } else if (password !== passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않아요.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 중복 아이디 확인
    const users = loadUsersFromStorage();
    const isDuplicate = users.some((u) => u.username === trimmedId);
    if (isDuplicate) {
      setErrors({ username: "이미 사용 중인 아이디예요." });
      return;
    }

    // 회원가입 디스패치 → localStorage에 저장됨
    register(trimmedId, password);

    // 로그인 페이지로 이동 (성공 메시지 state 전달)
    navigate("/login", { state: { registered: true, username: trimmedId } });
  };

  return (
    <Register
      username={username}
      password={password}
      passwordConfirm={passwordConfirm}
      onChangeUsername={onChangeUsername}
      onChangePassword={onChangePassword}
      onChangePasswordConfirm={onChangePasswordConfirm}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};

export default connect(null, { register })(RegisterContainer);
