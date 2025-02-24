import '../scss/modal/nickName.scss'
export default function NickName({nickNameAdd, nickNameInput}) {

  return (
    <div className="modalBox nickname">
      <div className="inner">
        <h2 className="nickname_tit">프로필에 사용할<br/>닉네임을 입력해주세요</h2>
        <p className="nickname_txt">닉네임 변경할 수 없어요<br/>신중하게 결정해주세요</p>
        <input type="text" className="text_input" placeholder="닉네임 입력" onChange={nickNameInput}/>
        <div className="btn_btm">
          <button type="button" className="nickname_save" onClick={nickNameAdd}>확인</button>
        </div>
      </div>
    </div>
  )
}