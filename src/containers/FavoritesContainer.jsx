// containers/FavoritesContainer.jsx
// 즐겨찾기 페이지 컨테이너

import React from 'react';
import { connect } from 'react-redux';
import Favorites from '../pages/Favorites/Favorites';
import { remove, updateMemo } from '../modules/favorite';

const FavoritesContainer = ({ favorites, remove, updateMemo }) => {
  return (
    <Favorites list={favorites} onRemove={remove} onUpdateMemo={updateMemo} />
  );
};

export default connect(
  ({ favorite }) => ({
    favorites: favorite.list,
  }),
  { remove, updateMemo },
)(FavoritesContainer);
