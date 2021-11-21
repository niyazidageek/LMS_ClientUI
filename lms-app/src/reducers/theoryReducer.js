import { actionTypes } from "../actions/const";

const initialState = {
  theories: null,
  theory: null,
  count: 0,
};

const theoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_STUDENTS_THEORIES_BY_LESSON_ID:
      return {
        theories: action.payload,
      };
    case actionTypes.GET_THEORY_BY_ID:
      return {
        ...state,
        theory: action.payload,
      };
    case actionTypes.GET_THEORIES_BY_GROUP_ID:
      return {
        ...state,
        theories: action.payload.data,
        count: action.payload.count,
      };
    default:
      return state;
  }
};

export default theoryReducer;
