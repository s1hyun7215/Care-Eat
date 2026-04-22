// containers/FoodsContainer.jsx
// 식재료 추천 탭 컨테이너
//
// TODO: 담당자가 아래 구현
// - foods 배열을 순회하며 네이버 쇼핑 API 호출 (useEffect)
// - 받아온 상품 목록을 로컬 state로 관리

import React from "react";
import { connect } from "react-redux";
import Foods from "../pages/Result/Foods/Foods";
import { add as addFavorite } from "../modules/favorite";

const FoodsContainer = ({ foods, favorites, addFavorite }) => {
  const onAddFavorite = (item) => {
    addFavorite({
      ...item,
      id: crypto.randomUUID(),
      type: "food",
      savedAt: new Date().toISOString(),
    });
  };

  return (
    <Foods foods={foods} favorites={favorites} onAddFavorite={onAddFavorite} />
  );
};

export default connect(
  ({ recommend, favorite }) => ({
    foods: recommend.foods,
    favorites: favorite.list,
  }),
  { addFavorite },
)(FoodsContainer);
