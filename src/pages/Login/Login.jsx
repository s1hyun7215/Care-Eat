// pages/Login/Login.jsx
// 로그인 페이지 - 프레젠테이셔널 컴포넌트 (UI만)
//
// Props:
// - username: 입력된 아이디
// - password: 입력된 비밀번호
// - onChangeUsername(value): 아이디 변경 핸들러
// - onChangePassword(value): 비밀번호 변경 핸들러
// - onSubmit(): 로그인 버튼 클릭 핸들러
// - errors: { username, password, form } 에러 메시지 객체

import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import Button from "../../components/common/Button/Button";
import styles from "./Login.module.scss";

function Login({
  username,
  password,
  onChangeUsername,
  onChangePassword,
  onSubmit,
  errors,
  registered,
  registeredUsername,
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
            <FiLogIn size={32} />
          </div>
          <h1 className={styles.title}>CareEat에 오신 걸 환영해요</h1>
          <p className={styles.subtitle}>
            아이디와 비밀번호를 입력하고 시작해보세요
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* 회원가입 성공 배너 */}
          {registered && (
            <p className={styles.successBanner}>
              🎉 <strong>{registeredUsername}</strong>님, 가입이 완료됐어요! 로그인해주세요.
            </p>
          )}

          {/* 폼 전체 에러 (아이디/비밀번호 불일치) */}
          {errors.form && (
            <p className={styles.errorForm}>{errors.form}</p>
          )}

          <label className={styles.label}>
            <span className={styles.labelText}>아이디</span>
            <input
              type="text"
              className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
              value={username}
              onChange={(e) => onChangeUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
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
              placeholder="비밀번호를 입력하세요"
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </label>

          <Button type="submit" variant="primary" size="lg" fullWidth>
            로그인
          </Button>
        </form>

        <div className={styles.footer}>
          <span className={styles.footerText}>아직 계정이 없으신가요?</span>
          <Link to="/register" className={styles.footerLink}>
            회원가입
          </Link>
        </div>

        <p className={styles.notice}>
          ※ 유사 로그인입니다. 서버에 저장되지 않으며, 브라우저에만 기록됩니다.
        </p>
      </div>
    </div>
  );
}

export default Login;
