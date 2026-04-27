// containers/FoodsContainer.jsx
// 식재료 추천 탭 컨테이너
//
// TODO: 담당자가 아래 구현
// - foods 배열을 순회하며 네이버 쇼핑 API 호출 (useEffect)
// - 받아온 상품 목록을 로컬 state로 관리

import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Foods from '../pages/Result/Foods/Foods';
import { add, remove } from '../modules/favorite';
import { useNavigate } from 'react-router-dom';
import { searchShop } from '../services/naverApi';

const FoodsContainer = ({
  foods,
  favorites,
  addFavorite,
  preferredMall,
  removeFavorite,
}) => {
  const navigate = useNavigate();

  const [productMap, setProductMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});
  const [errorMap, setErrorMap] = useState({});
  const calledRef = useRef(new Set());

  useEffect(() => {
    if (!foods || foods.length === 0) return;

    foods.forEach(({ name }) => {
      if (calledRef.current.has(name)) return; // 중복 호출 방지
      calledRef.current.add(name);
      setLoadingMap((prev) => ({ ...prev, [name]: true }));

      searchShop(name, { display: 4 })
        .then((items) => {
          setProductMap((prev) => ({ ...prev, [name]: items }));
        })
        .catch(() => {
          setErrorMap((prev) => ({
            ...prev,
            [name]: '상품을 불러오지 못했어요 ㅠㅁㅠ..',
          }));
        })
        .finally(() => {
          setLoadingMap((prev) => ({ ...prev, [name]: false }));
        });
    });
  }, [foods]);

  const onAddFavorite = (item) => {
    addFavorite({
      id: crypto.randomUUID(),
      type: 'food',
      name: item.title,
      image: item.image,
      link: item.link,
      memo: '',
      savedAt: new Date().toISOString(),
    });
  };

  const onViewRecipe = (foodName) => {
    navigate(`/recipe/${encodeURIComponent(foodName)}`);
  };

  const onRemoveFavorite = (link) => {
    const found = favorites.find((fav) => fav.link === link);
    if (found) removeFavorite(found.id);
  };

  return (
    <Foods
      foods={foods}
      favorites={favorites}
      productMap={productMap}
      loadingMap={loadingMap}
      errorMap={errorMap}
      onAddFavorite={onAddFavorite}
      onViewRecipe={onViewRecipe}
      preferredMall={preferredMall}
      onRemoveFavorite={onRemoveFavorite}
    />
  );
};

export default connect(
  ({ recommend, favorite, setting }) => ({
    foods: recommend.foods,
    favorites: favorite.list,
    preferredMall: setting.preferredMall,
  }),
  { addFavorite: add, removeFavorite: remove },
)(FoodsContainer);
