// containers/RecipeContainer.jsx
// 레시피 페이지 컨테이너
//
// TODO: 담당자가 아래 구현
// - foodId로 식약처 API 호출 (useEffect)
// - 받아온 레시피 목록을 로컬 state로 관리
// - react-virtualized로 가상 스크롤 적용

import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Recipe from "../pages/Recipe/Recipe";
import { add as addFavorite } from "../modules/favorite";

const RecipeContainer = ({ favorites, addFavorite }) => {
  const { foodId } = useParams();

  const onAddFavorite = (recipe) => {
    addFavorite({
      ...recipe,
      id: crypto.randomUUID(),
      type: "recipe",
      savedAt: new Date().toISOString(),
    });
  };

  return (
    <Recipe
      foodId={foodId}
      favorites={favorites}
      onAddFavorite={onAddFavorite}
    />
  );
};

export default connect(
  ({ favorite }) => ({
    favorites: favorite.list,
  }),
  { addFavorite },
)(RecipeContainer);
