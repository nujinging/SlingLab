import {memebookApi} from "./../../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect, useRef} from "react";
import {Link} from 'react-router-dom';
import {useParams} from "react-router-dom";
import {scrapAddData, scrapDeleteData} from "./../../util/action/scrapAction";
import CommentPort from "./../../modal/CommentPort";
import BtnBack from "./../../components/BtnBack";
import './../../scss/page/vocabulary/wordInfo.scss'
import AddComponent from "../../components/AddComponent";
import OutsideHook from "../../util/OutsideHook";
import userIdxHigher from "../../components/UserIdxHigher";

const WordInfo = ({ userIdx }) => {
  let {id} = useParams();
  const dispatch = useDispatch();

  // 단어 데이터
  const [wordData, setWordData] = useState([]);
  const [wordListData, setWordListData] = useState([]);
  // 좋아요, 싫어요
  const [likeState, setLikeState] = useState(false);
  const [dislikeState, setDislikeState] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  // 스크랩
  const [scrapData, setScrapData] = useState('');
  const scrapAdd = useSelector(state => state.meme.scrapAdd);
  const scrapDelete = useSelector(state => state.meme.scrapDelete);
  // 수정하기
  const [addState, setAddState] = useState(false);
  // 수정하기
  const [modifyState, setModifyState] = useState(false);
  const [modifyContent, setModifyContent] = useState('');
  // 단어 삭제
  const [deleteState, setDeleteState] = useState(false);
  // 신고하기
  const [reportOpen, setReportOpen] = useState(false);

  // 클릭영역 외
  const [wordSetState, setWordSetState] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const setRef = useRef(null);
  OutsideHook(setRef, () => setIsVisible(false));

  // 신고하기 팝업
  const commentReportOpen = ({commentPortClose}) => {
    setReportOpen(!reportOpen);
    setWordSetState(false);
  }

  // 단어 Api
  useEffect(() => {
    async function wordDetailApi() {
      try {
        if (userIdx !== undefined) {
          const wordDetailData = await memebookApi().wordDetailApi(id, '123');
          setWordData(wordDetailData.data);
          setScrapData(wordDetailData.data.scrapIdx);
          setWordListData(wordDetailData.data.wordContentList);
        }
      } catch (error) {
        console.log(error)
      }
    }

    wordDetailApi();
  }, [modifyState, setScrapData, deleteState, userIdx, id, addState]);


  // 좋아요/싫어요 update Api
  useEffect(() => {
    async function wordReactionApi() {
      try {
        const wordReactionCountData = await memebookApi().wordReactionCountApi(id);
        setLikeCount(wordReactionCountData.data.likeCount);
        setDislikeCount(wordReactionCountData.data.dislikeCount);
      } catch (error) {
        console.log(error);
      }
    }

    wordReactionApi();
  }, [likeState, dislikeState, id]);

  // 좋아요/싫어요 button Api
  async function wordReaction(type) {
    try {
      if (type === 'like') {
        setLikeState(true);
        setDislikeState(false);
        await memebookApi().wordReactionUpdateApi({
          "reactionType": "LIKE",
          "memberIdx": '123',
          "wordIdx": id,
        });

      } else if (type === 'dislike') {
        setLikeState(false);
        setDislikeState(true);
        await memebookApi().wordReactionUpdateApi({
          "reactionType": "DISLIKE",
          "memberIdx": '123',
          "wordIdx": id,
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 스크랩 버튼
  async function ScrapeBtn() {
    try {
      if (!scrapData) {
        dispatch(scrapAddData(id, userIdx));
      } else {
        dispatch(scrapDeleteData(scrapData));
      }
      setScrapData(!scrapData);
    } catch (error) {
      console.log(error)
    }
  }

  // 수정하기
  const wordSet = (idx) => {
    setWordSetState(idx);
    setIsVisible(!isVisible);
  }

  // 수정하기
  const modifyAction = (idx, content) => {
    setModifyState(idx);
    setWordSetState(false);
    setModifyContent(content);
  }
  // 수정된 단어
  const contentChange = (event) => {
    setModifyContent(event.target.value);
  }

  // 수정된 내용 put Api
  async function wordModify() {
    try {
      await memebookApi().wordModifyApi({
        "wordIdx": wordListData[0].wordIdx,
        "wordName": wordListData[0].content,
        "wordContent": modifyContent,
        "wordNation": "KOR",
        "memberIdx": userIdx,
      });

      setModifyState(false);
    } catch (error) {
      console.log(error);
    }
  }

  // 설명 삭제
  async function wordDelete(wordContentIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await memebookApi().wordDeleteApi(wordContentIdx);
        setDeleteState(true);
      }
      setWordSetState(false);
    } catch (error) {
      console.log(error);
    }
  }

  const [contentValue, setContentValue] = useState(false);
  const contentValueCheck = (length) => {
    setContentValue(length);
  }

  const addStateCheck = (state) => {
    setAddState(!addState);
  }

  const propsToSend = {
    type: "word",
    length: 100
  }

  return (
    <div className="word_info_wrap">

      <div className="container">
        <BtnBack></BtnBack>
        {
          reportOpen && (
            <CommentPort commentPortClose={commentReportOpen}></CommentPort>
          )
        }
        <div className="info_top">

          <h1 className="word_tit">
            {wordData?.wordName}
          </h1>

        </div>

        <div className="info_desc">

          <span className="list_count">
              총 {wordListData?.length}개
            </span>
          {
            wordListData?.userIdx !== userIdx && (
              <button type="button" className={`btn_scrap ${scrapData ? 'active' : ''}`} onClick={ScrapeBtn}>
                <span className="blind">스크랩</span>
              </button>
            )
          }
        </div>

        <ul className="info_list">
          {
            wordListData?.map((item, idx) => {
              return (
                <li className="list" key={idx}>
                  <div className="mean_top">
                    <Link to={`/profile/${userIdx}`} className="name">김누징</Link>
                    <ul className="util_list">
                      <li>
                        <button type="button" className={`btn_like ${likeState ? 'active' : ''}`} onClick={() => {
                          wordReaction('like')
                        }}>
                          <span className="blind">좋아요</span>
                        </button>
                        <span className="count">
                              {likeCount}
                            </span>
                      </li>
                      <li>
                        <button type="button" className={`btn_dislike ${dislikeState ? 'active' : ''}`} onClick={() => {
                          wordReaction('dislike')
                        }}>
                          <span className="blind">싫어요</span>
                        </button>
                        <span className="count">
                              {dislikeCount}
                            </span>
                      </li>

                      <li>
                        <button type="button" className="btn_set" onClick={()=> wordSet(idx)}>
                          <span className="blind">유저 셋</span>
                        </button>
                        {
                          isVisible && wordSetState === idx && (
                            <>
                              <ul className="set_box" ref={setRef}>
                                {
                                  item.memberIdx === userIdx ? (
                                    <>
                                      <li>
                                        <button type="button" className="" onClick={() => modifyAction(idx, item.content)}>
                                          <span className="">수정</span>
                                        </button>
                                      </li>
                                      <li>
                                        <button type="button" className="" onClick={() => {
                                          wordDelete(item.wordContentIdx)
                                        }}>
                                          <span className="">삭제</span>
                                        </button>

                                      </li>
                                    </>
                                  ) : (
                                    <li>
                                      <button type="button" className="" onClick={commentReportOpen}>
                                        <span>신고하기</span>
                                      </button>
                                    </li>
                                  )
                                }
                              </ul>
                            </>
                          )
                        }
                      </li>



                    </ul>
                  </div>
                  <div className="mean_con">

                    {
                      modifyState !== idx ? (
                        <p className="word_txt">{item.content}</p>
                      ) : (
                        <>
                                  <textarea
                                    className="mean_txt"
                                    maxLength={101}
                                    value={modifyContent}
                                    onChange={(event) => contentChange(event, idx)}
                                  >
                                  </textarea>
                          <div className="input_sub">
                            {
                              modifyContent.length === 0 && (
                                <p className="invalid_msg">&#128397; 한글자 이상 작성해주세요</p>
                              )
                            }
                            {
                              modifyContent.length >= 101 && (
                                <p className="invalid_msg">&#128546; 100자 이하로 작성해주세요 !</p>
                              )
                            }
                            <p className="character_count">
                              {modifyContent.length}/100
                            </p>
                          </div>

                          <button type="button" className="btn_modify" disabled={modifyContent.length === 0 || modifyContent.length >= 101}
                                  onClick={() => wordModify(item.wordContentIdx)}>
                            수정
                          </button>
                        </>
                      )
                    }

                  </div>
                </li>

              )
            })
          }

        </ul>

        <AddComponent {...propsToSend}
                      wordName={wordData?.wordName}
                      addSubmit={addStateCheck}
                      contentValueCheck={contentValueCheck}>
        </AddComponent>

      </div>

    </div>
  );
}
export default userIdxHigher(WordInfo);