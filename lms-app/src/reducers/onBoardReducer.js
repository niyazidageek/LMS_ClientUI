import { actionTypes } from "../actions/const";

const initialState = {
  groupId:null
};

const onBoardReducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionTypes.SET_ONBOARD_GROUP_ID:
            return {
                ...state,
                groupId:action.payload
            }
        default:
            return state;
    }
}

export default onBoardReducer;