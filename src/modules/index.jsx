// modules/index.jsx
// 루트 리듀서 - 모든 리듀서를 하나로 합침

import { combineReducers } from "redux";
import auth from "./auth";
import recommend from "./recommend";
import setting from "./setting";
import favorite from "./favorite";
import history from "./history";

const rootReducer = combineReducers({
  auth, // 유사 로그인
  recommend, // AI 분석 결과
  setting, // 사용자 설정 (쇼핑몰 선호 등)
  favorite, // 즐겨찾기 목록
  history, // 검색 기록
});

export default rootReducer;
