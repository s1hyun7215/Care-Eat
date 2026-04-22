// containers/SupplementsContainer.jsx
// 영양제 추천 탭 컨테이너
//
// TODO: 담당자가 아래 구현
// - supplements 배열을 순회하며 네이버 쇼핑 API 호출 (useEffect)
// - 받아온 상품 목록을 로컬 state로 관리

import React from "react";
import { connect } from "react-redux";
import Supplements from "../pages/Result/Supplements/Supplements";
import { add as addFavorite } from "../modules/favorite";

const SupplementsContainer = ({ supplements, favorites, addFavorite }) => {
  const onAddFavorite = (item) => {
    addFavorite({
      ...item,
      id: crypto.randomUUID(),
      type: "supplement",
      savedAt: new Date().toISOString(),
    });
  };

  return (
    <Supplements
      supplements={supplements}
      favorites={favorites}
      onAddFavorite={onAddFavorite}
    />
  );
};

export default connect(
  ({ recommend, favorite }) => ({
    supplements: recommend.supplements,
    favorites: favorite.list,
  }),
  { addFavorite },
)(SupplementsContainer);
