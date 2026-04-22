# Custom Hooks

각자 최소 1개 이상의 커스텀 훅을 만들어주세요. (요구사항)

## 담당 훅

- **팀장**: `useGemini.js` ✅ 작성 완료
- **팀원 A**: `useShoppingSearch.js` (네이버/쿠팡 쇼핑 검색 추상화)
- **팀원 B**: `useLocalStorage.js` (localStorage와 상태 동기화)

## 작성 규칙

1. 파일명은 `use`로 시작 (예: `useGemini.js`)
2. 이 폴더에 모두 위치
3. 다른 훅에서 `import`할 때는 상대경로 사용
4. 반드시 React 훅 규칙 준수 (최상위에서만 호출, 조건부 호출 금지)

## 작성 예시 (useGemini.js 참고)

```jsx
import { useState, useCallback } from 'react';

export function useXxx() {
  const [state, setState] = useState(null);

  const doSomething = useCallback(async () => {
    // ...
  }, []);

  return { state, doSomething };
}
```
