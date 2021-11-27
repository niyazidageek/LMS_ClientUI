import { actionTypes } from "../actions/const";

const initialState = {
  quizzes: null,
  quiz: null,
  count: 0,
  quizInfo: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MORE_QUIZZES:
      return {
        ...state,
        quizzes: action.payload.data,
        count: action.payload.count,
      };
    case actionTypes.GET_QUIZ_BY_ID:
      return {
        ...state,
        quiz: action.payload,
      };
    case actionTypes.GET_STUDENTS_QUIZ_INFO_BY_ID:
      return {
        ...state,
        quizInfo: action.payload,
      };
    case actionTypes.GET_MORE_STUDENTS_QUIZZES_BY_GROUP_ID:
      return {
        ...state,
        quizzes: action.payload.data,
        count: action.payload.count,
      };
    default:
      return state;
  }
};

export default quizReducer;
