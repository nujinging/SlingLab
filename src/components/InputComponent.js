import '../scss/components/inputComponent.scss'
import {useEffect, useState} from "react";

export default function InputComponent(props) {
  const [titleValue, setTitleValue] = useState('');
  const [titleCount, setTitleCount] = useState(0);
  const [titleOver, setTitleOver] = useState(false);
  const [titleNull, setTitleNull] = useState(false);

  useEffect(() => {
    if (props.word) {
      setTitleValue(props.word)
    }
  }, []);

  const titleValueCheck = (event) => {
    setTitleValue(event.target.value);
    setTitleCount(event.target.value.length);
    event.target.value.length >= props.length - 1 ? setTitleOver(true) : setTitleOver(false)
    setTitleNull(false);
    if (props.titleValueCheck) {
      props.titleValueCheck(event.target.value);
    }
  }
  return (
    <>
      <input type="text" className="text_input" placeholder="단어를 입력해주세요" value={titleValue} maxLength={props.length - 1} onChange={titleValueCheck} />

      <div className="input_sub">
        {
          titleNull && (
            <p className="invalid_msg">&#128397; 한글자 이상 작성해주세요</p>
          )
        }
        {
          titleOver && (
            <p className="invalid_msg">&#128546; {props.length}자 이하로 작성해주세요</p>
          )
        }
        {
          props.length && (
            <p className="character_count">
              {titleCount}/{props.length}
            </p>
          )
        }

      </div>
    </>
  )
}
