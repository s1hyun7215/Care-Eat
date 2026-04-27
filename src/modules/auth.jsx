// modules/auth.jsx
// 유사 로그인 (localStorage 기반, 서버 없음)
//
// - 회원가입: 아이디 + 비밀번호를 localStorage users 목록에 저장
// - 로그인: users 목록에서 아이디+비밀번호 일치 확인 후 로그인 처리
// - 로그인 상태는 careeat_auth에, 유저 목록은 careeat_users에 저장

// 1. 액션 타입
const LOGIN = "auth/LOGIN";
const LOGOUT = "auth/LOGOUT";
const REGISTER = "auth/REGISTER";

// 2. 액션 생성 함수
export const login = (username) => ({
  type: LOGIN,
  username,
});

export const logout = () => ({ type: LOGOUT });

export const register = (username, password) => ({
  type: REGISTER,
  username,
  password,
});

// 3. localStorage 헬퍼

// 로그인 세션 복원
const loadSessionFromStorage = () => {
  try {
    const saved = localStorage.getItem("careeat_auth");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

// 유저 목록 불러오기
export const loadUsersFromStorage = () => {
  try {
    const saved = localStorage.getItem("careeat_users");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// 유저 목록 저장
const saveUsersToStorage = (users) => {
  localStorage.setItem("careeat_users", JSON.stringify(users));
};

const defaultState = {
  isLoggedIn: false,
  username: "",
  loggedInAt: null,
};

const initialState = loadSessionFromStorage() || defaultState;

// 4. 리듀서
function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const next = {
        isLoggedIn: true,
        username: action.username,
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem("careeat_auth", JSON.stringify(next));
      return next;
    }
    case LOGOUT: {
      localStorage.removeItem("careeat_auth");
      return defaultState;
    }
    case REGISTER: {
      // users 목록에 새 유저 추가 (Redux state는 변경 없음 — 가입 후 로그인 페이지로 이동)
      const users = loadUsersFromStorage();
      const newUsers = [
        ...users,
        {
          username: action.username,
          password: action.password,
          createdAt: new Date().toISOString(),
        },
      ];
      saveUsersToStorage(newUsers);
      return state;
    }
    default:
      return state;
  }
}

export default auth;
