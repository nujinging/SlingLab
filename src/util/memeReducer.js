
const initialState = {
  scrapList : [],
  wordList : [],
  myWordList : [],
  nationCheck : [],
  postList : [],
  userIdx: null,
};

const memeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_USER_INFO_ACTION":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "SEND_USER_IDX_ACTION":
      return {
        ...state,
        userIdx: action.payload,
      };
    case "SEND_NATION_CHECK_ACTION":
      return {
        ...state,
        nationCheck: action.payload,
      };
    case "SEND_WORD_LIST":
      return {
        ...state,
        wordList: action.payload,
      };
    case "SEND_WORD_SEARCH":
      return {
        ...state,
        wordSearch: action.payload,
      };
    case "SEND_WORD_SORT":
      return {
        ...state,
        wordSort: action.payload,
      };
    case "SEND_MY_COMMENT_LIST":
      return {
        ...state,
        myCommentList: action.payload,
      };
    case "SEND_MY_WORD_LIST":
      return {
        ...state,
        myWordList: action.payload,
      };
    case "SEND_SCRAP_LIST":
      return {
        ...state,
        scrapList: action.payload,
      };
    case "SEND_SCRAP_DELETE":
      return {
        ...state,
        scrapList: action.payload,
      };
    case "SEND_POST_LIST":
      return {
        ...state,
        postList: action.payload,
      };
    case "SEND_POST_DETAIL":
      return {
        ...state,
        postDetail: action.payload,
      };
    default:
      return state;
  }
};


export default memeReducer;
