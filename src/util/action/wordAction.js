import {memebookApi} from "../memebookApi";
import {wordListAction, myWordListAction, wordSortAction, wordDeleteAction} from "../action";

// 단어 리스트
export const wordListData = (id, userIdx) => async (dispatch) => {
  try {
    const api = memebookApi(userIdx);
    const wordListData = await api.wordListApi(id);
    dispatch(wordListAction(wordListData));
  } catch (error) {
    console.error(error);
  }
};

// 단어 정렬
export const wordSortData = (pageNumber, nation, word) => async (dispatch) => {
  try {
    let wordSortData;
    switch (word) {
      case 'LIKE' :
        wordSortData = await memebookApi().wordSortApi(pageNumber, nation, word);
        break;
      case 'DISLIKE' :
        wordSortData = await memebookApi().wordSortApi(pageNumber, nation, word);
        break;
      case 'LATEST' :
        wordSortData = await memebookApi().wordSortApi(pageNumber, nation, word);
        break;
    }
    dispatch(wordSortAction(wordSortData));
  } catch (error) {
    console.error(error);
  }
};


// 내가 등록한 단어 리스트
export const myWordListData = (memberIdx) => async (dispatch) => {
  try {
    const myWordListData = await memebookApi().myWordListApi(memberIdx, 1);
    dispatch(myWordListAction(myWordListData));
  } catch (error) {
    console.error(error);
  }
};


// 설명 삭제
export const wordDeleteData = (wordContentIdx) => async (dispatch) => {
  try {
    const wordDeleteData = await memebookApi().wordDeleteApi(wordContentIdx);
    dispatch(wordDeleteAction(wordDeleteData));
  } catch (error) {
    console.error(error);
  }
};

