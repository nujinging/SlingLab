import {memebookApi} from "./../../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {postListData} from "./../../util/action/communityAction";
import Title from "./../../components/Title";
import './../../scss/page/profile/myAddList.scss'
import userIdxHigher from "../../components/UserIdxHigher";

const MyPostList = ({ userIdx }) => {
  const dispatch = useDispatch();
  const loginToken = localStorage.getItem("memberIdx");

  const [checkedItems, setCheckedItems] = useState([]);

  // 내가 등록한 글 리스트
  const postList = useSelector(state => state.meme.postList);
  // 삭제 상태
  const [deleteState, setDeleteState] = useState(false);
  const [deleteNone, setDeleteNone] = useState(false);
  // 페이지 넘버 더보기
  const [pageNumber, setPageNumber] = useState(1);

  const selectCheckboxChange = (articleIdx) => {
    setDeleteNone(false);
    setCheckedItems(prevCheckedItems => {
      if (prevCheckedItems.includes(articleIdx)) {
        return prevCheckedItems.filter(idx => idx !== articleIdx);
      } else {
        return [...prevCheckedItems, articleIdx];
      }
    });
  }

  useEffect(() => {
    async function wordAddListApi() {
      try {
        if (userIdx !== undefined) {
          dispatch(postListData(userIdx));
          setPageNumber(postList.totalPage)
        }
      } catch (error) {
        console.log(error)
      }
    }
    wordAddListApi();
  }, [deleteState, userIdx]);

  // 글 삭제하기
  async function postCheckDelete(type, articleIdx) {
    if (type === 'single') {
      try {
        if (window.confirm("정말 삭제하시겠습니까?")) {
          await memebookApi().postDeleteApi(articleIdx);
        }
      } catch(error) {
        console.log(error);
      }
    } else if (type === 'multiple') {
      setDeleteState(true);
      if (deleteState !== false && checkedItems.length !== 0) {
        try {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            await memebookApi().postDeleteApi(loginToken);
          }
        } catch(error) {
          console.log(error);
        }
      } else if (deleteState !== false && checkedItems.length === 0) {
        setDeleteNone(true);
      }
    }
  }

  // 작성된 글 전체 삭제
  async function postAllDelete() {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await memebookApi().postAllDeleteApi(loginToken);
      }
    } catch(error) {
      console.log(error);
    }
  }

  const deleteCancel = () => {
    setDeleteState(!deleteState);
  }


  return (
    <div className="layer_wrap my_word_wrap">

      <Title title="작성한 글" type="back"></Title>

      <div className="container">

        <div className="list_top">
          <span className="txt">
            총 {postList.totalCount} 개
          </span>
          <button type="button" className={`btn_check_delete ${deleteState ? 'active' : ''}`} disabled={deleteNone} onClick={()=> postCheckDelete('multiple')}>
            {deleteState ? '삭제' : '선택 삭제'}
          </button>

          {
            deleteState && (
              <button type="button" className="btn_all_delete" onClick={deleteCancel}>취소</button>
            )
          }
          <button type="button" className="btn_all_delete" onClick={postAllDelete}>전체 삭제</button>
        </div>
        {
          postList.articleList?.length === 0 && (
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
          postList.articleList?.length > 0 && (
            <ul className="list_box">
              {
                postList.articleList?.map((item, idx) => {
                  return (
                    <li className="list_item" key={idx}>
                      {
                        deleteState && (
                          <>
                            <span className="check_box">
                              <input type="checkbox" id={item.articleIdx} onClick={() => selectCheckboxChange(item.articleIdx)}/>
                              <label htmlFor={item.articleIdx}>
                                <span className="link">{item.articleTitle}</span>
                              </label>
                            </span>
                          </>
                        )
                      }
                      {
                        !deleteState && (
                          <>
                            <Link to={`/community/postDetail/${item.articleIdx}`} className="link" key={idx}>{item.articleTitle}</Link>
                            <button type="button" className="btn_delete" onClick={() => {postCheckDelete('single', item.articleIdx)}}>
                              <span className="blind">글 삭제</span>
                            </button>
                          </>
                        )
                      }


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

export default userIdxHigher(MyPostList);