import { getMoreLessons } from "../services/lessonService";
import { actionTypes } from "./const";

export const setOnBoardAction = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_ONBOARD,
    payload: data,
  });
};
