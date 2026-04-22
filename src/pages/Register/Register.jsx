// pages/Register/Register.jsx
// 회원가입 페이지 - 프레젠테이셔널 컴포넌트 (UI만)
//
// Props:
// - username, password, passwordConfirm: 각 입력값
// - onChangeUsername, onChangePassword, onChangePasswordConfirm: 변경 핸들러
// - onSubmit(): 가입 버튼 핸들러
// - errors: { username, password, passwordConfirm } 에러 메시지 객체

import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import Button from "../../components/common/Button/Button";
import styles from "./Register.module.scss";

function Register({
  username,
  password,
  passwordConfirm,
  onChangeUsername,
  onChangePassword,
  onChangePasswordConfirm,
  onSubmit,
  errors,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <FiUserPlus size={32} />
          </div>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>
            CareEat 계정을 만들어보세요
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            <span className={styles.labelText}>아이디</span>
            <input
              type="text"
              className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
              value={username}
              onChange={(e) => onChangeUsername(e.target.value)}
              placeholder="아이디를 입력하세요 (2자 이상)"
              autoFocus
            />
            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}
          </label>

          <label className={styles.label}>
            <span className={styles.labelText}>비밀번호</span>
            <input
              type="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              value={password}
              onChange={(e) => onChangePassword(e.target.value)}
              placeholder="비밀번호를 입력하세요 (4자 이상)"
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </label>

          <label className={styles.label}>
            <span className={styles.labelText}>비밀번호 확인</span>
            <input
              type="password"
              className={`${styles.input} ${errors.passwordConfirm ? styles.inputError : ""}`}
              value={passwordConfirm}
              onChange={(e) => onChangePasswordConfirm(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
            />
            {errors.passwordConfirm && (
              <p className={styles.error}>{errors.passwordConfirm}</p>
            )}
          </label>

          <Button type="submit" variant="primary" size="lg" fullWidth>
            가입하기
          </Button>
        </form>

        <div className={styles.footer}>
          <span className={styles.footerText}>이미 계정이 있으신가요?</span>
          <Link to="/login" className={styles.footerLink}>
            로그인
          </Link>
        </div>

        <p className={styles.notice}>
          ※ 유사 로그인입니다. 서버에 저장되지 않으며, 브라우저에만 기록됩니다.
        </p>
      </div>
    </div>
  );
}

export default Register;
