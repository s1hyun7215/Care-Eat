// containers/ResultContainer.jsx
// 결과 페이지 컨테이너

import React from "react";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Result from "../pages/Result/Result";

const ResultContainer = ({ nutrients, status }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return <Result query={query} nutrients={nutrients} status={status} />;
};

export default connect(({ recommend }) => ({
  nutrients: recommend.nutrients,
  status: recommend.status,
}))(ResultContainer);
