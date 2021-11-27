import { actionTypes } from "../actions/const";

const initialState = {
  question:null
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_QUESTION_BY_ID:
      return {
        question: action.payload,
      };
    default:
      return state;
  }
};

export default questionReducer;