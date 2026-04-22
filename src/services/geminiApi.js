import axiosInstance from './axiosInstance';

/**
 * geminiApi.js
 *
 * 브라우저 → Vite 프록시(/api) → FastAPI(backend/main.py) → Gemini API
 *
 * API 키는 backend/.env(서버)에만 존재 → 브라우저에 노출되지 않음
 * 백엔드가 실행 중이어야 동작 (uvicorn main:app --reload)
 */

/**
 * 증상을 입력받아 AI 영양 분석 결과를 반환
 * @param {string} symptom - 사용자가 입력한 증상
 * @returns {Promise<{nutrients, supplements, foods}>}
 */
export async function analyzeSymptom(symptom) {
  try {
    const { data } = await axiosInstance.post('/api/analyze', { symptom });
    return data;
  } catch (error) {
    console.error('[Gemini API 에러]', error);
    throw new Error('AI 분석에 실패했습니다. 잠시 후 다시 시도해주세요.');
  }
}
