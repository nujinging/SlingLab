import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {scrapDeleteData, scrapListData} from "./../../util/action/scrapAction";
import Title from "./../../components/Title";
import './../../scss/page/profile/scrapeList.scss'
import userIdxHigher from "../../components/UserIdxHigher";

const MyScrapeList = ({ userIdx }) => {
  const dispatch = useDispatch();
  // 스크랩 리스트
  const scrapList = useSelector(state => state.meme.scrapList);
  // 스크랩 상태
  const [scrapState, setScrapState] = useState(false);
  // 리스트 선택
  const [deleteListCheck, setDeleteListCheck] = useState([]);
  // 페이지 넘버 더보기
  const [pageNumber, setPageNumber] = useState(1);

  // 스크랩 리스트 Api
  useEffect(() => {
    async function scrapeApi() {
      try {
        if (userIdx !== undefined) {
          dispatch(scrapListData(userIdx));
          setPageNumber(scrapList.totalPage);
        }
      } catch (error) {
        console.log(error)
      }
    }
    scrapeApi();
  }, [scrapState, userIdx]);

  // 리스트 선택
  const checkAction = (wordIdx) => {
    setDeleteListCheck([...deleteListCheck, wordIdx]);
    console.log(deleteListCheck);
  }


  // 설명 삭제
  async function scrapDeleteApi(scrapIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        dispatch(scrapDeleteData(scrapIdx));
        setScrapState(!scrapState);
        alert('삭제');
      }
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  return (
    <div className="layer_wrap scrap_list_wrap">

      <Title title="스크랩한 단어" type="back"></Title>

      <div className="container">

        <div className="list_top">
          <span className="txt">
            총 {scrapList?.totalElements} 개
          </span>
        </div>

        {
          scrapList.content?.length === 0 && (
            <div className="content_none list">
              <p>
                스크랩한 단어가 없어요 &#128172;
              </p>
              <Link to="/vocabulary" className="btn_primary_line size_m">
                단어 구경하러 가기
              </Link>
            </div>
          )
        }

        {
          scrapList.content?.length > 0 && (
            <ul className="list_box">
              {
                scrapList.content?.map((item, idx) => {
                  return (
                    <li className="list_item" key={idx}>
                       <span className="check_box">
                          <label htmlFor="all_delete">
                            <input type="checkbox" id="all_delete"/>
                            <span className="blind">전체 삭제</span>
                          </label>
                        </span>
                      <span className="check_box" onClick={() => checkAction(item.wordIdx)}>
                        <input type="checkbox" id="scrap_all_check" name="scrap_all_check"/>
                        <label htmlFor="scrap_all_check" className="blind">삭제</label>
                      </span>
                      <Link to={`/vocabulary/wordInfo/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                      <button type="button" className="btn_delete" onClick={() => scrapDeleteApi(item.scrapIdx)}>
                        <span className="blind">스크랩 삭제</span>
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          )
        }

        {
          pageNumber >= 2 && (
            <div className="list_btm">
              <button type="button" className="btn_primary size_s">더보기</button>
            </div>
          )
        }

      </div>

    </div>
  );
}

export default userIdxHigher(MyScrapeList);