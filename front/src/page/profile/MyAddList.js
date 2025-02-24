import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {myWordListData, wordDeleteData} from "./../../util/action/wordAction";
import Title from "./../../components/Title";
import './../../scss/page/profile/myAddList.scss'
import userIdxHigher from "../../components/UserIdxHigher";
import {memebookApi} from "../../util/memebookApi";

const MyAddList = ({ userIdx }) => {
  const dispatch = useDispatch();
  const loginToken = localStorage.getItem("memberIdx");
  // 단어 리스트
  const myWordList = useSelector(state => state.meme.myWordList);
  const [wordData, setWordData] = useState([]);
  // 삭제 상태
  const [deleteState, SetDeleteState] = useState(false);
  // 페이지 넘버 더보기
  const [pageNumber, setPageNumber] = useState(1);
  // 더보기 버튼
  const [moreBtnState, setMoreBtnState] = useState(true);

  // 단어 리스트 Api
  useEffect(() => {
    async function wordAddListApi() {
      try {
        if (loginToken !== undefined) {
          dispatch(myWordListData(loginToken));
          setPageNumber(myWordList?.totalPage);
          console.log(loginToken)
        }
      } catch (error) {
        console.log(error)
      }
    }
    wordAddListApi();
  }, [deleteState, loginToken]);

  // 설명 삭제
  async function myAddWordDelete(wordContentIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        dispatch(wordDeleteData(wordContentIdx));
        SetDeleteState(!deleteState);
        alert('삭제');
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (myWordList && myWordList.wordContentList && pageNumber === 1) {
      setWordData(myWordList.wordContentList);
    }
    // 현재 페이지가 마지막 페이지가 아니라면 더보기 미노출
    if (myWordList?.nowPage !== myWordList?.totalPage) {
      setMoreBtnState(true);
    }
  }, [myWordList]);
  async function pageClick(index){
    try {
      setPageNumber(index);
      const libraryApi = await memebookApi().myWordListApi(loginToken, pageNumber);
      setWordData(libraryApi.data.wordList);
      window.scrollTo(0, 0);
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="layer_wrap my_word_wrap">

      <Title title="참여한 단어" type="back"></Title>

      <div className="container">

        <div className="my_list_top">
          <span className="txt">
            총 {myWordList.totalCount} 개
          </span>
          <span className="check_box">
            <input type="checkbox"/>
            <label htmlFor="">전체 삭제</label>
          </span>
        </div>

        {
          myWordList.wordContentList?.length === 0 && (
            <div className="content_none list">
              <p>
                참여한 단어가 없어요 &#128172;
              </p>
              <Link to="/vocabulary" className="btn_primary_line size_m">
                단어 구경하러 가기
              </Link>
            </div>
          )
        }

        {
          myWordList.wordContentList?.length > 0 && (
            <ul className="my_list_box">
              {
                myWordList.wordContentList?.map((item, idx) => {
                  return (
                    <li className="list_item" key={idx}>
                      <Link to={`/vocabulary/wordInfo/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                      <button type="button" className="btn_delete" onClick={() => myAddWordDelete(item.wordContentIdx)}>
                        <span className="blind">스크랩 삭제</span>
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          )
        }

        <div className="pagination_box">
          {Array.from({ length: myWordList?.totalPage }, (_, index) => (
            <button key={index} onClick={() => pageClick(index + 1)} type="button" className={`page ${pageNumber === index + 1? 'active' : ''}`}>
              {index + 1}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}

export default userIdxHigher(MyAddList);