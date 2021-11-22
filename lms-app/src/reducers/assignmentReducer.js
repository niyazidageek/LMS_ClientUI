import { actionTypes } from "../actions/const";

const initialState = {
  assignments: null,
  assignment: null,
  submissions:null,
  count: 0,
};

const assignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_STUDENTS_ASSINGMENTS_BY_LESSON_ID:
      return {
        assignments: action.payload,
      };
    case actionTypes.GET_ASSIGNMENT_BY_ID:
      return {
        ...state,
        assignment: action.payload,
      };
    case actionTypes.GET_ASSIGNMENTS_BY_GROUP_ID:
      return {
        ...state,
        assignments: action.payload.data,
        count: action.payload.count,
      };
    case actionTypes.GET_SUBMISSIONS_BY_LESSON_ID:
      return {
        ...state,
        submissions: action.payload.data,
        count: action.payload.count,
      };
    default:
      return state;
  }
};

export default assignmentReducer;
