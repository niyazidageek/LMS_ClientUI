import { actionTypes } from "../actions/const";

const initialState = {
  maxPoint:null,
  totalAssignments:null,
  totalTheories:null,
  lessons:[],
  groups:null,
  students:null,
  currentGroupId:null,
  lessonsCount:null
};

const teacherHomeReducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionTypes.GET_TEACHER_HOME_CONTENT:
            return {
                students:action.payload.data.students,
                maxPoint:action.payload.data.maxPoint,
                totalAssignments:action.payload.data.totalAssignments,
                totalTheories:action.payload.data.totalTheories,
                lessons:action.payload.data.lessons,
                groups:action.payload.data.groups,
                currentGroupId:action.payload.data.currentGroupId,
                lessonsCount:action.payload.count
            }
        default:
            return state;
    }
}

export default teacherHomeReducer;