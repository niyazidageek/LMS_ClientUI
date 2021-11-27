import { createOption, deleteOptionById, editOptionById, getOptionById } from "../services/optionService";
import { actionTypes } from "./const";

export const createOptionAction = (data, token) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });
  
      let resp = await createOption(data, token);
  
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

  export const getOptionByIdAction = (id) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });
  
      let resp = await getOptionById(id);
  
      dispatch({
        type: actionTypes.GET_OPTION_BY_ID,
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


  export const editOptionByIdAction = (id,data,token) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });
  
      let resp = await editOptionById(id, data, token);
  
      await dispatch(getOptionByIdAction(id));
  
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


  export const deleteOptionByIdAction = (id) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });
  
      let resp = await deleteOptionById(id);
  
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