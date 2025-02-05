import {memebookApi} from "./../../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {postCommentData} from "./../../util/action/communityAction";
import Title from "./../../components/Title";
import './../../scss/page/profile/myAddList.scss'
import userIdxHigher from "../../components/UserIdxHigher";

const MyCommentList = ({ userIdx }) => {
  const dispatch = useDispatch();
  // 댓글 리스트
  const myCommentList = useSelector(state => state.meme.myCommentList);
  // 댓글 상태
  const [commentState, setCommentState] = useState(false);
  // 페이지 넘버 더보기
  const [pageNumber, setPageNumber] = useState(1);

  // 댓글 리스트 Api
  useEffect(() => {
    async function myCommentListApi() {
      try {
        if (userIdx !== undefined) {
          dispatch(postCommentData(userIdx));
          setPageNumber(myCommentList.totalPage);
        }
      } catch (error) {
        console.log(error)
      }
    }
    myCommentListApi();
  }, [commentState, userIdx]);


  // 댓글 삭제하기
  async function commentDeleteData(commentIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await memebookApi().commentDeleteApi(commentIdx, userIdx);
        setCommentState(!commentState);
        console.log('성공')
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="layer_wrap my_word_wrap">

      <Title title="작성한 댓글" type="back"></Title>

      <div className="container">

        <div className="list_top">
          <span className="txt">
            총  개
          </span>
          <span className="check_box">
            <input type="checkbox"/>
            <label htmlFor="">전체 삭제</label>
          </span>
        </div>

        {
          myCommentList?.commentList.length === 0 && (
            <div className="content_none list">
              <p>
                작성한 글이 없어요 &#128172;
              </p>
              <Link to="/community" className="btn_primary_line size_m">
                커뮤니티 구경하러 가기
              </Link>
            </div>
          )
        }

        {
          myCommentList?.commentList.length > 0 && (
            <ul className="list_box inside">
              {
                myCommentList?.commentList.map((item, idx) => {
                  return (
                    <li className="list_item" key={idx}>
                      <Link to={`/community/postDetail/${item.articleIdx}`} className="link" key={idx}>{item.commentContent}</Link>
                      <button type="button" className="btn_delete" onClick={() => {commentDeleteData(item?.commentIdx)}}>
                        <span className="blind">댓글 삭제</span>
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

export default userIdxHigher(MyCommentList);