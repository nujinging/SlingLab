import '../scss/modal/commentPort.scss'

export default function CommentPort({commentPortClose}) {

  return (
    <div className="modalBox report">
      <div className="inner">
        <h2 className="report_tit">신고하기</h2>
        <ul className="report_list">
          <li>
            <div className="check_label">
              <input id="report_01" type="checkbox"/>
              <label htmlFor="report_01">부적절한 홍보</label>
            </div>
          </li>
          <li>
            <div className="check_label">
              <input id="report_02" type="checkbox"/>
              <label htmlFor="report_02">개인정보 노출</label>
            </div>
          </li>
          <li>
            <div className="check_label">
              <input id="report_03" type="checkbox"/>
              <label htmlFor="report_03">단어와 맞지 않는 설명</label>
            </div>
          </li>
        </ul>
        <div className="btn_btm">
          <button type="button" className="report_close">저장</button>
        </div>
        <button type="button" className="btn_close" onClick={commentPortClose}>
          <span className="blind">닫기</span>
        </button>
      </div>
    </div>
  )
}