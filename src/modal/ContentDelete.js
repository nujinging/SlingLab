import '../scss/modal/contentDelete.scss'

export default function contentDelete({contentDeleteClose, contentDeleteSubmit}) {

  return (
    <div className="modalBox content_delete">
      <div className="inner">
        <h2 className="content_tit">정말 삭제하실건가요?</h2>
        <div className="btn_btm">
          <button type="button" className="btn_close" onClick={contentDeleteClose}>
            닫기
          </button>
          <button type="button" className="btn_close" onClick={contentDeleteSubmit}>
            네
          </button>
        </div>

      </div>
    </div>
  )
}