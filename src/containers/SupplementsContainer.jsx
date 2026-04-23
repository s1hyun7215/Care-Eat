// containers/SupplementsContainer.jsx
// 영양제 추천 탭 컨테이너
//
// TODO: 담당자가 아래 구현
// - supplements 배열을 순회하며 네이버 쇼핑 API 호출 (useEffect)
// - 받아온 상품 목록을 로컬 state로 관리

import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Supplements from '../pages/Result/Supplements/Supplements';
import {
  add as addFavorite,
  remove as removeFavorite,
} from '../modules/favorite';
import { searchShop } from '../services/naverApi';

const SupplementsContainer = ({
  supplements,
  favorites,
  addFavorite,
  preferredMall,
  removeFavorite,
}) => {
  const [productMap, setProductMap] = useState({}); // 결과
  const [loadingMap, setLoadingMap] = useState({}); // 로딩
  const [errorMap, setErrorMap] = useState({}); // 에러
  const calledRef = useRef(new Set());

  useEffect(() => {
    if (!supplements || supplements.length === 0) return; // 입력값이 없거나 비어있으면

    supplements.forEach(({ keyword }) => {
      if (calledRef.current.has(keyword)) return; // 에러 추가
      calledRef.current.add(keyword); // 에러 추가
      setLoadingMap((prev) => ({ ...prev, [keyword]: true }));
      searchShop(keyword, { display: 4 })
        .then((items) => {
          setProductMap((prev) => ({ ...prev, [keyword]: items }));
        })
        .catch(() => {
          setErrorMap((prev) => ({
            ...prev,
            [keyword]: '상품을 불러오지 못했어요 ㅠㅁㅠ..',
          }));
        })
        .finally(() => {
          setLoadingMap((prev) => ({ ...prev, [keyword]: false }));
        });
    });
  }, [supplements]);

  const onAddFavorite = (item) => {
    addFavorite({
      ...item, // 상품정보
      id: crypto.randomUUID(), // 고유 ID생성
      type: 'supplement', // 나중에 즐찾에서 영양제만 필터링할때 필요
      savedAt: new Date().toISOString(), // 저장한 시간 기록
    });
  };

  const onRemoveFavorite = (link) => {
    const found = favorites.find((fav) => fav.link === link);
    if (found) removeFavorite(found.id);
  };

  return (
    <Supplements
      supplements={supplements}
      favorites={favorites}
      onAddFavorite={onAddFavorite}
      productMap={productMap}
      loadingMap={loadingMap}
      errorMap={errorMap}
      preferredMall={preferredMall}
      onRemoveFavorite={onRemoveFavorite}
    />
  );
};

export default connect(
  ({ recommend, favorite, setting }) => ({
    supplements: recommend.supplements,
    favorites: favorite.list,
    preferredMall: setting.preferredMall,
  }),
  { addFavorite, removeFavorite },
)(SupplementsContainer);
