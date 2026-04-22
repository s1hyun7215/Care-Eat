/**
 * 쿠팡 검색 딥링크 URL 조합 (담당: 팀원 A)
 *
 * 쿠팡은 파트너스 API 승인 조건이 까다로워서
 * 검색 URL 딥링크 방식으로 처리. API 호출 없이 URL만 조합해 새 탭으로 열기.
 */

/**
 * 쿠팡 검색 URL 생성
 * @param {string} keyword - 검색어
 * @returns {string} 쿠팡 검색 결과 페이지 URL
 */
export function getCoupangSearchUrl(keyword) {
  if (!keyword) return 'https://www.coupang.com';
  return `https://www.coupang.com/np/search?q=${encodeURIComponent(keyword)}`;
}

/**
 * 네이버 쇼핑 검색 URL 생성 (API 안 쓰고 링크만 필요할 때)
 * @param {string} keyword - 검색어
 * @returns {string} 네이버 쇼핑 검색 결과 페이지 URL
 */
export function getNaverShoppingSearchUrl(keyword) {
  if (!keyword) return 'https://shopping.naver.com';
  return `https://search.shopping.naver.com/search/all?query=${encodeURIComponent(keyword)}`;
}

/**
 * 쇼핑몰 선택에 따른 URL 생성 (편의 함수)
 * @param {string} keyword - 검색어
 * @param {'naver' | 'coupang'} mall - 쇼핑몰
 * @returns {string} 쇼핑몰 검색 URL
 */
export function getShopUrl(keyword, mall) {
  if (mall === 'naver') return getNaverShoppingSearchUrl(keyword);
  if (mall === 'coupang') return getCoupangSearchUrl(keyword);
  return getCoupangSearchUrl(keyword); // 기본값
}
