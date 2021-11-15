import {
  confirmNewEmail,
  editProfile,
  editProfilePicture,
  getProfile,
  requestChangeEmail,
} from "../services/profileService";
import { actionTypes } from "./const";

export const getProfileAction = (token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await getProfile(token);

    dispatch({
      type: actionTypes.GET_USER_PROFILE,
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
    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });
  }
};

export const editProfileAction = (token, data) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await editProfile(token, data);

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload: resp.data,
    });

    await dispatch(getProfileAction(token));

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

export const editProfilePictureAction = (token, data) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await editProfilePicture(token, data);

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload: resp.data,
    });

    await dispatch(getProfileAction(token));

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

export const requestChangeEmailAction = (data,token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });

    let resp = await requestChangeEmail(data,token);

    dispatch({
      type: actionTypes.SET_AUTH_MESSAGE,
      payload: resp.data,
    });

    dispatch({
      type: actionTypes.DISABLE_IS_FETCHING,
    });
  } catch (error) {
    if(error.message ===  "Network Error" || error.message ===  "Request failed with status code 401"){
        dispatch({
            type:actionTypes.SET_AUTH_ERROR,
            payload:error
        })
    }
    else{
        dispatch({
            type:actionTypes.SET_AUTH_ERROR,
            payload:error.response.data
        })
    }   
    dispatch({
        type:actionTypes.DISABLE_IS_FETCHING
    })
  }
};


export const confirmNewEmailAction = (data,token) => async (dispatch)=>{
  try {

      dispatch({
          type:actionTypes.SET_IS_FETCHING
      })

      const resp = await confirmNewEmail(data,token);

      dispatch({
          type:actionTypes.SET_AUTH_MESSAGE,
          payload:resp.data
      })

      dispatch({
          type:actionTypes.DISABLE_IS_FETCHING
      })
      
  } catch (error) {
      if(error.message === "Network Error"){
          dispatch({
              type:actionTypes.SET_AUTH_ERROR,
              payload:error
          })
      }
      else{
          dispatch({
              type:actionTypes.SET_AUTH_ERROR,
              payload:error.response.data
          })
      }   
      dispatch({
          type:actionTypes.DISABLE_IS_FETCHING
      })
  }
}