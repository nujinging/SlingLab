import {memebookApi} from "../memebookApi";
import {scrapListAction, scrapDeleteAction} from "../action";

// 스크랩 리스트
export const scrapListData = (id) => async (dispatch) => {
  try {
    const scrapListData = await memebookApi().wordScrapeUpdateApi(id);
    dispatch(scrapListAction(scrapListData));
  } catch (error) {
    console.error(error);
  }
};

// 스크랩 추가
export const scrapAddData = (id, memberIdx) => async () => {
  try {
    await memebookApi().wordScrapAddApi({
      "wordIdx": id,
      "memberIdx": memberIdx,
    });
  } catch (error) {
    console.error(error);
  }
};

// 스크랩 삭제
export const scrapDeleteData = (scrapIdx) => async (dispatch) => {
  try {
    const scrapDeleteData = await memebookApi().wordScrapDeleteApi(scrapIdx);
    dispatch(scrapDeleteAction(scrapDeleteData));
  } catch (error) {
    console.error(error);
  }
};
