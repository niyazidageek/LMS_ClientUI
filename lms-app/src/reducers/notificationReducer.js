import { actionTypes } from "../actions/const";

const initialState = {
  appUserNotification: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION:
      return {
        appUserNotification: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;
