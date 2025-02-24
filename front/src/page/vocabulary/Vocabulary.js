import {memebookApi} from "./../../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {wordListData, wordSortData} from "./../../util/action/wordAction";
import 'swiper/css';
import './../../scss/page/vocabulary/vocabulary.scss'
import userIdxHigher from "../../components/UserIdxHigher";

const Vocabulary = ({ userIdx }) => {
  const dispatch = useDispatch();
  // 단어 리스트
  const wordList = useSelector(state => state.meme.wordList);
  // 단어 정렬
  const wordSort = useSelector(state => state.meme.wordSort);
  // 단어 페이지
  const [pageNumber, setPageNumber] = useState(1);
  // 단어 리스트
  const [libraryData, setLibraryData] = useState([]);
  // 단어 탭
  const [libraryTab, setLibraryTab] = useState('ALL');
  // 국가
  const [nationName, setNationName] = useState('KOR');
  // 더보기 버튼
  const [moreBtnState, setMoreBtnState] = useState(true);
  // 로딩
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    async function vocaApi() {
      try {
        await dispatch(wordListData(pageNumber));
        console.log(wordList)
      } catch (error) {
        console.log(error)
      }
    }
    vocaApi();
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (wordList && wordList.wordList && pageNumber === 1) {
      setLibraryData(wordList.wordList);
      setLoadingState(false);
    }
    // 현재 페이지가 마지막 페이지가 아니라면 더보기 미노출
    if (wordList?.nowPage !== wordList?.totalPage) {
      setMoreBtnState(true);
    }
  }, [wordList]);

  async function pageClick(index){
    try {
      setPageNumber(index);
      const libraryApi = await memebookApi().wordListApi(index);
      setLibraryData(libraryApi.data.wordList);
      window.scrollTo(0, 0);
    } catch(error) {
      console.log(error)
    }
  }

  // 단어 정렬
  async function wordSortBtn(word) {
    try {
      setLibraryTab(word);
      setPageNumber(1);
      window.scrollTo(0, 0);
      dispatch(wordSortData(pageNumber, nationName, word));
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (wordSort && wordSort?.wordList) {
      setLibraryData(wordSort.wordList);
    }
  }, [wordSort]);

  return (
    <div className="voca_wrap">
      <div className="container">

        {/* 타이틀 */}
        <div className="voca_top">
          <h2 className="voca_tit">&#128214;&nbsp;&nbsp;단어장</h2>
          <div className="voca_box">
            <Link to="/vocabulary/wordAdd" className="btn_add_word">
              <span>단어 등록하기</span>
            </Link>
          </div>
        </div>

        {/* 리스트 */}
        <div className="voca_con">
          <Swiper
            slidesPerView='auto'
            className="tab_box"
          >
            <SwiperSlide className={`tab_item ${libraryTab === 'ALL' ? 'active' : ''}`}>
              <button type="button" className="item" onClick={() => wordSortBtn('ALL')}>&#128218;&nbsp;&nbsp;전체</button>
            </SwiperSlide>
            <SwiperSlide className={`tab_item ${libraryTab === 'LIKE' ? 'active' : ''}`}>
              <button type="button" className="item" onClick={() => wordSortBtn('LIKE')}>&#128077;&nbsp;&nbsp;좋아요순</button>
            </SwiperSlide>
            <SwiperSlide className={`tab_item ${libraryTab === 'DISLIKE' ? 'active' : ''}`}>
              <button type="button" className="item" onClick={() => wordSortBtn('DISLIKE')}>&#128078;&nbsp;&nbsp;싫어요순</button>
            </SwiperSlide>
            <SwiperSlide className={`tab_item ${libraryTab === 'LATEST' ? 'active' : ''}`}>
              <button type="button" className="item" onClick={() => wordSortBtn('LATEST')}>&#127775;&nbsp;&nbsp;최신순</button>
            </SwiperSlide>
          </Swiper>

          <p className="voca_desc">
            총 {wordList?.totalCount ?? 0} 개
          </p>

          <ul className="voca_list">
            <li className="list_item">
              <Link to={`/vocabulary/wordInfo/`} className="link">빨주노초파남보</Link>
              <span className="content_count">
                3
              </span>
            </li>
            <li className="list_item">
              <Link to={`/vocabulary/wordInfo/`} className="link">데이터를 뿌려주세요</Link>
              <span className="content_count">
                10
              </span>
            </li>
            <li className="list_item">
              <Link to={`/vocabulary/wordInfo/`} className="link">데이터가 없어요</Link>
              <span className="content_count">
                1
              </span>
            </li>
            <li className="list_item">
              <Link to={`/vocabulary/wordInfo/`} className="link">여긴 어디죠</Link>
              <span className="content_count">
                1
              </span>
            </li>
            <li className="list_item">
              <Link to={`/vocabulary/wordInfo/`} className="link">여기 사람있어요</Link>
              <span className="content_count">
                8
              </span>
            </li>
          </ul>

          { libraryData === undefined && loadingState && (
              <div className="loading_box">
                로딩중
              </div>
            )
          }

          {/*{ libraryData.length === 0 && (*/}
          {/*    <div className="none_box">*/}
          {/*      등록된 단어가 없어요*/}
          {/*    </div>*/}
          {/*  )*/}
          {/*}*/}

          {
            libraryData && !loadingState && libraryData.length !== 0 && (
              <ul className="voca_list">
                {
                  libraryData?.map((item, idx) => {
                    return (
                      <li className="list_item" key={idx}>
                        <Link to={`/vocabulary/wordInfo/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                        <span className="content_count">
                              {item.wordContentCount}
                          </span>
                      </li>
                    )
                  })
                }
              </ul>
            )
          }

          <div className="pagination_box">
            {Array.from({ length: wordList?.totalPage }, (_, index) => (
              <button key={index} onClick={() => pageClick(index + 1)} type="button" className={`page ${pageNumber === index + 1? 'active' : ''}`}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default userIdxHigher(Vocabulary);