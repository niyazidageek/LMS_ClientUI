import { actionTypes } from "../actions/const";

const initialState = {
  lessons: null,
  lesson: null,
  count: 0,
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MORE_LESSONS:
      return {
        ...state,
        lessons: action.payload.data,
        count: action.payload.count,
      };
    case actionTypes.GET_LESSON_BY_ID:
      return {
        ...state,
        lesson: action.payload,
      };
    default:
      return state;
  }
};

export default lessonReducer;
