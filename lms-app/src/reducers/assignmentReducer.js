import { actionTypes } from "../actions/const";

const initialState = {
  assignments: null,
  assignment: null,
};

const assignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ASSINGMENTS_BY_LESSON_ID:
      return {
        assignments: action.payload,
      };
    case actionTypes.GET_ASSIGNMENT_BY_ID:
      return {
        ...state,
        assignment: action.payload,
      };
    default:
      return state;
  }
};

export default assignmentReducer;
