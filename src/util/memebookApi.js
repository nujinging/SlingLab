import axios from "axios";

const loginToken = localStorage.getItem("token");

const getRequest = axios.create({
  baseURL: `https://memebook.co.kr/api/`,
})

const loginRequest = axios.create({
  baseURL: `https://memebook.co.kr/`,
})

const createRequest = axios.create({
  baseURL: `https://memebook.co.kr/api/`,
  headers: {
    Authorization: loginToken,
  }
});

export const memebookApi = () => {
  return {
    // 회원 조회
    memberInfoApi : (memberInfo) => createRequest.get(`member/info`, memberInfo),
    // 회원 생성
    memberAddApi : (memberInfo) => createRequest.post(`member/create`, memberInfo),
    // 회원 국가 변경
    nationModifyApi : (nationInfo) => createRequest.put(`member/update/nation`, nationInfo),
    // 닉네임 생성
    nickNameAddApi : (nickname) => createRequest.post(`member/create/nickname?nickname=${nickname}`),
    // 닉네임 중복 조회
    nickNameCheckApi : (nickname) => getRequest.get(`member/exist/nickname?nickname=${nickname}`),

    // 게시글 등록
    postAddApi : (postInfo) => createRequest.post(`article/create`, postInfo),
    // 게시글 리스트
    postListApi : (pageNumber) => getRequest.get(`article/list?page=${pageNumber}&pageSize=20`),
    // 게시글 카테고리
    postCateApi : (pageNumber, country, sort) => getRequest.get(`word/list?page=${pageNumber}&nation=${country}&sort=${sort}&pageSize=20`),
    // 게시글 상세
    postDetailApi : (postIdx) => getRequest.get(`article/detail/${postIdx}`),
    // 게시글 수정
    postModifyApi : (articleIdx, postIdx) => createRequest.put(`article/update/${articleIdx}`, postIdx),
    // 게시글 좋아요
    postReactionApi : (postIdx) => createRequest.post(`article/like`, postIdx),
    // 게시글 삭제
    postDeleteApi : (postIdx) => createRequest.delete(`article/delete?articleIdx=${postIdx}`),
    // 게시글 전체삭제
    postAllDeleteApi : (memberIdx) => createRequest.delete(`article/delete/all?memberIdx=${memberIdx}`),

    // 댓글 리스트
    commentListApi : (memberIdx) => getRequest.get(`comment/list/${memberIdx}`),
    // 댓글 수정
    commentModifyApi : (commentIdx) => createRequest.put(`comment/update`, commentIdx),
    // 댓글 좋아요
    commentReactionApi : (commentIdx) => createRequest.post(`comment/like`, commentIdx),
    // 댓글 등록
    commentAddApi : (commentInfo) => createRequest.post(`comment/create`, commentInfo),
    // 댓글 삭제
    commentDeleteApi : (commentIdx) => createRequest.delete(`comment/delete?commentIdx=${commentIdx}`),

    // 전체 단어 리스트 조회
    wordListApi : (pageNumber) => getRequest.get(`word/list?page=${pageNumber}&pageSize=20`),
    // 전체 단어 리스트 조회
    wordSearchApi : (searchWord) => getRequest.get(`word/list?search=${searchWord}`),
    // 단어 정렬
    wordSortApi : (pageNumber, country, sort) => getRequest.get(`word/list?page=${pageNumber}&nation=${country}&sort=${sort}&pageSize=20`),
    // 내가 쓴 단어 리스트 조회
    myWordListApi : (memberIdx, pageNumber) => getRequest.get(`word/list/${memberIdx}?page=${pageNumber}&pageSize=20`),
    // 단어 디테일 조회
    wordDetailApi : (wordIdx, memberIdx) => getRequest.get(`word/${wordIdx}?memberIdx=${memberIdx}`),

    // 단어 추가
    wordAddApi : (addList) => createRequest.post(`word/create`, addList),
    // 설명 수정
    wordModifyApi : (wordInfo) => createRequest.put(`word/update`, wordInfo),
    // 설명 삭제
    wordDeleteApi : (wordContentIdx) => createRequest.delete(`word/delete?wordContentIdx=${wordContentIdx}`),

    // 스크랩 조회
    wordScrapeUpdateApi : (memberIdx) => getRequest.get(`scrap/word/list/${memberIdx}`),
    // 스크랩 등록
    wordScrapAddApi : (wordInfo) => createRequest.post(`scrap/word`, wordInfo),
    // 스크랩 삭제
    wordScrapDeleteApi : (wordIdx) => createRequest.delete(`scrap/word?scrapIdx=${wordIdx}`),

    // 좋아요, 싫어요 조회
    wordReactionUpdateApi : (update) => createRequest.post(`reaction/word/update`, update),
    // 좋아요, 싫어요 횟수
    wordReactionCountApi : (wordIdx) => getRequest.get(`reaction/count?wordIdx=${wordIdx}`),

    // 팔로워 상태
    followerStateApi : (memberIdx, otherMemberIdx) => getRequest.get(`follow/follow?me=${memberIdx}&other=${otherMemberIdx}`),
    // 팔로워 추가
    followerAddApi : (memberIdx) => createRequest.post(`follow/update`, memberIdx),
    // 팔로워 리스트
    followerListApi : (memberIdx) => getRequest.get(`follow/follower/list?memberIdx=${memberIdx}`),
    // 팔로잉 리스트
    followeeListApi : (memberIdx) => getRequest.get(`follow/followee/list?memberIdx=${memberIdx}`),
  }

}