import { createLesson, editLessonById, getLessonById, getLessonsWithSubmissionsByGroupId, getMoreStudentsLessons, getMoreTeachersLessons, searchLessonsByGroupId, startLessonById } from "../services/lessonService";
import { actionTypes } from "./const";

export const getMoreStudentsLessonsAction = (token, groupId, page, size, futureDaysCount=null) => async (dispatch) => {
  try {
    
    let resp = await getMoreStudentsLessons(token,groupId, page, size,futureDaysCount);

    let payload = {
        data:resp.data,
        count:resp.headers['count']
    }
    
    dispatch({
      type: actionTypes.GET_MORE_LESSONS,
      payload: payload,
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


export const getMoreTeachersLessonsAction = (token, groupId, page, size, futureDaysCount=null) => async (dispatch) => {
  try {
    
    let resp = await getMoreTeachersLessons(token,groupId, page, size,futureDaysCount);

    let payload = {
        data:resp.data,
        count:resp.headers['count']
    }
    
    dispatch({
      type: actionTypes.GET_MORE_LESSONS,
      payload: payload,
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

export const getLessonByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type:actionTypes.SET_IS_FETCHING
    })

    let resp = await getLessonById(id);
    
    dispatch({
      type: actionTypes.GET_LESSON_BY_ID,
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

export const startLessonByIdAction = (id, data, token) => async (dispatch) => {
  try {
  
    let resp = await startLessonById(id, data, token);
  
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
    type:actionTypes.DISABLE_IS_FETCHING
  })
};


export const editLessonByIdAction = (id, data, token) => async (dispatch) => {
  try {
    dispatch({
      type:actionTypes.SET_IS_FETCHING
    })

    let resp = await editLessonById(id, data, token);

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload: resp.data,
    });

    await dispatch(getLessonByIdAction(id));

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

export const createLessonAction = (data, token) => async (dispatch) => {
  try {
    dispatch({
      type:actionTypes.SET_IS_FETCHING
    })

    let resp = await createLesson(data, token);

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
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

export const searchLessonsByGroupIdAction = (id,input) => async (dispatch) => {
  try {

    let resp = await searchLessonsByGroupId(id,input);

    return resp.data

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

export const getLessonsWithSubmissionsByGroupIdAction = (token, groupId, page, size) => async (dispatch) => {
  try {
    
    let resp = await getLessonsWithSubmissionsByGroupId(token,groupId, page, size);

    let payload = {
        data:resp.data,
        count:resp.headers['count']
    }
    
    dispatch({
      type: actionTypes.GET_MORE_LESSONS,
      payload: payload,
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


