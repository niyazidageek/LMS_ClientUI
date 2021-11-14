import { getMoreLessons } from "../services/lessonService";
import { actionTypes } from "./const";

export const getMoreLessonsAction = (token, groupId, page, size) => async (dispatch) => {
  try {
    let resp = await getMoreLessons(token,groupId, page, size);

    let payload = {
        data:resp.data,
        count:resp.headers['Count']
    }

    dispatch({
      type: actionTypes.GET_MORE_LESSONS,
      payload: payload,
    });

  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({
        type: actionTypes.SET_AUTH_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: actionTypes.SET_AUTH_ERROR,
        payload: error.response.data,
      });
    }
  }
};
