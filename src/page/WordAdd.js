import './../scss/word.scss'
import Title from '../components/Title'
import {useState} from "react";
import {memebookApi} from "../util/memebookApi";

export default function WordAdd() {
  const [titleNull, setTitleNull] = useState(false);
  const [explainNull, setExplainNull] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [titleOver, setTitleOver] = useState(false);
  const [explainCount, setExplainCount] = useState(0);
  const [explainOver, setExplainOver] = useState(false);

  async function wordAddPost() {
    try {
      const wordAddApi = await memebookApi.wordAdd( {
        wordTitle : '테스트',
        wordContent : '테스트중중중',
        wordNation : "KOR",
        RegMem : 123123,
        ModMem : 123123
      });
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  const CharacterCount = (event, type) => {
    let e = event.target.value;
    if (type === 'title') {
      setTitleCount(e.length);
      e.length >= 20 ? setTitleOver(true) : setTitleOver(false);
      setTitleNull(false);
    } else if (type === 'detail') {
      setExplainCount(e.length);
      e.length >= 99 ? setExplainOver(true) : setExplainOver(false);
      setExplainNull(false);
    }
  }

  const textCheck = () => {
    if (titleCount === 0) {
      setTitleNull(true);
    }
    if (explainCount === 0) {
      setExplainNull(true);
    }
    wordAddPost();
  }


  return (
    <div className="layer">

      <Title title="단어 등록"></Title>

      <div className="container">

        <div className="word_add_tip">
          $일본$에 관한 밈을 등록해주세요.<br/>일본어를 배우고 싶은 밈밍이들이 좋아할 거에요&#128218;
        </div>

        <div className="input_box">
          <div className="tit_box">
            <h4 className="tit">일본어</h4>
          </div>
          <input type="text" className="text_input" placeholder="단어를 입력해주세요" maxLength={19} onChange={event => CharacterCount(event, 'title')}/>

          <div className="input_sub">
            {
              titleNull && (
                <p className="invalid_msg">&#128397; 한글자 이상 작성해주세요</p>
              )
            }
            {
              titleOver && (
                <p className="invalid_msg">&#128546; 20자 이하로 작성해주세요</p>
              )
            }
            <p className="character_count">
              {titleCount}/20
            </p>
          </div>
        </div>


        <div className="input_box">
          <h4 className="tit">
            설명
          </h4>
          <textarea className="text_input" name="" id="" cols="30" rows="10" maxLength={99} onChange={event => CharacterCount(event, 'detail')}></textarea>

          <div className="input_sub">
            {
              explainNull && (
                <p className="invalid_msg">&#128397; 한글자 이상 작성해주세요</p>
              )
            }

            {
              explainOver && (
                <p className="invalid_msg">&#128546; 100자 이하로 작성해주세요 !</p>
              )
            }
            <p className="character_count">
              {explainCount}/100
            </p>
          </div>

        </div>
        <div className="floating_box">
          <button type="button" className="btn_submit" onClick={textCheck}>등록하기</button>
        </div>
      </div>


    </div>
  );
}
