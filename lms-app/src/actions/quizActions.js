import { createQuiz, deleteQuizById, editQuizById, getMoreStudentsQuizzesByGroupId, getMoreTeachersByGroupIdQuizzes, getQuizById, getStudentsQuizInfoById, makeQuizAvailableById } from "../services/quizService";
import { actionTypes } from "./const";

export const getMoreTeachersQuizzesByGroupIdAction = (token, groupId, page, size) => async (dispatch) => {
    try {
      
      let resp = await getMoreTeachersByGroupIdQuizzes(token,groupId, page, size);
  
      let payload = {
          data:resp.data,
          count:resp.headers['count']
      }
      
      dispatch({
        type: actionTypes.GET_MORE_QUIZZES,
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

  export const createQuizAction = (data, token) => async (dispatch) => {
    try {
      dispatch({
        type:actionTypes.SET_IS_FETCHING
      })
  
      let resp = await createQuiz(data, token);
  
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
  

  export const getQuizByIdAction = (id) => async (dispatch) => {
    try {
      dispatch({
        type:actionTypes.SET_IS_FETCHING
      })
  
      let resp = await getQuizById(id);
      
      dispatch({
        type: actionTypes.GET_QUIZ_BY_ID,
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

  export const editQuizByIdAciton = (id, data, token) => async (dispatch) => {
    try {
      dispatch({
        type:actionTypes.SET_IS_FETCHING
      })
  
      let resp = await editQuizById(id, data, token);
  
      dispatch({
        type: actionTypes.SET_AUTH_MESSAGE,
        payload: resp.data,
      });
  
      await dispatch(getQuizByIdAction(id));
  
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

  export const makeQuizAvailableByIdAction = (id, data, token) => async (dispatch) => {
    try {
      dispatch({
        type:actionTypes.SET_IS_FETCHING
      })
  
      let resp = await makeQuizAvailableById(id, data, token);
  
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

  export const getMoreStudentsQuizzesByGroupIdAction = (token, groupId, page, size) => async (dispatch) => {
    try {
      
      let resp = await getMoreStudentsQuizzesByGroupId(token,groupId, page, size);
  
      let payload = {
          data:resp.data,
          count:resp.headers['count']
      }
      
      dispatch({
        type: actionTypes.GET_MORE_STUDENTS_QUIZZES_BY_GROUP_ID,
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


  export const getStudentsQuizInfoByIdAction = (id,token) => async (dispatch) => {
    try {
      dispatch({
        type:actionTypes.SET_IS_FETCHING
      })
  
      let resp = await getStudentsQuizInfoById(id,token);
      
      dispatch({
        type: actionTypes.GET_STUDENTS_QUIZ_INFO_BY_ID,
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

  export const deleteQuizByIdAction = (id) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });
  
      let resp = await deleteQuizById(id);
  
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