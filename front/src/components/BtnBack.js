import '../scss/common/common.scss'
import React from "react";

export default function BtnBack() {
  const goBack = () => {
    window.history.back();
  };
  return (
    <button type="button" className="btn_back" onClick={goBack}>
      <span className="blind">뒤로가기</span>
    </button>
  )
}