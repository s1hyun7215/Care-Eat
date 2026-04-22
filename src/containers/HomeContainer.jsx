import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import { fetchStart, fetchSuccess, fetchError } from '../modules/recommend';
import { add as addHistory } from '../modules/history';
import { setPreferredMall } from '../modules/setting';
import { analyzeSymptom } from '../services/geminiApi';

const HomeContainer = ({
  preferredMall,
  recentHistory,
  fetchStart,
  fetchSuccess,
  fetchError,
  addHistory,
  setPreferredMall,
}) => {
  const [symptom, setSymptom] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!symptom.trim()) return;

    try {
      setLoading(true);
      fetchStart(symptom);

      const result = await analyzeSymptom(symptom);

      fetchSuccess(result);
      addHistory({
        id: crypto.randomUUID(),
        query: symptom,
        nutrients: result.nutrients.map((n) => n.name),
        searchedAt: new Date().toISOString(),
      });
      navigate('/result?q=' + encodeURIComponent(symptom));
    } catch (e) {
      fetchError(e.message);
      setLoading(false);
    }
  };

  return (
    <Home
      symptom={symptom}
      onChangeSymptom={setSymptom}
      onSubmit={onSubmit}
      loading={loading}
      preferredMall={preferredMall}
      onChangeMall={setPreferredMall}
      recentHistory={recentHistory}
    />
  );
};

export default connect(
  ({ setting, history }) => ({
    preferredMall: setting.preferredMall,
    recentHistory: history.list.slice(0, 4),
  }),
  { fetchStart, fetchSuccess, fetchError, addHistory, setPreferredMall },
)(HomeContainer);
