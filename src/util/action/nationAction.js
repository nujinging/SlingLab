import {memebookApi} from "../memebookApi";
import {nationCheckAction} from "../action";

// 회원 국가 조회
export const nationCheckData = (memberIdx) => async (dispatch) => {
  try {
    const nationCheckData = await memebookApi().nationCheckApi(memberIdx);
    dispatch(nationCheckAction(nationCheckData));
  } catch (error) {
    console.error(error);
  }
};
