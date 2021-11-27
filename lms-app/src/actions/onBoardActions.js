import { actionTypes } from "./const";

export const setOnBoardAction = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_ONBOARD,
    payload: data,
  });
};

export const deleteOnboardInfoAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_ONBOARD,
  });
};

