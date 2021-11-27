import { actionTypes } from "../actions/const";

const initialState = {
  link: null,
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LINK:
      return {
        link: action.payload,
      };
    default:
      return state;
  }
};

export default lessonReducer;
