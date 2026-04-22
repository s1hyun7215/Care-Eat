import { useState, useCallback } from 'react';
import { analyzeSymptom } from '../services/geminiApi';

/**
 * useGemini - AI 증상 분석 커스텀 훅 (담당: 팀장)
 *
 * 사용 예시:
 * const { analyze, data, loading, error } = useGemini();
 * await analyze('눈이 침침해요');
 *
 * 반환:
 * - analyze(symptom): AI 호출 함수
 * - data: { nutrients, supplements, foods } | null
 * - loading: boolean
 * - error: Error | null
 */
export function useGemini() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (symptom) => {
    if (!symptom?.trim()) {
      setError(new Error('증상을 입력해주세요.'));
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeSymptom(symptom);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { analyze, data, loading, error, reset };
}
