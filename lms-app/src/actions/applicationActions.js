import { postApplication } from "../services/applicationService";
import { actionTypes } from "./const";

export const postApplicationAction = (data,token) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_IS_FETCHING,
      });
  
      let resp = await postApplication(data,token);
  
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
  