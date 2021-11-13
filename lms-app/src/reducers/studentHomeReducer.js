import { actionTypes } from "../actions/const";

const initialState = {
  teacher:null,
  progressPercentage:null,
  totalAssignments:null,
  submittedAssignmentsCount:null,
  totalTheories:null,
  readTheoriesCount:null,
  currentPoint:null,
  lessons:[],
  groups:[],
  currentGroupId:null
};

const studentHomeReducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionTypes.GET_STUDENT_HOME_CONTENT:
            return {
                ...state,
                teacher:action.payload.teacher,
                progressPercentage:action.payload.progressPercentage,
                totalAssignments:action.payload.totalAssignments,
                submittedAssignmentsCount:action.payload.submittedAssignmentsCount,
                totalTheories:action.payload.totalTheories,
                currentPoint:action.payload.currentPoint,
                readTheoriesCount:action.payload.readTheoriesCount,
                lessons:action.payload.lessons,
                groups:action.payload.groups,
                currentGroupId:action.payload.currentGroupId
            }
        default:
            return state;
    }
}

export default studentHomeReducer;
