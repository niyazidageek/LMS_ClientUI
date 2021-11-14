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
  groups:null,
  currentGroupId:null,
  lessonsCount:null
};

const studentHomeReducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionTypes.GET_STUDENT_HOME_CONTENT:
            console.log(action.payload);
            return {
                teacher:action.payload.data.teacher,
                progressPercentage:action.payload.data.progressPercentage,
                totalAssignments:action.payload.data.totalAssignments,
                submittedAssignmentsCount:action.payload.data.submittedAssignmentsCount,
                totalTheories:action.payload.data.totalTheories,
                currentPoint:action.payload.data.currentPoint,
                readTheoriesCount:action.payload.data.readTheoriesCount,
                lessons:action.payload.data.lessons,
                groups:action.payload.data.groups,
                currentGroupId:action.payload.data.currentGroupId,
                lessonsCount:action.payload.count
            }
        default:
            return state;
    }
}

export default studentHomeReducer;
