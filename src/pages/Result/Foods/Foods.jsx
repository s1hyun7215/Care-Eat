// pages/Result/Foods/Foods.jsx
// 식재료 추천 탭 - 프레젠테이셔널
//
// Props:
// - foods: AI가 추천한 식재료 배열
// - onAddFavorite(item): 즐겨찾기 추가 핸들러
// - favorites: 현재 즐겨찾기 목록

function Foods({ foods, onAddFavorite, favorites }) {
  return (
    <div style={{ padding: "40px 0", textAlign: "center", color: "#7a7a7a" }}>
      <p>식재료 추천 탭</p>
      <p style={{ fontSize: 13, marginTop: 8 }}>
        담당자가 네이버 쇼핑 API 연동 + 레시피 이동 버튼 추가할 영역
      </p>
    </div>
  );
}

export default Foods;
