// pages/Home/Home.jsx
// 홈 페이지 - 프레젠테이셔널 컴포넌트 (UI만)
//
// Props:
// - username: 로그인한 사용자 아이디
// - symptom: 증상 입력값
// - onChangeSymptom(value): 증상 변경 핸들러
// - preferredMall: 'naver' | 'coupang' | 'both'
// - onChangeMall(mall): 쇼핑몰 선택 변경 핸들러
// - onSubmit(): AI 분석 시작 버튼 클릭 핸들러
// - loading: AI 분석 중 여부
// - recentHistory: 최근 검색 기록 배열 (최대 4개)
// - onSelectHistory(item): 최근 기록 클릭 핸들러
//
// 구현할 UI:
// - 인사말 ("{username}님, 요즘 어디가 불편하세요?")
// - 증상 입력 textarea
// - 증상 빠른 선택 칩 (눈 피로, 피부 트러블, 소화불량, 수면 부족, 면역력 저하, 만성 피로)
// - 쇼핑몰 선택 토글 (네이버/쿠팡/둘 다)
// - AI 분석 시작 버튼
// - 최근 검색 기록 (하단)

import styles from "./Home.module.scss";

function Home({
  username,
  symptom,
  onChangeSymptom,
  preferredMall,
  onChangeMall,
  onSubmit,
  loading,
  recentHistory,
  onSelectHistory,
}) {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          {username ? `${username}님, ` : ""}
          요즘 어디가 불편하세요?
        </h1>
        <p className={styles.subtitle}>
          증상을 입력하면 AI가 필요한 영양소와 제품을 추천해드려요
        </p>
      </section>

      <div className={styles.placeholder}>
        <p>홈 페이지는 담당자가 구현합니다.</p>
        <p className={styles.muted}>
          증상 입력 폼, 빠른 선택 칩, 쇼핑몰 토글, AI 분석 시작 버튼, 최근 검색 기록이 들어갈 예정.
        </p>
      </div>
    </div>
  );
}

export default Home;
