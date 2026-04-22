// pages/Result/Supplements/Supplements.jsx
// 영양제 추천 탭 - 프레젠테이셔널
//
// Props:
// - supplements: AI가 추천한 영양제 키워드 배열
// - onAddFavorite(item): 즐겨찾기 추가 핸들러
// - favorites: 현재 즐겨찾기 목록 (중복 체크용)

function Supplements({ supplements, onAddFavorite, favorites }) {
  return (
    <div style={{ padding: "40px 0", textAlign: "center", color: "#7a7a7a" }}>
      <p>영양제 추천 탭</p>
      <p style={{ fontSize: 13, marginTop: 8 }}>
        담당자가 네이버 쇼핑 API 연동 후 상품 카드를 렌더링할 영역
      </p>
    </div>
  );
}

export default Supplements;
