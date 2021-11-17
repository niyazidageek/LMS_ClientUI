import { getAssignmentById, getUndoneAssignmentsByLessonId, submitAssignmentById } from "../services/assignmentService";
import { actionTypes } from "./const";

export const getUndoneAssignmentsByLessonIdAction = (id, token) => async (dispatch) => {
  try {

    dispatch({
        type:actionTypes.SET_IS_FETCHING
      })

    let resp = await getUndoneAssignmentsByLessonId(id, token);

    dispatch({
      type: actionTypes.GET_ASSINGMENTS_BY_LESSON_ID,
      payload: resp.data,
    });

    dispatch({
      type:actionTypes.DISABLE_IS_FETCHING
    })

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
  dispatch({
    type:actionTypes.DISABLE_IS_FETCHING
  })
};

export const getAssignmentByIdAction = (id) => async (dispatch) => {
  try {

    dispatch({
        type:actionTypes.SET_IS_FETCHING
      })

    let resp = await getAssignmentById(id);

    dispatch({
      type: actionTypes.GET_ASSIGNMENT_BY_ID,
      payload: resp.data,
    });

    dispatch({
      type:actionTypes.DISABLE_IS_FETCHING
    })

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
  dispatch({
    type:actionTypes.DISABLE_IS_FETCHING
  })
};


export const submitAssignmentByIdAction = (id,data,token) => async (dispatch) => {
  try {

    dispatch({
        type:actionTypes.SET_IS_FETCHING
      })

    let resp = await submitAssignmentById(id,data,token);

    dispatch({
      type:actionTypes.DISABLE_IS_FETCHING
    })

    dispatch({
      type:actionTypes.SET_AUTH_MESSAGE,
      payload:resp.data
    })

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
  dispatch({
    type:actionTypes.DISABLE_IS_FETCHING
  })
};