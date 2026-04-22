import axiosInstance from './axiosInstance';

/**
 * 네이버 쇼핑 API 호출 (담당: 팀원 A)
 *
 * 할 일:
 * 1. developers.naver.com에서 애플리케이션 등록 → Client ID/Secret 발급
 * 2. .env에 VITE_NAVER_CLIENT_ID, VITE_NAVER_CLIENT_SECRET 넣기
 * 3. Vite 프록시 설정 (vite.config.js의 /naver-api)
 * 4. 아래 함수 구현:
 *    - searchShop(keyword, options): 상품 검색
 *      응답 items: [{ title, link, image, lprice, hprice, mallName, brand }]
 *
 * 참고:
 * - 네이버 API는 CORS 제한 있음 → Vite 프록시 필수
 * - 헤더: X-Naver-Client-Id, X-Naver-Client-Secret
 * - 엔드포인트: /naver-api/v1/search/shop.json
 * - 파라미터: query(필수), display(1~100), start, sort(sim/date/asc/dsc)
 */

const CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_NAVER_CLIENT_SECRET;

// TODO: 팀원 A가 구현
export async function searchShop(keyword, options = {}) {
  const { display = 10, start = 1, sort = 'sim' } = options;

  // TODO: axiosInstance로 요청 보내기
  // const { data } = await axiosInstance.get('/naver-api/v1/search/shop.json', {
  //   params: { query: keyword, display, start, sort },
  //   headers: {
  //     'X-Naver-Client-Id': CLIENT_ID,
  //     'X-Naver-Client-Secret': CLIENT_SECRET,
  //   },
  // });
  // return data.items;

  console.warn('[네이버 API] searchShop은 팀원 A가 구현해야 합니다.');
  return [];
}
