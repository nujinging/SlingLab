import {myWordListAction, userAction, userIdxAction, wordListAction} from "../action";
import {memebookApi} from "../memebookApi";

export const userIdxData = (userIdx) => async (dispatch) => {
  try {
    dispatch(userIdxAction(userIdx));
  } catch (error) {
    console.error(error);
  }
};

export const userInfoData = (userIdx) => async (dispatch) => {
  try {
    const userInfoData = await memebookApi().memberInfoApi();
    dispatch(userAction(userInfoData));
  } catch (error) {
    console.error(error);
  }
};