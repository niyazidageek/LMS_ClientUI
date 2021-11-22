import {
  createTheory,
  editTheoryById,
  getAllTheoriesByGroupId,
  getStudentsTheoriesByLessonId,
  getStudentsTheoryById,
  getTheoryById,
  getTheoryContent,
  markTheoryAsRead,
} from "../services/theoryService";
import { actionTypes } from "./const";

export const getStudentsTheoriesByLessonIdAction =
  (id, token) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });

      let resp = await getStudentsTheoriesByLessonId(id, token);

      dispatch({
        type: actionTypes.GET_STUDENTS_THEORIES_BY_LESSON_ID,
        payload: resp.data,
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
    }
    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });
  };

export const getStudentsTheoryByIdAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getStudentsTheoryById(id, token);

    let htmlResp = await getTheoryContent(resp.data.fileName);

    console.log(htmlResp);

    dispatch({
      type: actionTypes.GET_THEORY_BY_ID,
      payload: resp.data,
    });

    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });

    return htmlResp.data;
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
    type: actionTypes.DISABLE_IS_FETCHING,
  });
};

export const markTheoryAsReadAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await markTheoryAsRead(id, token);

    await dispatch(getStudentsTheoryByIdAction(id, token));

    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload: resp.data,
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
  dispatch({
    type: actionTypes.DISABLE_IS_FETCHING,
  });
};

export const getTheoryByIdAction = (id) => async (dispatch) => {
  try {

    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getTheoryById(id);

    let htmlResp = await getTheoryContent(resp.data.fileName);

    dispatch({
      type: actionTypes.GET_THEORY_BY_ID,
      payload: resp.data,
    });

    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });

    return htmlResp.data;
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
    type: actionTypes.DISABLE_IS_FETCHING,
  });
};

export const getAllTheoriesByGroupIdAction =
  (id, page = null, size = null) =>
  async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });

      let resp = await getAllTheoriesByGroupId(id, page, size);

      let payload = {
        data: resp.data,
        count: resp.headers["count"],
      };

      dispatch({
        type: actionTypes.GET_THEORIES_BY_GROUP_ID,
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
    }
    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });
  };

export const createTheoryAction = (data, token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await createTheory(data, token);

    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload: resp.data,
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
  dispatch({
    type: actionTypes.DISABLE_IS_FETCHING,
  });
};

export const editTheoryByIdAction = (id, data, token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await editTheoryById(id, data, token);

    let htmlResp = await dispatch(getTheoryByIdAction(id))

    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload: resp.data,
    });

    return htmlResp;
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
    type: actionTypes.DISABLE_IS_FETCHING,
  });
};
