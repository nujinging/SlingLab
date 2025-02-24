import {memebookApi} from "./../../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {postDetailData, postListData} from "./../../util/action/communityAction";
import './../../scss/page/community/postInfo.scss'
import OutsideHook from "../../util/OutsideHook";
import AddComponent from "../../components/AddComponent";
import userIdxHigher from "../../components/UserIdxHigher";

const PostInfo = ({ userIdx }) => {
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postDetail = useSelector(state => state.meme.postDetail);
  const postList = useSelector(state => state.meme.postList);
  const loginToken = localStorage.getItem("memberIdx");
  // 글 좋아요
  const [postReactionState, setPostReactionState] = useState(false);
  // 댓글 클릭영역 외
  const [textareaActive, setTextareaActive] = useState(false);
  const textRef = useRef(null);
  OutsideHook(textRef, () => setTextareaActive(false));
  // 셋업 클릭영역 외
  const [isVisible, setIsVisible] = useState(false);
  const sideRef = useRef(null);
  OutsideHook(sideRef, () => setIsVisible(false));
  // 댓글
  const [commentIdx, setCommentIdx] = useState();
  const [commentState, setCommentState] = useState(false);
  // 대댓글
  const [replyIdx, setReplyIdx] = useState('');
  const [replyNickname, setReplyNickname] = useState('');
  // 댓글 상태
  const [addState, setAddState] = useState(false);
  // 글 리스트
  const [postData, setPostData] = useState([]);
  // 댓글 등록 시 재랜더링
  const addStateCheck = (state) => {
    setAddState(state);
  }

  // 글 상세 Api
  useEffect(() => {
    async function postDetailApi() {
      try {
        await dispatch(postDetailData(id.id));
        await dispatch(postListData());
      } catch (error) {
        console.log(error)
      }
    }
    postDetailApi();
  }, [addState, commentState, dispatch, id.id]);

  useEffect(() => {
    if (postList && postList.articleList) {
      setPostData(postList.articleList);
    }
  }, [postList]);
  // 글 삭제하기
  async function postDeleteData(articleIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await memebookApi().postDeleteApi(articleIdx, userIdx);
        window.history.back();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 댓글 삭제하기
  async function commentDeleteData(commentIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await memebookApi().commentDeleteApi(commentIdx, userIdx);
        setCommentState(!commentState);
        console.log(commentIdx)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 제목, 설명 - 글 수정하기 페이지로 데이터 전달
  const postModifyToPage = () => {
    navigate(`/community/postAdd/${id.id}`, {
      state: {
        title: postDetail?.articleTitle,
        content: postDetail?.articleContent
      }
    });
  };

  // 답글 달기 - 닉네임 추가
  const commentReplyData = (nickname, commentIdx, upperIdx) => {
    setReplyNickname(nickname);
    setReplyIdx(upperIdx);
    setCommentIdx(commentIdx);
  }

  // 닉네임 다시 클릭하면 데이터 제거
  const replayNicknameDelete = () => {
    setReplyNickname('');
    setCommentIdx(0);
  };

  // 글 좋아요
  const postReaction = () => {
    setPostReactionState(!postReactionState)
  }

  // 툴팁 열기
  const wordSet = () => {
    setIsVisible(!isVisible);
  }

  // 댓글 컴포넌트에 데이터 보내기
  const propsToSend = {
    type: "community",
    length: 100,
    articleIdx : id.id,
    replyNickname : replyNickname,
    replyIdx : replyIdx,
    commentIdx : commentIdx
  };


  return (
    <div className="post_wrap">
      <div className="container">

        {/* 포스트 */}
        <div className="post_detail">
          <div className="post_top">
            <span className="post_badge">단어 질문</span>
            <div className="post_tit">
              <h3 className="tit">{postDetail?.articleTitle}</h3>
              <div className="set_box">
                <button type="button" className="btn_set" onClick={wordSet}>
                  <span className="blind">유저 셋</span>
                </button>
                {
                  isVisible && (
                    <>
                      <ul className="set_box" ref={sideRef}>
                        {
                          postDetail?.articleMemberIdx !== loginToken && (
                            <li>
                              <button type="button" className="">
                                <span>신고하기</span>
                              </button>
                            </li>
                          )
                        }

                        {
                          postDetail?.articleMemberIdx === loginToken && (
                            <>
                              <li>
                                <button type="button" onClick={postModifyToPage} className="">
                                  <span className="">수정</span>
                                </button>
                              </li>
                              <li>
                                <button type="button" className="" onClick={() => postDeleteData(postDetail.articleIdx)}>
                                  <span className="">삭제</span>
                                </button>

                              </li>
                            </>
                          )
                        }
                      </ul>
                    </>
                  )
                }
              </div>
            </div>



            <div className="post_desc">
              <span className="post_nickname">{postDetail?.nickname}맛보돈</span>
              <span className="post_date">{postDetail?.articleRegDtm}</span>
              <div className="post_reaction">
                <button type="button" className={`btn_post_like ${postReactionState ? 'active' : ''}`}
                        onClick={postReaction}>
                  <span className="blind">좋아요</span>
                </button>
                <div className="reaction_link reaction_comment">
              <span
                className={`txt_count ${postDetail?.commentCount === 0 ? 'blind' : ''}`}>{postDetail?.commentCount === 0 ? '댓글' : postDetail?.commentCount}</span>
                </div>
                <div className="reaction_link reaction_view">
                  <span className="blind">조회수</span>
                </div>
              </div>
            </div>
          </div>

          <div className="post_con">
            <p className="post_txt">
              {postDetail?.articleContent}
            </p>
          </div>

        </div>



        <div className="comment_wrap">
          <h4 className="comment_tit">댓글 {postDetail?.commentCount}</h4>
          {/* 코멘트 리스트 */}
          {
            postDetail?.commentDtoList.length > 0 && (
              <ul className={`post_comment ${textareaActive ? 'active' : ''}`} >
                {
                  postDetail?.commentDtoList?.map((item, idx) => {
                    return (
                      <li className="list" key={idx}>
                        <div className="comment_box">

                          <div className="comment_top">
                            {/* 작성자가 삭제한 댓글 */}
                            {
                              item?.deleted === true && (
                                <p className="comment_txt none">작성자가 삭제한 댓글입니다</p>
                              )
                            }

                            {
                              item?.deleted === false && (
                                <>
                                  <span className="comment_nickname">김누징{item?.nickname}</span>
                                  <span className="comment_date">{item?.commentRegDtm}</span>
                                  <p className="comment_txt">{item?.commentContent}</p>

                                  <div className="comment_btm">
                                    <button type="button" className="btn_reply"
                                            onClick={() => commentReplyData(item?.nickname, item?.commentIdx, item?.upperIdx)}>답글 달기
                                    </button>
                                    <button type="button" className="btn_icon like">
                                      <span className="blind">좋아요</span>
                                    </button>
                                    {
                                      item?.commentMemberIdx === loginToken && (
                                        <button type="button" className="btn_delete" onClick={() => {
                                          commentDeleteData(item?.commentIdx)
                                        }}>
                                          <span className="blind">댓글 삭제</span>
                                        </button>
                                      )
                                    }
                                  </div>
                                </>
                              )
                            }
                          </div>


                        </div>

                        {/* 대댓 */}
                        {
                          item?.commentReplyList.length !== 0 && (
                            <ul className="comment_list">
                              {
                                item?.commentReplyList?.map((reply, idx) => {
                                  return (
                                    <li className="list" key={idx}>
                                      <div className="comment_box">
                                        <div className="comment_top">


                                          {/* 작성자가 삭제한 댓글 */}
                                          {
                                            reply?.deleted === true && (
                                              <p className="comment_txt none">작성자가 삭제한 댓글입니다</p>
                                            )
                                          }
                                          {
                                            reply?.deleted === false && (
                                              <>
                                                <span className="comment_nickname">{reply?.nickname}</span>
                                                <p className="comment_txt">
                                                  <span className="comment_tag">@{item?.nickname}</span>
                                                  {reply?.commentContent}
                                                </p>
                                                <div className="comment_btm">
                                                  <button type="button" className="btn_reply"
                                                          onClick={() => commentReplyData(reply?.nickname, reply?.commentIdx)}>답글 달기
                                                  </button>
                                                  <button type="button" className="btn_icon like">
                                                    <span className="blind">좋아요</span>
                                                  </button>
                                                  {
                                                    reply?.commentMemberIdx === userIdx && (
                                                      <button type="button" className="btn_delete" onClick={() => {
                                                        commentDeleteData(reply?.commentIdx)
                                                      }}>
                                                        <span className="blind">댓글 삭제</span>
                                                      </button>
                                                    )
                                                  }

                                                </div>
                                              </>
                                            )
                                          }
                                        </div>

                                      </div>
                                    </li>
                                  )
                                })
                              }
                            </ul>
                          )
                        }

                      </li>
                    )
                  })
                }

              </ul>
            )
          }
          <AddComponent {...propsToSend}
                        addSubmit={addStateCheck}>
          </AddComponent>
        </div>

        <div className="banner_box">

        </div>

        <div className="commu_sub_box">
          <div className="commu_sub_top">
            <button type="type" className="">전체글</button>
            <button type="type" className="">글쓰기</button>
          </div>
          {
            postList && postData.length !== 0 && (
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
        </div>

      </div>

    </div>
  );
}

export default userIdxHigher(PostInfo);