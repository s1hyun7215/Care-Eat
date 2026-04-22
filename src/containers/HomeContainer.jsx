// containers/HomeContainer.jsx
// 홈 페이지 컨테이너
//
// TODO: 담당자가 아래 구현
// - useState로 symptom 로컬 상태 관리
// - onSubmit 시 Gemini API 호출 → recommend 모듈에 저장 → history 모듈에 add → /result로 이동

import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import { setPreferredMall } from "../modules/setting";
// TODO: import { fetchStart, fetchSuccess, fetchError } from "../modules/recommend";
// TODO: import { add as addHistory } from "../modules/history";

const HomeContainer = ({
  username,
  preferredMall,
  recentHistory,
  setPreferredMall,
}) => {
  const [symptom, setSymptom] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeSymptom = (value) => setSymptom(value);

  const onChangeMall = (mall) => setPreferredMall(mall);

  const onSubmit = async () => {
    if (!symptom.trim()) return;

    // TODO: 담당자가 구현
    // 1. setLoading(true)
    // 2. dispatch(fetchStart(symptom))
    // 3. const result = await analyzeSymptom(symptom)
    // 4. dispatch(fetchSuccess(result))
    // 5. dispatch(addHistory({ id, query: symptom, nutrients, searchedAt }))
    // 6. navigate('/result?q=' + encodeURIComponent(symptom))
  };

  const onSelectHistory = (item) => {
    navigate(`/result?q=${encodeURIComponent(item.query)}`);
  };

  return (
    <Home
      username={username}
      symptom={symptom}
      onChangeSymptom={onChangeSymptom}
      preferredMall={preferredMall}
      onChangeMall={onChangeMall}
      onSubmit={onSubmit}
      loading={loading}
      recentHistory={recentHistory}
      onSelectHistory={onSelectHistory}
    />
  );
};

export default connect(
  ({ auth, setting, history }) => ({
    username: auth.username,
    preferredMall: setting.preferredMall,
    recentHistory: history.list.slice(0, 4),
  }),
  { setPreferredMall },
)(HomeContainer);
