
<div align="center">

## 🥗 CareEat
### AI 영양소 분석 기반 식재료·영양제 추천 플랫폼

> 증상을 입력하면 AI가 영양소를 분석하고, 영양제·식재료·레시피까지 한번에 추천해드립니다.

<br/>

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)

</div>

---

## 📌 기획 의도

현대인들은 만성 피로, 침침한 눈, 소화 불량 등 다양한 건강 이상 신호를 느끼지만,<br/>
이를 해결하기 위해 매번 병원을 가거나 인터넷 정보를 일일이 검색하는 데 피로감을 느낍니다.

음식 레시피와 영양제 정보는 넘쳐나지만,<br/>
**현재 나의 상태에 최적화된 식재료, 영양제와 구매처를 한 번에 연결해 주는 서비스는 부족**하다는 점에 주목했습니다.

**AI 분석을 통한 개인 맞춤형 건강 큐레이션 서비스**

사용자가 일상적인 언어로 자신의 상태를 입력하면,<br/>
AI 를 통해 핵심 키워드를 추출하여 식재료와 영양제를 즉각적으로 추천합니다.

단순 정보 제공에 그치지 않고, 공공데이터 API와 쇼핑몰을 연동하여<br/>
**하나의 끊김 없는 사용자 여정**을 제공합니다.


## 🎯 기획 목표

- ✅ AI 기반 맞춤 영양소 분석 및 추천 구현
- ✅ 영양제 / 식재료 / 레시피 통합 추천 플로우 구현
- ✅ 네이버쇼핑 / 쿠팡 연동으로 즉시 구매 가능한 UX 구현
- ✅ 즐겨찾기 / 검색기록으로 개인화 경험 제공

---

## 👨‍💻 팀원 및 역할 분담

| 이름 | GitHub | 주요 작업 |
|------|--------|-----------|
| 전시현<br/>(팀장) | [@s1hyun7215](https://github.com/s1hyun7215) | 🔹 Redux 기반 전역 상태 아키텍처 설계 및 구현<br/>🔹 React Router를 활용한 SPA 라우터 구성<br/>🔹 Python 백엔드 서버와 AI API 통신 연동<br/>🔹 localStorage 설계 및 영속성 처리 구현<br/>🔹 Home / Favorite / History 페이지 및 기능구현<br/>🔹 공통 컴포넌트 및 스타일 구현<br/> |
| 이민주<br/>(팀원) | [@danggiju](https://github.com/danggiju) | 🔹 영양제 탭 UI 구현 (네이버 쇼핑 API 연동)<br/>🔹 식재료 탭 UI 구현 (네이버 쇼핑 API 연동)<br/>🔹 영양제/식재료 카드 컴포넌트 구현<br/>🔹 즐겨찾기 추가 버튼 연동<br/>🔹 레시피 페이지 이동 버튼 연동 |
| 권용익<br/>(팀원) | [@dyddlr068](https://github.com/dyddlr068) | 🔹 식약처 API 연동 레시피 페이지 구현<br/>🔹 레시피 카드 3열 반응형 그리드 및 모달 팝업 구현<br/>🔹 즐겨찾기 필터 탭 및 메모 인라인 편집/삭제 구현<br/>🔹 검색기록 리스트/타임라인 뷰 및 결과 페이지 재진입 구현<br/>🔹 react-virtualized 가상 스크롤 및 useMemo/useCallback 성능 최적화 구현 |

---

## 🛠 기술 스택

| 카테고리 | 기술 |
|----------|------|
| 빌드 툴 | Vite |
| 프레임워크 | React 19 |
| 상태관리 | Redux + react-redux |
| 스타일링 | SCSS Modules |
| 라우팅 | react-router-dom |
| 비동기 | axios |
| 가상화 | react-virtualized |
| AI | Google Gemini API |
| 백엔드 | FastAPI |

---

## ⚙️ 사용 라이브러리 및 버전

| 라이브러리 | 버전 |
|------------|------|
| react | ^19.2.4 |
| react-router-dom | ^7.14.1 |
| redux | ^4.2.1 |
| react-redux | ^9.2.0 |
| axios | ^1.15.0 |
| react-virtualized | ^9.22.6 |
| sass | ^1.99.0 |
| react-icons | ^5.6.0 |

---

## 💻 개발 환경

- **에디터**: VSCode
- **버전 관리**: GitHub + Sourcetree
- **브랜치 전략**: `main` → `develop` → `feature/기능명`
- **패키지 매니저**: npm
- **OS**: Windows

---

## ⚙️ 환경 변수 및 설치

**.env 설정**

```env
VITE_FOOD_API_KEY=식약처 API 키
VITE_NAVER_CLIENT_ID=네이버 클라이언트 ID
VITE_NAVER_CLIENT_SECRET=네이버 클라이언트 시크릿
VITE_GEMINI_API_KEY=Gemini API 키
```

**설치 및 실행**

```bash
# 프론트엔드 실행
npm install --legacy-peer-deps
npm run dev

# 백엔드 실행
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

---

## 👀 주요 기능 실행 화면
> 📋 아이콘을 클릭하면 해당 페이지의 플로우차트를 볼 수 있어요.<br/>
> 🖼️ 이미지를 클릭하면 크게 볼 수 있어요.

| 회원가입/로그인 [📋](https://www.notion.so/Care-Eat-Flow-Chart-34f0f9c246cb8077ba5ee24e287c665e?source=copy_link#34f0f9c246cb80319ceadaba3b665bae) | 홈페이지 [📋](https://www.notion.so/Care-Eat-Flow-Chart-34f0f9c246cb8077ba5ee24e287c665e?source=copy_link#34f0f9c246cb80dba0f1e6a4f5714353) |
|:---:|:---:|
| <img width="400" alt="register_login" src="https://github.com/user-attachments/assets/32241060-475e-4658-bf97-31dd0bcdf667" /> | <img width="400" alt="home" src="https://github.com/user-attachments/assets/93e10a11-44d0-4dc1-a5d8-92516e9964c6" /> |

| 결과 [📋](https://www.notion.so/Care-Eat-Flow-Chart-34f0f9c246cb8077ba5ee24e287c665e?source=copy_link#34f0f9c246cb8056b654fd8a7ff6cba4) | 레시피 [📋](https://www.notion.so/Care-Eat-Flow-Chart-34f0f9c246cb8077ba5ee24e287c665e?source=copy_link#34f0f9c246cb802dab31fc8c6f92047a) |
|:---:|:---:|
| <img width="400" alt="result" src="https://github.com/user-attachments/assets/82485ad0-78c9-4638-8465-620598f1e8b9" /> | <img width="400" alt="recipe" src="https://github.com/user-attachments/assets/3cf049eb-053e-46fc-876f-045022c124c1" /> |

| 즐겨찾기 [📋](https://www.notion.so/Care-Eat-Flow-Chart-34f0f9c246cb8077ba5ee24e287c665e?source=copy_link#34f0f9c246cb8077bc00f2c0ad0d7f14) | 검색기록 [📋](https://www.notion.so/Care-Eat-Flow-Chart-34f0f9c246cb8077ba5ee24e287c665e?source=copy_link#34f0f9c246cb80f2b0f0fc1214f49ed1) |
|:---:|:---:|
| <img width="400" alt="favorite" src="https://github.com/user-attachments/assets/9f7a5ffc-25cc-4fba-8c25-3ee3b7db7536" /> | <img width="400" alt="history" src="https://github.com/user-attachments/assets/16549af2-e1ce-4e4c-8dd7-0363c1ed9e6e" /> |

---


## 🗺️ 라우팅 구조

| 경로 | 페이지 | 접근 |
|------|--------|------|
| `/` | 홈 | 🔒 로그인 필요 |
| `/login` | 로그인 | 🌐 공개 |
| `/register` | 회원가입 | 🌐 공개 |
| `/result` | 결과 | 🔒 로그인 필요 |
| `/recipe/:foodId` | 레시피 | 🔒 로그인 필요 |
| `/favorites` | 즐겨찾기 | 🔒 로그인 필요 |
| `/history` | 검색기록 | 🔒 로그인 필요 |

---

## 🧠 Redux 상태 관리

- **auth 모듈**: 로그인/로그아웃 상태, localStorage 동기화
- **favorite 모듈**: 즐겨찾기 추가/삭제/메모수정, localStorage 동기화
- **history 모듈**: 검색기록 추가/삭제/전체삭제, localStorage 동기화
- **recommend 모듈**: AI 추천 요청/응답 상태 관리 (로딩/성공/에러 처리)
- **setting 모듈**: 선호 쇼핑몰 설정 (네이버/쿠팡/전체), localStorage 동기화


## 🔁 Redux 데이터 흐름도
<img width="500" alt="redux drawio" src="https://github.com/user-attachments/assets/6b2b64c7-6400-4943-961b-d5c97937dcfb" />



---

## 📋 API 명세서

<details>
<summary>🔹 식약처 조리식품 레시피 API</summary>

| 항목 | 내용 |
|------|------|
| **기능 설명** | 식재료 이름으로 관련 레시피 목록을 조회 |
| **요청 URL** | `https://openapi.foodsafetykorea.go.kr/api/{API_KEY}/COOKRCP01/json/{start}/{end}/RCP_PARTS_DTLS={ingredient}` |
| **Method** | GET |
| **요청 파라미터** | `API_KEY`, `start`, `end`, `RCP_PARTS_DTLS` |
| **응답 코드** | 200 OK |
| **에러 코드** | 400 Bad Request / 401 Unauthorized |
| **비고** | 20개씩 페이지네이션, `encodeURIComponent()` 인코딩 필요 |

</details>

<details>
<summary>🔹 네이버 쇼핑 검색 API</summary>

| 항목 | 내용 |
|------|------|
| **기능 설명** | 키워드로 네이버 쇼핑 상품을 검색하여 영양제·식재료 구매 링크 제공 |
| **요청 URL** | `https://openapi.naver.com/v1/search/shop.json` (Vite 프록시 `/naver-api` 경유) |
| **Method** | GET |
| **요청 헤더** | `X-Naver-Client-Id`, `X-Naver-Client-Secret` |
| **응답 코드** | 200 OK |
| **에러 코드** | 400 / 401 / 429 Too Many Requests |
| **비고** | CORS 우회 필요, 하루 25,000건 무료 호출 제한 |

</details>

<details>
<summary>🔹 Gemini AI 증상 분석 API</summary>

| 항목 | 내용 |
|------|------|
| **기능 설명** | 사용자가 입력한 증상을 AI가 분석하여 영양소·영양제·식재료를 추천 |
| **요청 URL** | `/api/analyze` (Vite 프록시 → FastAPI → Gemini API) |
| **Method** | POST |
| **요청 파라미터** | `symptom`: 증상 텍스트 (Request Body) |
| **응답 코드** | 200 OK |
| **에러 코드** | 400 Bad Request / 500 Internal Server Error |
| **비고** | API 키는 backend/.env에서만 관리, FastAPI 백엔드 실행 필요 |

</details>

---

## 🛠️ 핵심 기능 구현

| 기능 | 구현 내용 | 적용 기술/코드 |
|------|-----------|----------------|
| **🤖 AI 증상 분석** | 자연어 증상 입력 → Gemini AI 분석 → 영양소 추출 | `geminiApi.js` |
| | FastAPI 백엔드 → Gemini API → 영양소·영양제·식재료 추천 반환 | `analyzeSymptom()` |
| | `useDebounce` 훅으로 입력 중 불필요한 API 호출 방지 (800ms) | `hooks/useDebounce.js` |
| **🛒 쇼핑 연동** | Gemini 분석 결과 기반 네이버 쇼핑 API 검색 결과 표시 | `naverApi.js` |
| | HTML 태그 제거 후 상품명·이미지·가격 표시 | `replace(/<[^>]*>/g, '')` |
| | CORS 우회 → Vite 프록시(`/naver-api`) 경유 | `vite.config.js` |
| **🍳 레시피 조회** | 식재료 클릭 → 식약처 API → 레시피 카드 표시 | `foodApi.js` |
| | `react-virtualized` List + AutoSizer로 보이는 카드만 렌더링 | `Recipe.jsx` |
| | `IntersectionObserver` → 20개씩 자동 추가 로드 (무한 스크롤) | `RecipeContainer.jsx` |
| **🔗 구매 링크** | 재료 클릭 → 네이버 쇼핑 / 쿠팡 구매 페이지 이동 | `coupangLink.js` |
| | `extractIngredientName()` 으로 수량·단위 제거 후 검색 키워드 사용 | `foodApi.js` |




---

## 📝 CRUD 기능

| 기능 | 구현 내용 | 적용 기술/코드 |
|------|-----------|----------------|
| **CRUD** | 즐겨찾기와 검색기록의 데이터 생성·조회·수정·삭제 | `modules/favorite.jsx`, `modules/history.jsx` |
| **C (Create)** | 즐겨찾기 추가, 증상 검색 시 검색기록 자동 저장 | `FoodsContainer.jsx`, `SupplementsContainer.jsx`, `HomeContainer.jsx` |
| **R (Read)** | 즐겨찾기 탭 필터 조회, 검색기록 리스트 뷰 조회 | `Favorites.jsx`, `History.jsx` |
| **U (Update)** | 즐겨찾기 카드 메모 인라인 편집 | `Favorites.jsx` 내 `FavoriteCard` |
| **D (Delete)** | 즐겨찾기 개별 삭제, 검색기록 개별/전체 삭제 | `FavoritesContainer.jsx`, `HistoryContainer.jsx` |

---

## ⚡ SPA (Routing)
| 기능 | 구현 내용 | 적용 기술/코드 |
|------|-----------|----------------|
| **⚡ SPA** | `react-router-dom` 기반 새로고침 없는 페이지 전환 | `App.jsx` 내 `<BrowserRouter>`, `<Routes>`, `<Route>` |
| | `lazy` + `Suspense` 로 페이지별 코드 스플리팅, 초기 번들 크기 감소 | `App.jsx` |
| | `ProtectedRoute` 로 비로그인 사용자 접근 차단 → `/login` 리다이렉트 | `ProtectedRoute.jsx` |
| | 검색기록 클릭 시 `navigate()` 로 결과 페이지 바로 재진입 | `HistoryContainer.jsx` 내 `onSelectItem()` |

---

## 🧩 코드 스플리팅

- `App.jsx`에 모든 Container를 `lazy()` + `Suspense`로 적용
- 페이지 접속 시 해당 컴포넌트만 로딩
- 초기 번들 사이즈 감소

---

## 📜 가상 스크롤

- `react-virtualized` List + AutoSizer 적용
- 스크롤 위치 기준으로 필요한 행만 렌더링
- 웹 3열 / 태블릿 2열 / 모바일 1열 반응형 적용

---

## 🚀 성능 최적화

| 단계 | 적용 최적화 | Render 시간 | 개선율 |
|------|-------------|-------------|--------|
| **최적화 전** | 없음 (더미데이터 1000개 주입 테스트) | **459.8ms** | - |
| **가상 스크롤 적용** | `react-virtualized` (List + AutoSizer + Grid) | **46.2ms** | 90% ⬇️ |
| **최종 (useCallback 적용)** | `react-virtualized` + `useCallback` + `memo` | **7.2ms** | 98.4% ⬇️ |
<img width="1397" height="684" alt="image" src="https://github.com/user-attachments/assets/1b8956a1-893a-4e55-8aa1-5c8ca8e094a2" />
<img width="1390" height="766" alt="image" src="https://github.com/user-attachments/assets/d7f4a662-e0a2-4db8-b498-1221f62c8479" />
<img width="1479" height="768" alt="image" src="https://github.com/user-attachments/assets/3c33e413-6d27-4b69-820c-69c49b99755e" />




---

## 📱 반응형 웹

>다양한 디바이스에서 동일한 UX를 제공하도록 반응형 디자인을 적용했습니다.

**PC / 태블릿 / 모바일**

<img width="1624" height="782" alt="반응형" src="https://github.com/user-attachments/assets/aaf7f977-a6d2-41a5-8702-624400e9ec79" />

---


## 👥 팀 프로젝트 작업일지 및 회의록

- 🔗 [CARE-EAT 팀프로젝트 회의록](https://www.notion.so/CareEat-34c0f9c246cb807eb452d3a576363dbd?source=copy_link) </br>

---

## 💡 향후 발전 방향

- 🛒 **쇼핑 연동 확대** — 쿠팡 공식 API 연동 및 가격 비교 기능 추가
- 👤 **회원 맞춤 기능 강화** — 건강 목표·알레르기·선호 재료 기반 개인화 추천
- 📱 **모바일 앱 확장** — React Native 기반 확장, 푸시 알림·건강 기록 트래킹

---

## 🏁 프로젝트 마무리

이번 프로젝트 **「CareEat」** 은 사용자의 건강 증상을 자연어로 입력하면 AI가 분석하여 필요한 영양소·영양제·식재료를 추천하고, 레시피와 쇼핑 구매 링크까지 연결해주는 건강 관리 웹 애플리케이션을 목표로 개발하였습니다.

5일간의 짧은 개발 기간 동안 팀원들과 역할을 분담하여 React 기반 SPA, Gemini AI 연동, 공공데이터·네이버 쇼핑 외부 API 연동, 무한 스크롤, 가상 스크롤, 코드 스플리팅, Redux 상태 관리 등 다양한 기술을 설계·구현했습니다.

이를 통해 프론트엔드 구조 설계 능력, 외부 API와 AI를 결합한 서비스 구현 경험, 협업을 통한 문제 해결 능력, 그리고 사용자 경험(UX)을 고려한 성능 최적화 역량을 함께 성장시킬 수 있었습니다.

---

<div align="center">

**CareEat** · 2026 · Frontend team project

</div>
