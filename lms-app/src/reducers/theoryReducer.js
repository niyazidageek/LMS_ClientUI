import { actionTypes } from "../actions/const";

const initialState = {
  theories: null,
  theory: null,
};

const theoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_THEORIES_BY_LESSON_ID:
      return {
        theories: action.payload,
      };
    // case actionTypes.GET_LESSON_BY_ID:
    //   return {
    //     ...state,
    //     lesson: action.payload,
    //   };
    default:
      return state;
  }
};

export default theoryReducer;
