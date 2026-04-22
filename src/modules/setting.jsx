// modules/setting.jsx
// 사용자 설정 (쇼핑몰 선택 등)

// 1. 액션 타입
const SET_PREFERRED_MALL = "setting/SET_PREFERRED_MALL";

// 2. 액션 생성 함수
export const setPreferredMall = (mall) => ({
  type: SET_PREFERRED_MALL,
  mall,
});

// 3. localStorage에서 초기값 복원
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem("careeat_setting");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const defaultState = {
  preferredMall: "both", // 'naver' | 'coupang' | 'both'
};

const initialState = loadFromStorage() || defaultState;

// 4. 리듀서
function setting(state = initialState, action) {
  switch (action.type) {
    case SET_PREFERRED_MALL: {
      const next = { ...state, preferredMall: action.mall };
      localStorage.setItem("careeat_setting", JSON.stringify(next));
      return next;
    }
    default:
      return state;
  }
}

export default setting;
