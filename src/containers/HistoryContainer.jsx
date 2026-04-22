// containers/HistoryContainer.jsx
// 검색 기록 페이지 컨테이너

import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import History from "../pages/History/History";
import { remove, clearAll } from "../modules/history";

const HistoryContainer = ({ history, remove, clearAll }) => {
  const navigate = useNavigate();

  const onSelectItem = (item) => {
    navigate(`/result?q=${encodeURIComponent(item.query)}`);
  };

  return (
    <History
      history={history}
      onRemove={remove}
      onClearAll={clearAll}
      onSelectItem={onSelectItem}
    />
  );
};

export default connect(
  ({ history }) => ({
    history: history.list,
  }),
  { remove, clearAll },
)(HistoryContainer);
