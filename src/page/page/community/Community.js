import {useDispatch, useSelector} from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {postListData, postSortData} from "../../util/action/communityAction";
import './../../scss/page/community/community.scss'
import userIdxHigher from "../../components/UserIdxHigher";
import {wordSortData} from "../../util/action/wordAction";

const Community = ({ userIdx }) => {
  const dispatch = useDispatch();
  const postList = useSelector(state => state.meme.postList);
  const [postReactionState, setPostReactionState] = useState(false);
  // 글 리스트
  const [postData, setPostData] = useState([]);
  // 글 탭
  const [libraryTab, setLibraryTab] = useState('recent');
  // 단어 페이지
  const [pageNumber, setPageNumber] = useState(1);
  // 로딩
  const [loadingState, setLoadingState] = useState(true);

  // 포스트 Api
  useEffect(() => {
    async function postListApi() {
      try {
        await dispatch(postListData(pageNumber));
        console.log(postList)
      } catch (error) {
        console.log(error);
      }
    }
    postListApi();
  }, [dispatch]);

  // 글 정렬
  async function postSortBtn(tab) {
    try {
      setLibraryTab(tab);
      setPageNumber(1);
      window.scrollTo(0, 0);
      dispatch(postSortData(pageNumber, tab));
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (postList && postList.articleList) {
      setPostData(postList.articleList)
      setLoadingState(false);
    }
  }, [postList]);

  const postReaction = () => {
    setPostReactionState(!postReactionState)
  }

  const pageClick = (index) => {
    setPageNumber(index);
  }

  return (
    <div className="community_wrap">
        <div className="container">

          {/* 타이틀 */}
          <div className="commu_top">
            <h2 className="commu_tit">&#128214;&nbsp;&nbsp;커뮤니티</h2>
            <div className="commu_box">
              <Link to={`/community/postAdd`} className="btn_add_post">
                <span>글쓰기</span>
              </Link>
            </div>
          </div>

          {/* 리스트 */}
          <div className="commu_con">
            <Swiper slidesPerView='auto' className="tab_box">
              <SwiperSlide className={`tab_item ${libraryTab === 'recent' ? 'active' : ''}`}>
                <button type="button" className="item" onClick={() => postSortBtn('recent')}>&#127775;&nbsp;&nbsp;최신</button>
              </SwiperSlide>
              <SwiperSlide className={`tab_item ${libraryTab === 'question' ? 'active' : ''}`}>
                <button type="button" className="item" onClick={() => postSortBtn('question')}>&#128400;&nbsp;&nbsp;단어 질문</button>
              </SwiperSlide>
              <SwiperSlide className={`tab_item ${libraryTab === 'trend' ? 'active' : ''}`}>
                <button type="button" className="item" onClick={() => postSortBtn('trend')}>&#128640;&nbsp;&nbsp;요즘 유행</button>
              </SwiperSlide>
              <SwiperSlide className={`tab_item ${libraryTab === 'culture' ? 'active' : ''}`}>
                <button type="button" className="item" onClick={() => postSortBtn('culture')}>&#128640;&nbsp;&nbsp;문화 이슈</button>
              </SwiperSlide>
              <SwiperSlide className={`tab_item ${libraryTab === 'kPop' ? 'active' : ''}`}>
                <button type="button" className="item" onClick={() => postSortBtn('kPop')}>&#128640;&nbsp;&nbsp;K-POP</button>
              </SwiperSlide>
              <SwiperSlide className={`tab_item ${libraryTab === 'kDrama' ? 'active' : ''}`}>
                <button type="button" className="item" onClick={() => postSortBtn('kDrama')}>&#128640;&nbsp;&nbsp;K-DRAMA</button>
              </SwiperSlide>
              <SwiperSlide className={`tab_item ${libraryTab === 'meme' ? 'active' : ''}`}>
                <button type="button" className="item" onClick={() => postSortBtn('meme')}>&#128640;&nbsp;&nbsp;MEME</button>
              </SwiperSlide>
            </Swiper>

            <p className="commu_desc">
              총 {postList.totalCount ?? 0} 개
            </p>

            <ul className="commu_list">
              <li>
                <div className="post_item">
                  <Link to={`/community/postDetail/`} className="post_link">
                    <div className="post_top">
                      <h3 className="post_tit">가끔 진짜 너무 기본적인 단어인데 모르고있던 경우가 있음...</h3>
                      <div className="post_desc">
                        <span className="post_nickname">박백홍콩콩</span>
                        <span className="post_date">25.01.22</span>
                      </div>
                    </div>
                    <p className="post_con">
                      일본생활 2년정도 하다가 왔는데 전에 일본인이랑 대화하다가 계란후라이라는 단어를 몰라서 타마고후라이? 타마고야끼? 말하다가 얼타서 핸드폰 검색하고 그때 메다마야끼라는 단어를 처음 봄...<br/>
                      사실 언젠가 본적은 있겠지만 뇌에 안남아있었을듯<br/>
                      이렇게 진짜 기본적인 단어들 모르는것만 쏙쏙 빼서 공부할 수도 없고 그렇다고 어린이책부터 볼수도 없고 참 난감한 경우가 가끔 있는듯
                    </p>
                  </Link>
                  <div className="post_reaction">
                    <button type="button" className={`btn_post_like ${postReactionState ? 'active' : ''}`} onClick={postReaction}>
                      <span className="blind">좋아요</span>
                    </button>
                    <Link to={`/community/postDetail/`} className="reaction_link reaction_comment">
                      <span className={`txt_count`}>23</span>
                    </Link>
                    <Link to={`/community/postDetail/`} className="reaction_link reaction_view">
                      <span className="blind">조회수</span>
                    </Link>
                  </div>
                </div>
              </li>

              <li>
                <div className="post_item">
                  <Link to={`/community/postDetail/`} className="post_link">
                    <div className="post_top">
                      <h3 className="post_tit">일갤에서 일본어가 어려운 언어라고 자꾸 강변하는 이유</h3>
                      <div className="post_desc">
                        <span className="post_nickname">박백홍콩콩</span>
                        <span className="post_date">25.01.22</span>
                      </div>
                    </div>
                    <p className="post_con">
                      여기서 하루죙일 서식하는 넘들의 과반 이상이 일본어 조금 할 줄 아는 거 빼곤 인생에서 이룬 게 없기 때문
                      JLPT N1가 일갤앰생들 최대 업적이라 그럼
                      그래서 그게 별거 아닌걸로 취급되는 걸 못 견디는 것임
                    </p>
                  </Link>
                  <div className="post_reaction">
                    <button type="button" className={`btn_post_like ${postReactionState ? 'active' : ''}`} onClick={postReaction}>
                      <span className="blind">좋아요</span>
                    </button>
                    <Link to={`/community/postDetail/`} className="reaction_link reaction_comment">
                      <span className={`txt_count`}>0</span>
                    </Link>
                    <Link to={`/community/postDetail/`} className="reaction_link reaction_view">
                      <span className="blind">조회수</span>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>

            { postData === undefined && loadingState && (
              <div className="loading_box">
                로딩중
              </div>
              )
            }

            {/*{ postData.length === 0 && (*/}
            {/*    <div className="none_box">*/}
            {/*      작성된 글이 없어요*/}
            {/*    </div>*/}
            {/*  )*/}
            {/*}*/}

            {
              !loadingState && postList && postData.length !== 0 && (
                <ul className="commu_list">
                  {/* 포스트 */}
                  {
                    postList.articleList?.map((item, idx) => {
                      return (
                        <li key={idx}>
                          <div className="post_item">
                            <Link to={`/community/postDetail/${item.articleIdx}`} className="post_link">
                              <div className="post_top">
                                <h3 className="post_tit">{item.articleTitle}</h3>
                                <span className="post_nickname">맛보돈{item.memberNickname}</span>
                                <span className="post_date">{item.regDtm}</span>
                              </div>

                              <p className="post_con">{item.articleContent}</p>

                            </Link>


                            <div className="post_reaction">
                              <button type="button" className={`btn_post_like ${postReactionState ? 'active' : ''}`} onClick={postReaction}>
                                <span className="blind">좋아요</span>
                              </button>
                              <Link to={`/community/postDetail/${item.articleIdx}`} className="reaction_link reaction_comment">
                                <span className={`txt_count ${item.commentCount === 0 ? 'blind' : ''}`}>{item.commentCount === 0 ? '댓글' : item.commentCount}</span>
                              </Link>
                              <Link to={`/community/postDetail/${item.articleIdx}`} className="reaction_link reaction_view">
                                <span className="blind">조회수</span>
                              </Link>
                            </div>
                          </div>

                        </li>
                      )
                    })
                  }
                </ul>
              )
            }


            <div className="pagination_box">
              {Array.from({ length: postList?.totalPage }, (_, index) => (
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

export default userIdxHigher(Community);