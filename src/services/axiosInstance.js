import axios from 'axios';

/**
 * 공통 axios 인스턴스
 *
 * - 요청/응답 인터셉터로 공통 처리
 * - 개별 API 서비스 파일에서 이걸 import해서 사용
 */
const axiosInstance = axios.create({
  timeout: 50000, // 50초
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`[API 요청] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('[API 에러]', error.response?.status, error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
