// modules/recommend.jsx
// AI(Gemini)가 분석한 영양소/영양제/식재료 추천 결과

// 1. 액션 타입 정의
const FETCH_START = "recommend/FETCH_START";
const FETCH_SUCCESS = "recommend/FETCH_SUCCESS";
const FETCH_ERROR = "recommend/FETCH_ERROR";
const RESET = "recommend/RESET";

// 2. 액션 생성 함수
export const fetchStart = (query) => ({
  type: FETCH_START,
  query,
});

export const fetchSuccess = ({ nutrients, supplements, foods }) => ({
  type: FETCH_SUCCESS,
  nutrients,
  supplements,
  foods,
});

export const fetchError = (error) => ({
  type: FETCH_ERROR,
  error,
});

export const reset = () => ({ type: RESET });

// 3. 초기 상태 정의
const initialState = {
  query: "", // 사용자가 입력한 증상
  nutrients: [], // [{ name, reason }]
  supplements: [], // [{ keyword }]
  foods: [], // [{ name, description }]
  status: "idle", // 'idle' | 'loading' | 'success' | 'error'
  error: null,
};

// 4. 리듀서 함수
function recommend(state = initialState, action) {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        query: action.query,
        status: "loading",
        error: null,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        nutrients: action.nutrients,
        supplements: action.supplements,
        foods: action.foods,
        status: "success",
      };
    case FETCH_ERROR:
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

export default recommend;
