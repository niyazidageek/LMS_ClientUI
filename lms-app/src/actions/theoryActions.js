import { getStudentsTheoriesByLessonId, getStudentsTheoryById, getTheoryContent, markTheoryAsRead } from "../services/theoryService";
import { actionTypes } from "./const";

export const getStudentsTheoriesByLessonIdAction = (id, token) => async (dispatch) => {
  try {

    dispatch({
        type:actionTypes.SET_IS_FETCHING
      })

    let resp = await getStudentsTheoriesByLessonId(id,token)

    dispatch({
      type: actionTypes.GET_THEORIES_BY_LESSON_ID,
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

export const getStudentsTheoryByIdAction = (id, token) => async (dispatch) => {
  try {

    dispatch({
        type:actionTypes.SET_IS_FETCHING
      })

    let resp = await getStudentsTheoryById(id, token);

    let htmlResp = await getTheoryContent(resp.data.fileName);

    console.log(htmlResp);

    dispatch({
      type: actionTypes.GET_THEORY_BY_ID,
      payload: resp.data,
    });

    dispatch({
      type:actionTypes.DISABLE_IS_FETCHING
    })
    

    return htmlResp.data

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

export const markTheoryAsReadAction = (id, token) => async (dispatch) => {
  try {

    dispatch({
        type:actionTypes.SET_IS_FETCHING
      })

    let resp = await markTheoryAsRead(id, token);

    await dispatch(getStudentsTheoryByIdAction(id, token));
    
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