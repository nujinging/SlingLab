import '../scss/components/layerHeader.scss'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {scrapListData} from "../util/action/scrapAction";
import {myWordListData} from "../util/action/wordAction";
import {postCommentData, postListData} from "../util/action/communityAction";

const ProfileHistory = ({ historyList, type }) => {
  const [listDetail, setListDetail] = useState(historyList);
  const [listLength, setListLength] = useState(0);
  const [title, setTitle] = useState('');
  const [noneText, setNoneText] = useState('');
  const [moreLink, setMoreLink] = useState('');
  const [listLink, setListLink] = useState('');
  const [listText, setListText] = useState(``);

  useEffect(() => {
    if (historyList !== undefined) {
      switch (type) {
        case "myWord" :
          setTitle('참여한 단어');
          setNoneText('등록한 단어가 없어요');
          setMoreLink('/profile/myWordList');
          setListLink('/vocabulary/wordInfo/${item.wordIdx}');
          setListDetail(historyList?.wordContentList);
          setListLength(historyList?.totalCount);
          break;
        case "myScrap" :
          setTitle('스크랩한 단어');
          setNoneText('스크랩한 단어가 없어요');
          setMoreLink('/profile/scrapList');
          setListLink('/vocabulary/wordInfo/${item.wordIdx}');
          setListDetail(historyList.content);
          setListLength(historyList?.content?.length);
          break;
        case "myPost" :
          setTitle('내가 쓴 글');
          setNoneText('작성한 글이 없어요');
          setMoreLink('/profile/myPostList');
          setListLink('/community/postDetail/${item.articleIdx}');
          setListDetail(historyList.articleList);
          setListLength(historyList?.totalCount);
          break;
        case "myComment" :
          setTitle('내가 쓴 댓글');
          setNoneText('작성한 댓글이 없어요');
          setMoreLink('/profile/myCommentList)');
          setListLink('/community/postDetail/${item.articleIdx}');
          setListDetail(historyList.commentList);
          setListLength(historyList?.totalCount);
          break;
      }
    }
  }, [historyList]);

  return (
    <div className="history_box">
      <div className="history_tit">
        <h4>
          {title}
          {
            listLength !== 0 && (
              <span className="count">6{listLength}</span>
            )
          }
        </h4>
        {
          listLength > 5 && (
            <Link to={moreLink} className="item">더보기</Link>
          )
        }

        <Link to={``} className="item">더보기</Link>
      </div>

      <ul className="list_box">
        <li className="list_item">
          <Link to={``} className="link">
            데이터데이터
          </Link>
        </li>
        <li className="list_item">
          <Link to={``} className="link">
            데이터데이터
          </Link>
        </li>
        <li className="list_item">
          <Link to={``} className="link">
            데이터데이터
          </Link>
        </li>
        <li className="list_item">
          <Link to={``} className="link">
            데이터데이터
          </Link>
        </li>
        <li className="list_item">
          <Link to={``} className="link">
            데이터데이터
          </Link>
        </li>
      </ul>

      {
        listLength === 0 && (
          <div className="content_none">{noneText} &#128549;</div>
        )
      }
      {
        listLength > 0 && (
          <ul className="list_box">
            {
              listDetail?.slice(0, 5).map((item, idx) => {
                return (
                  <li className="list_item" key={idx}>
                    <Link to={listLink} className="link" key={idx}> { type === 'myPost' ? item?.articleTitle : type === 'myComment' ? item?.commentContent : item?.wordName}</Link>
                  </li>
                )
              })
            }
          </ul>
        )
      }
    </div>
  )
}

export default ProfileHistory;