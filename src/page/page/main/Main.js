import {memebookApi} from "./../../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom';
import {debounce} from 'lodash';
import {nationCheckData} from "./../../util/action/nationAction";
import {myWordListData, wordListData} from "./../../util/action/wordAction";
import {scrapListData} from "./../../util/action/scrapAction";
import {wordSearchData} from "./../../util/action/searchAction";
import {postCommentData} from "./../../util/action/communityAction";
import CountryChoice from "./../../modal/CountryChoice";
import NickName from "./../../modal/NickName";
import 'swiper/css';
import './../../scss/page/main/main.scss';
import OutsideHook from "../../util/OutsideHook";
import userIdxHigher from "../../components/UserIdxHigher";

const Main = ({userIdx}) => {
  const dispatch = useDispatch();
  const loginIdx = localStorage.getItem("memberIdx");

  // 검색
  const wordSearch = useSelector(state => state.meme.wordSearch);
  const [searchText, setSearchText] = useState('');
  const [searchState, setSearchState] = useState(false);
  // 단어 인기 리스트
  const wordList = useSelector(state => state.meme.wordList);
  // 내가 등록한 글 리스트
  const postList = useSelector(state => state.meme.postList);
  // 댓글 리스트
  const myCommentList = useSelector(state => state.meme.myCommentList);
  // 닉네임
  const [nickname, setNickname] = useState('');
  const [nicknameSave, setNicknameSave] = useState('');
  // 나라 선택
  const nationCheck = useSelector(state => state.meme.nationCheck);
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [studyCountryType, setStudyCountryType] = useState('');
  // 스크랩 리스트
  const scrapList = useSelector(state => state.meme.scrapList);
  // 내 단어 리스트
  const myWordList = useSelector(state => state.meme.myWordList);

  const [resultVisible, setResultVisible] = useState(false);

  // 검색어
  const resultRef = useRef(null);
  OutsideHook(resultRef, () => setResultVisible(false));

  useEffect(() => {
    dispatch(wordListData('1', loginIdx));
    dispatch(nationCheckData(loginIdx));
    dispatch(scrapListData(loginIdx));
    dispatch(myWordListData(loginIdx));
    dispatch(postCommentData(loginIdx));
    dispatch(postCommentData(loginIdx));
    setStudyCountryType(nationCheck.targetNation);
  }, [dispatch, userIdx, nationCheck.targetNation]);


  // 닉네임 설정 모달
  const nickNameClose = ({nickNameClose}) => {
    setNicknameModalOpen(!nicknameModalOpen);
    setNicknameSave(nickname);
    nickNamePost();
  }

  // 닉네임 입력
  const nickNameValue = (event) => {
    setNickname(event.target.value);
  }

  // 닉네임 설정
  async function nickNamePost() {
    try {
      await memebookApi().nickNameAddApi(nickname);
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  // 모달 열고 닫히기
  const countryChoiceClose = () => {
    setCountryModalOpen(!countryModalOpen);
  }

  const wordSearchKey = (event) => {
    if (event.key === 'Backspace') {
      if (event.target.value.length <= 0) {
        setSearchState(false);
      }
    }
  }
    // 단어 검색
  const wordSearchApi = debounce((event) => {
    const value = event.target.value;
    setSearchText(value);
    if (value.length <= 0) {
      setSearchState(false);
    } else {
      setSearchState(true);
      dispatch(wordSearchData(value));
    }
  }, 200);

  return (
    <>
      {
        countryModalOpen && (
          <CountryChoice countryChoiceClose={countryChoiceClose}></CountryChoice>
        )
      }
            {
        nicknameModalOpen && (
          <NickName nickNameAdd={nickNameClose} nickNameInput={nickNameValue}></NickName>
        )
      }


      <div className="main_wrap">

        <div className="container">
         <div className="main_top">
           <div className="main_country">
             <p className="main_tit">Let's Find Your Words!</p>
             {
               studyCountryType === '' && (
                 <span className="badge_country">언어 선택 하셨나요?</span>
               )
             }
             <button type="button" className={`user_country ${studyCountryType}`} onClick={countryChoiceClose}>
               <span className="blind">나라 선택</span>
             </button>
           </div>


           {
             nicknameSave && (
               <>{nicknameSave}님<br/></>
             )
           }
           <div className="search_box">
             <input type="text" className="text_input" placeholder="단어를 검색해보세요" onChange={wordSearchApi} onKeyDown={wordSearchKey}/>
             {
               searchState && (
                 <ul className="search_list" ref={resultRef}>
                   {
                     wordSearch?.wordList.length === 0 && (
                       <li className="list_none">
                         검색에 맞는 단어가 없어요
                       </li>
                     )
                   }
                   {
                     wordSearch?.wordList.length > 0 && wordSearch?.wordList.map((item, idx) => {
                       return (
                         <li key={idx}>
                           <Link to={`/vocabulary/wordInfo/${item.wordIdx}`}>
                             {item.wordName}
                           </Link>
                         </li>
                       )
                     })
                   }
                 </ul>
               )
             }
           </div>
         </div>

          {/*<div className="main_banner">*/}
          {/*  광고*/}
          {/*</div>*/}

          <div className="main_con">

            <div className="main_popular">
              <h3 className="popular_tit">💡 오늘 하루 인기 검색어 TOP </h3>
              <ul className="popular_list">
                <li>
                  <Link className="keyword">
                    이주희 멍청이
                  </Link>
                </li>
                <li>
                  <Link className="keyword">
                    강영민 멍청이
                  </Link>
                </li>
                <li>
                  <Link className="keyword">
                    박백홍 멍청이
                  </Link>
                </li>
                <li>
                  <Link className="keyword">
                    박백홍 방구쟁이
                  </Link>
                </li>
                <li>
                  <Link className="keyword">
                    강영민 방구쟁이
                  </Link>
                </li>
                <li>
                  <Link className="keyword">
                    이주희 방구쟁이
                  </Link>
                </li>
                <li>
                  <Link className="keyword">
                    쏙쏙쏙
                  </Link>
                </li>
                <li>
                  <Link className="keyword">
                    방울 빙글빙글
                  </Link>
                </li>
                <li>
                  <Link className="keyword">
                    방울
                  </Link>
                </li>
                <li>
                  <Link className="keyword">
                    여기저기 내 방울
                  </Link>
                </li>
                {
                  wordList.wordList?.slice(0, 10).map((item, idx) => {
                    return (
                      <li key={idx}>
                        <Link to={`/vocabulary/wordInfo/${item.wordIdx}`} className="keyword">
                          {item.wordName}
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>


            <div className="main_check">
              <h3 className="check_tit">📖 나의 히스토리 </h3>
              <ul className="check_list">
                <li className="list word">
                  <Link to="/profile/myWordList" className="link">
                    지금까지 <strong>3</strong>개의 단어에 참여했어요
                  </Link>
                </li>
                {
                  myWordList?.myWordList && (
                    <li className="list word">
                      {
                        myWordList.wordContentList?.length === 0 && (
                          <Link to="/profile/myWordList" className="link">
                            아직 등록한 단어가 없어요
                          </Link>
                        )
                      }
                      {
                        myWordList.wordContentList?.length > 0 && (
                          <Link to="/profile/myWordList" className="link">
                            지금까지 <strong>{myWordList.wordContentList?.length}</strong>개의 단어에 참여했어요
                          </Link>
                        )
                      }
                    </li>
                  )
                }

                {/* 스크랩한 단어 */}
                <li className="list scrap">
                  <Link to="/profile/scrapList" className="link">
                    지금까지 <strong>24</strong>개의 단어를 스크랩했어요
                  </Link>
                  {
                    scrapList.content?.length === 0 && (
                      <Link to="/profile/scrapList" className="link">
                        아직 스크랩한 단어가 없어요 &#128172;
                      </Link>
                    )
                  }
                  {
                    scrapList.content?.length > 0 && (
                      <Link to="/profile/scrapList" className="link">
                        지금까지 <strong>{scrapList.content?.length}</strong>개의 단어를 스크랩했어요
                      </Link>
                    )
                  }
                </li>

                {/* 작성한 글 */}
                <li className="list post">
                  <Link to="/profile/myPostList" className="link">
                    지금까지 <strong>101</strong>개의 글을 작성했어요
                  </Link>
                  {
                    postList.articleList?.length === 0 && (
                      <Link to="/profile/myPostList" className="link">
                        아직 작성한 글이 없어요 &#128172;
                      </Link>
                    )
                  }
                  {
                    postList.articleList?.length > 0 && (
                      <Link to="/profile/myPostList" className="link">
                        지금까지 <strong>{postList.articleList?.length}</strong>개의 글을 작성했어요
                      </Link>
                    )
                  }
                </li>

                {/* 작성한 댓글 */}
                <li className="list comment">
                  <Link to="/profile/myCommentList" className="link">
                    지금까지 <strong>111</strong>개의 댓글을 작성했어요
                  </Link>
                  {
                    myCommentList?.commentList.length === 0 && (
                      <Link to="/profile/myCommentList" className="link">
                        아직 작성한 댓글이 없어요 &#128172;
                      </Link>
                    )
                  }
                  {
                    myCommentList?.commentList.length > 0 && (
                      <Link to="/profile/myCommentList" className="link">
                        지금까지 <strong>{myCommentList?.commentList.length}</strong>개의 댓글을 작성했어요
                      </Link>
                    )
                  }
                </li>

                {/* 연속 방문 */}
                <li className="list visit">
                  <p className="link">
                    연속 방문 최대 <strong>12</strong>번을 달성했어요
                  </p>
                </li>

              </ul>
            </div>
          </div>

        </div>
      </div>

    </>
  );
}

export default userIdxHigher(Main);