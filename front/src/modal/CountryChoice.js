import '../scss/modal/countryChoice.scss'
import { useDispatch, useSelector } from 'react-redux';
import {nationCheckData} from "../util/action/nationAction";
import {useEffect, useState} from "react";
import {memebookApi} from "../util/memebookApi";
import userIdxHigher from "../components/UserIdxHigher";

const CountryChoice = ({ countryChoiceClose, userIdx }) => {
  const dispatch = useDispatch();
  const nationCheck = useSelector(state => state.meme.nationCheck);
  dispatch(nationCheckData(userIdx));

  // 모국어
  const [originNationCheck, setOriginNationCheck] = useState('');
  const [originNationTxt, setOriginNationTxt] = useState('');
  // 선택한 언어
  const [targetNationCheck, setTargetNationCheck] = useState('');
  const [targetNationTxt, setTargetNationTxt] = useState('');

  useEffect(() => {
    setOriginNationCheck(nationCheck.originNation);
    setOriginNationTxt(nationCheck.originNation);
    setTargetNationCheck(nationCheck.targetNation);
    setTargetNationTxt(nationCheck.targetNation);
  }, [dispatch, userIdx]);

  // 모국어
  const nativeCountryChange = (type) => {
    setOriginNationCheck(type);
    setOriginNationTxt(type);
  }

  // 선택한 언어
  const studyCountryChange = (type) => {
    setTargetNationCheck(type);
    setTargetNationTxt(type);
  }

  async function countrySave() {
    try {
      await memebookApi().nationModifyApi({
        "memberIdx": userIdx,
        "originNation": originNationCheck,
        "targetNation": targetNationCheck,
      });
      countryChoiceClose();
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  return (
    <div className="modalBox">
      <div className="inner">
        <h2 className="title">언어를 선택해주세요</h2>
        <button type="button" className="btn_close">
          <span className="blind">닫기</span>
        </button>
        <div className="country_state">
          <div className="state_box">
            <h5 className="country_txt">모국어</h5>

            {/* 선택된 언어 */}
            <div className={`state ${originNationCheck}`}>
              <span className="blind">모국어/native language</span>
            </div>

            {/* 언어 이름 */}
            <span className="txt">
              {
                originNationTxt === 'KOR' ? '한국' :
                  originNationTxt === 'JPN' ? '일본' :
                    originNationTxt === 'ENG' ? '미국' :
                      '없음'
              }
            </span>

            {/* 언어 리스트 */}
            <ul className="country_list">
              <li>
                <button type="button" className="state korean" onClick={() => nativeCountryChange('KOR')}>
                  <span className="blind">모국어/native language</span>
                </button>

              </li>
              <li>
                <button type="button" className="state english" onClick={() => nativeCountryChange('ENG')}>
                  <span className="blind">모국어/native language</span>
                </button>
              </li>
              <li>
                <button type="button" className="state japanese" onClick={() => nativeCountryChange('JPN')}>
                  <span className="blind">모국어/native language</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="state_box">
            <h5 className="country_txt">학습할 언어</h5>

            {/* 선택된 언어 */}
            <div className={`state ${targetNationCheck}`}>
              <span className="blind">학습할 언어/study language</span>
            </div>

            {/* 언어 이름 */}
            <span className="txt">
              {
                targetNationTxt === 'KOR' ? '한국' :
                  targetNationTxt === 'JPN' ? '일본' :
                    targetNationTxt === 'ENG' ? '미국' :
                      '없음'
              }
            </span>

            {/* 언어 리스트 */}
            <ul className="country_list">
              <li>
                <button type="button" className="state korean" onClick={() => studyCountryChange('KOR', '한국')}>
                  <span className="blind">모국어/native language</span>
                </button>
              </li>
              <li>
                <button type="button" className="state english" onClick={() => studyCountryChange('ENG', '미국')}>
                  <span className="blind">모국어/native language</span>
                </button>
              </li>
              <li>
                <button type="button" className="state japanese" onClick={() => studyCountryChange('JPN', '일본')}>
                  <span className="blind">모국어/native language</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <p className="country_notice">학습할 언어를 기반으로<br/>단어 등록 및 사전 세팅이 되어요</p>
        <div className="btn_btm">
          <button type="button" className="country_save" onClick={countrySave}>저장</button>
        </div>
        <button type="button" className="btn_close" onClick={countryChoiceClose}>
          <span className="blind">닫기</span>
        </button>
      </div>
    </div>
  )
}

export default userIdxHigher(CountryChoice);