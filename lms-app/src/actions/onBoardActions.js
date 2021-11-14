import { getMoreLessons } from "../services/lessonService";
import { actionTypes } from "./const";

export const setOnBoardGroupId = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_ONBOARD_GROUP_ID,
    payload: id,
  });
};
