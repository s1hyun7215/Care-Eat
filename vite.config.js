import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 네이버 쇼핑 API - CORS 우회용 프록시
      // /naver-api/v1/search/shop.json 으로 요청하면
      // https://openapi.naver.com/v1/search/shop.json 으로 전달됨
      '/naver-api': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/naver-api/, ''),
      },

      // CareEat FastAPI 백엔드 프록시
      // /api/* 요청을 http://127.0.0.1:8000 으로 전달
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
});
