// modules/favorite.jsx
// 즐겨찾기 CRUD
//
// 구현 규칙:
// - 액션 타입은 "favorite/XXX" 형식
// - 액션 생성 함수는 export (다른 파일에서 dispatch 가능하게)
// - 리듀서는 switch-case로 작성
// - 모든 변경 후 localStorage에 저장 (key: 'careeat_favorites')
// - 항목 구조: { id, type, name, image, link, memo, savedAt }
//   - type: 'supplement' | 'food' | 'recipe'

// 1. 액션 타입
const ADD = "favorite/ADD";
const REMOVE = "favorite/REMOVE";
const UPDATE_MEMO = "favorite/UPDATE_MEMO";

// 2. 액션 생성 함수
// TODO: 담당자가 필요한 payload 구조 확정 후 구현
export const add = (item) => ({ type: ADD, item });
export const remove = (id) => ({ type: REMOVE, id });
export const updateMemo = (id, memo) => ({ type: UPDATE_MEMO, id, memo });

// 3. localStorage 초기값 로드
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem("careeat_favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  list: loadFromStorage(),
};

// 4. 리듀서
function favorite(state = initialState, action) {
  switch (action.type) {
    // TODO: 담당자가 CRUD 로직 구현
    //
    // case ADD: {
    //   const next = { ...state, list: [...state.list, action.item] };
    //   localStorage.setItem("careeat_favorites", JSON.stringify(next.list));
    //   return next;
    // }
    // case REMOVE: {
    //   const next = {
    //     ...state,
    //     list: state.list.filter((item) => item.id !== action.id),
    //   };
    //   localStorage.setItem("careeat_favorites", JSON.stringify(next.list));
    //   return next;
    // }
    // case UPDATE_MEMO: {
    //   const next = {
    //     ...state,
    //     list: state.list.map((item) =>
    //       item.id === action.id ? { ...item, memo: action.memo } : item
    //     ),
    //   };
    //   localStorage.setItem("careeat_favorites", JSON.stringify(next.list));
    //   return next;
    // }
    default:
      return state;
  }
}

export default favorite;
