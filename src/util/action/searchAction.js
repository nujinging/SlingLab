import {memebookApi} from "../memebookApi";
import {wordSearchAction} from "../action";

// 단어 검색
export const wordSearchData = (searchWord) => async (dispatch) => {
  try {
    const wordSearchData = await memebookApi().wordSearchApi(searchWord);
    dispatch(wordSearchAction(wordSearchData));
  } catch (error) {
    console.error(error);
  }
};
