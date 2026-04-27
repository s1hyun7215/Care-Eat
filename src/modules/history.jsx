// modules/history.jsx
// 검색 기록 CRUD (메모/별점은 즐겨찾기로 대체되어 제거됨)
//
// 구현 규칙:
// - 액션 타입은 "history/XXX" 형식
// - 액션 생성 함수는 export
// - 리듀서는 switch-case로 작성 (불변성 유지)
// - 모든 변경 후 localStorage에 저장 (key: 'careeat_history')
// - 항목 구조: { id, query, nutrients, searchedAt }

// 1. 액션 타입
const ADD = 'history/ADD';
const REMOVE = 'history/REMOVE';
const CLEAR_ALL = 'history/CLEAR_ALL';

// 2. 액션 생성 함수
export const add = (item) => ({ type: ADD, item });
export const remove = (id) => ({ type: REMOVE, id });
export const clearAll = () => ({ type: CLEAR_ALL });

// 3. localStorage 초기값 로드
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('careeat_history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  list: loadFromStorage(),
};

// 4. 리듀서
function history(state = initialState, action) {
  switch (action.type) {
    case ADD: {
      const next = { ...state, list: [action.item, ...state.list] };
      localStorage.setItem('careeat_history', JSON.stringify(next.list));
      return next;
    }
    case REMOVE: {
      const next = {
        ...state,
        list: state.list.filter((i) => i.id !== action.id),
      };
      localStorage.setItem('careeat_history', JSON.stringify(next.list));
      return next;
    }
    case CLEAR_ALL: {
      localStorage.setItem('careeat_history', JSON.stringify([]));
      return { ...state, list: [] };
    }
    default:
      return state;
  }
}

export default history;
