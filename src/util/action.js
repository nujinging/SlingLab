// 회원
export const userAction = (data) => {
  return {
    type: "SEND_USER_INFO_ACTION",
    payload: data.data
  };
};

// 회원
export const userIdxAction = (data) => {
  return {
    type: "SEND_USER_IDX_ACTION",
    payload: data
  };
};

// 회원 국가 조회
export const nationCheckAction = (data) => {
  return {
    type: "SEND_NATION_CHECK_ACTION",
    payload: data.data
  };
};

// 전체 단어 리스트
export const wordListAction = (data) => {
  return {
    type: "SEND_WORD_LIST",
    payload: data.data
  };
};

// 단어 검색
export const wordSearchAction = (data) => {
  return {
    type: "SEND_WORD_SEARCH",
    payload: data.data
  };
};

// 전체 단어 정렬
export const wordSortAction = (data) => {
  return {
    type: "SEND_WORD_SORT",
    payload: data.data
  };
};

// 내가 쓴 댓글 리스트
export const commentListAction = (data) => {
  return {
    type: "SEND_MY_COMMENT_LIST",
    payload: data.data
  };
};

// 설명 삭제
export const wordDeleteAction = (data) => {
  return {
    type: "SEND_WORD_DELETE_ACTION",
    payload: data.data
  };
};


// 내가 쓴 단어 리스트
export const myWordListAction = (data) => {
  return {
    type: "SEND_MY_WORD_LIST",
    payload: data.data
  };
};


// 스크랩 리스트
export const scrapListAction = (data) => {
  return {
    type: "SEND_SCRAP_LIST",
    payload: data.data
  };
};

// 스크랩 삭제
export const scrapDeleteAction = (data) => {
  return {
    type: "SEND_SCRAP_DELETE",
    payload: data.data
  };
};

// 포스트 리스트
export const postListAction = (data) => {
  return {
    type: "SEND_POST_LIST",
    payload: data.data
  };
};

// 포스트 상세
export const postDetailAction = (data) => {
  return {
    type: "SEND_POST_DETAIL",
    payload: data.data
  };
};