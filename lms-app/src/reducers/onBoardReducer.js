import { actionTypes } from "../actions/const";

const initialState = {
  groupId: null,
  groups: null,
};

const onBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ONBOARD:
      return {
        ...state,
        groupId: action.payload.groupId,
        groups: action.payload.groups,
      };
    case actionTypes.DELETE_ONBOARD:
      return {
        groupId: null,
        groups: null,
      };
    default:
      return state;
  }
};

export default onBoardReducer;
