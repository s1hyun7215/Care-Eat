import axiosInstance from './axiosInstance';

/**
 * 식약처 조리식품 레시피 API (담당: 팀원 B)
 *
 * 할 일:
 * 1. 공공데이터포털(data.go.kr)에서 "식품의약품안전처_조리식품의 레시피 DB" 활용 신청
 * 2. 발급받은 키를 .env의 VITE_FOOD_API_KEY에 넣기
 * 3. 아래 함수 구현:
 *    - searchRecipesByIngredient(ingredient): 재료명으로 레시피 검색
 *
 * 참고:
 * - 엔드포인트: https://openapi.foodsafetykorea.go.kr/api/{KEY}/COOKRCP01/json/1/20/RCP_PARTS_DTLS=시금치
 * - CORS 제한 없음 (공공데이터 API는 대부분 허용)
 * - 주요 필드:
 *   - RCP_NM: 요리명
 *   - RCP_PARTS_DTLS: 재료 텍스트
 *   - ATT_FILE_NO_MAIN: 메인 이미지 URL
 *   - MANUAL_IMG01~20: 조리 단계별 이미지
 *   - HASH_TAG: 태그
 *   - INFO_ENG/CAR/PRO/FAT/NA: 영양정보
 *   - MANUAL01~20: 조리 단계별 설명
 */

const API_KEY = import.meta.env.VITE_FOOD_API_KEY;
const BASE_URL = 'https://openapi.foodsafetykorea.go.kr/api';

// TODO: 팀원 B가 구현
export async function searchRecipesByIngredient(ingredient) {
  // TODO: 요청 구현
  // const url = `${BASE_URL}/${API_KEY}/COOKRCP01/json/1/20/RCP_PARTS_DTLS=${encodeURIComponent(ingredient)}`;
  // const { data } = await axiosInstance.get(url);
  // return data.COOKRCP01?.row || [];

  console.warn('[식약처 API] searchRecipesByIngredient은 팀원 B가 구현해야 합니다.');
  return [];
}
