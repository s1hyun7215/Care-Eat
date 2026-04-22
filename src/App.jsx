// App.jsx
// 라우터 설정 + lazy + Suspense + 로그인 보호

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout/Layout";
import LoadingSpinner from "./components/common/LoadingSpinner/LoadingSpinner";
import ProtectedRoute from "./containers/ProtectedRoute";

// ===== 코드 스플리팅: 각 페이지를 lazy로 분리 =====
// 빌드 시 별도 청크로 분리되어 초기 번들 크기 감소

// Container (Redux 연결)
const LoginContainer = lazy(() => import("./containers/LoginContainer"));
const RegisterContainer = lazy(() => import("./containers/RegisterContainer"));
const HomeContainer = lazy(() => import("./containers/HomeContainer"));
const ResultContainer = lazy(() => import("./containers/ResultContainer"));
const SupplementsContainer = lazy(() =>
  import("./containers/SupplementsContainer"),
);
const FoodsContainer = lazy(() => import("./containers/FoodsContainer"));
const RecipeContainer = lazy(() => import("./containers/RecipeContainer"));
const FavoritesContainer = lazy(() =>
  import("./containers/FavoritesContainer"),
);
const HistoryContainer = lazy(() => import("./containers/HistoryContainer"));

// Presentational (Redux 미사용)
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<LoadingSpinner size="lg" message="페이지 불러오는 중..." />}
      >
        <Routes>
          {/* 공통 레이아웃 (Navbar + Outlet) */}
          <Route element={<Layout />}>
            {/* 로그인 페이지 (공개) */}
            <Route path="/login" element={<LoginContainer />} />

            {/* 회원가입 페이지 (공개) */}
            <Route path="/register" element={<RegisterContainer />} />

            {/* 홈 (로그인 필요) */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomeContainer />
                </ProtectedRoute>
              }
            />

            {/* 결과 페이지 + 중첩 라우터 (로그인 필요) */}
            <Route
              path="/result"
              element={
                <ProtectedRoute>
                  <ResultContainer />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="supplements" replace />} />
              <Route path="supplements" element={<SupplementsContainer />} />
              <Route path="foods" element={<FoodsContainer />} />
            </Route>

            {/* 레시피 (로그인 필요) */}
            <Route
              path="/recipe/:foodId"
              element={
                <ProtectedRoute>
                  <RecipeContainer />
                </ProtectedRoute>
              }
            />

            {/* 즐겨찾기 (로그인 필요) */}
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesContainer />
                </ProtectedRoute>
              }
            />

            {/* 검색 기록 (로그인 필요) */}
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <HistoryContainer />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
