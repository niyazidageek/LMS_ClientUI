import { getTeacherHome } from "../services/teacherHomeService";
import { actionTypes } from "./const";

export const getTeacherHomeAction = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getTeacherHome(token, id);


    let payload = {
      data: resp.data,
      count: resp.headers["count"],
    };

    let onBoard = {
      groupId:payload.data.currentGroupId,
      groups: payload.data.groups.map(g=>({name:g.name,id:g.id}))
    }

    dispatch({
      type: actionTypes.SET_ONBOARD,
      payload:onBoard
    })

    dispatch({
      type: actionTypes.GET_TEACHER_HOME_CONTENT,
      payload: payload,
    });

    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
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
    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });
  }
};
