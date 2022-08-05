import React, { useEffect } from "react";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {PrivateRoute} from "./utils/PrivateRoute";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import RequestResetPassword from "./components/pages/RequestResetPassword/RequestResetPassword";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
import ConfirmEmail from "./components/pages/EmailConfirmation/ConfirmEmail";
import { useValidateToken } from "./hooks/useValidateToken";
import {useRefreshHub} from "./hooks/useRefreshHub"
import { roles } from "./utils/roles";
import MainLayout from "./components/layouts/MainLayout";
import StudentHome from "./components/pages/Home/StudentHome";
import Profile from "./components/pages/Profile/Profile";
import RequestChangeEmail from "./components/pages/RequestChangeEmail/RequestChangeEmail";
import StudentLessons from "./components/pages/Lessons/StudentLessons";
import StudentLessonDetail from "./components/pages/Lessons/StudentLessonDetail";
import StudentAssignmentDetail from "./components/pages/Assignments/StudentAssignmentDetail";
import StudentTheoryDetail from "./components/pages/Theories/StudentTheoryDetail";
import TeacherHome from "./components/pages/Home/TeacherHome";
import TeacherLessons from "./components/pages/Lessons/TeacherLessons";
import TeacherLessonDetail from "./components/pages/Lessons/TeacherLessonDetail";
import TeacherAssignmentDetail from "./components/pages/Assignments/TeacherAssignmentDetail";
import TeacherTheoryDetail from "./components/pages/Theories/TeacherTheoryDetail";
import EditLesson from "./components/pages/Lessons/EditLesson";
import TeacherAssignments from "./components/pages/Assignments/TeacherAssignments";
import EditAssignment from "./components/pages/Assignments/EditAssignment";
import TeacherTheories from "./components/pages/Theories/TeacherTheories";
import CreateTheory from "./components/pages/Theories/CreateTheory";
import EditTheory from "./components/pages/Theories/EditTheory";
import Submissions from "./components/pages/Assignments/Submissions";
import LessonSubmissions from "./components/pages/Assignments/LessonSubmissions";
import SubmissionDetail from "./components/pages/Assignments/SubmissionDetail";
import SubmissionStatistics from "./components/pages/Assignments/SubmissionStatistics";
import StartLesson from "./components/pages/Lessons/StartLesson";
import OnBoardPage from "./components/pages/VideoChat/OnBoardPage/OnBoardPage";
import VideoChat from "./components/pages/VideoChat/VideoChat";
import OffBoardPage from "./components/pages/VideoChat/OffBoardPage";
import QuizOnBoard from "./components/pages/Quizzes/QuizOnBoard";
import Quiz from "./components/pages/Quizzes/Quiz";
import TeacherQuizzes from "./components/pages/Quizzes/TeacherQuizzes";
import EditQuiz from "./components/pages/Quizzes/EditQuiz";
import TeacherQuizDetail from "./components/pages/Quizzes/TeacherQuizDetail";
import TeacherQuestionDetail from "./components/pages/Questions/TeacherQuestionDetail";
import EditQuestion from "./components/pages/Questions/EditQuestion";
import TeacherOptionDetail from "./components/pages/Options/TeacherOptionDetail";
import EditOption from "./components/pages/Options/EditOption";
import StudentQuizzes from "./components/pages/Quizzes/StudentQuizzes";
import StudentQuizDetail from "./components/pages/Quizzes/StudentQuizDetail";
import QuizOffBoardPage from "./components/pages/Quizzes/QuizOffBoard";
import DemoOnBoard from "./components/pages/Home/DemoOnboard";
import Application from "./components/pages/Application/Application";




function App() {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const userRoles = useSelector((state) => state.authReducer.roles);
  const isMailConfirmed = useSelector((state) => state.authReducer.isMailConfirmed);
  
  useValidateToken();
  useRefreshHub();

  

  return (
    <>
    <Router>
          <Switch>
            <ChakraProvider>

            <Route
              exact
              path="/"
              render={() => {
                return isLoggedIn && userRoles.length!=0 ? (
                  !isMailConfirmed ? <Redirect to="/demo/onboard"/> :
                  userRoles.some(r=>r==roles.Teacher || r==roles.SuperAdmin || r==roles.Admin)?
                  <Redirect to="/teacher/home"/> :
                  ( userRoles.some(r=>r==roles.Student) &&  <Redirect to="/student/home"/>)
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
    
            <Route path='/demo'>
              <Route path='/demo/onboard' component={DemoOnBoard}/>
            </Route>

            <Route path="/quizzes">
            <PrivateRoute exact path="/quizzes/onboard" 
                rolesRestriction={[roles.Student]}
                component={QuizOnBoard}
              />
            <PrivateRoute exact path="/quizzes/content" rolesRestriction={[roles.Student]} component={Quiz}/>
            <PrivateRoute exact path="/quizzes/offboard" rolesRestriction={[roles.Student]} component={QuizOffBoardPage}/>
            </Route>

            <Route path="/videochat">
              <PrivateRoute exact path="/videochat/startlesson/:id" 
                rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]}
                component={StartLesson}
              />
              <PrivateRoute exact path="/videochat/onboard" component={OnBoardPage} />
              <PrivateRoute exact path="/videochat/room/:id" component={VideoChat} />
              <PrivateRoute exact path="/videochat/offboard" component={OffBoardPage} />
            </Route>

             <Route path="/student">
               <MainLayout>
                  <PrivateRoute exact path="/student/home" 
                    rolesRestriction={[roles.Student]}
                    component={StudentHome}
                    />
                  <PrivateRoute exact path="/student/application" 
                    rolesRestriction={[roles.Student]}
                    component={Application}
                    />
                    
                  <PrivateRoute exact path="/student/profile" rolesRestriction={[roles.Student]} component={Profile}/>
                  <PrivateRoute exact path="/student/lessons" rolesRestriction={[roles.Student]} component={StudentLessons}/>
                  <PrivateRoute exact path="/student/assignments" />
                  <PrivateRoute exact path="/student/assignments/:id" rolesRestriction={[roles.Student]} component={StudentAssignmentDetail}/>
                  <PrivateRoute exact path="/student/theories" />
                  <PrivateRoute exact path="/student/theories/detail/:id" rolesRestriction={[roles.Student]} component={StudentTheoryDetail}/>
                  <PrivateRoute exact path="/student/lessons/:id" rolesRestriction={[roles.Student]} component={StudentLessonDetail}/>
                  <PrivateRoute exact path="/student/quizzes" rolesRestriction={[roles.Student]} component={StudentQuizzes}/>
                  <PrivateRoute exact path="/student/quizzes/:id" rolesRestriction={[roles.Student]} component={StudentQuizDetail}/>
               </MainLayout>
             </Route>

             <Route path="/teacher">
               <MainLayout>
                  <PrivateRoute exact path="/teacher/home" 
                    rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]}
                    component={TeacherHome}
                    />
                     <PrivateRoute exact path="/teacher/profile"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={Profile}/>
                     <PrivateRoute exact path="/teacher/lessons"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={TeacherLessons}/>
                     <PrivateRoute exact path="/teacher/lessons/:id"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={TeacherLessonDetail}/>
                     <PrivateRoute exact path="/teacher/lessons/edit/:id" rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={EditLesson}/>
                     <PrivateRoute exact path="/teacher/assignments" rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={TeacherAssignments} />
                     <PrivateRoute exact path="/teacher/assignments/:id" rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={TeacherAssignmentDetail}/>
                     <PrivateRoute exact path="/teacher/assignments/edit/:id" rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={EditAssignment}/>
                     <PrivateRoute exact path="/teacher/theories"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={TeacherTheories} />
                     <PrivateRoute exact path="/teacher/theories/detail/:id"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={TeacherTheoryDetail}/>
                     <PrivateRoute exact path="/teacher/theories/edit/:id"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={EditTheory}/>
                     <PrivateRoute exact path="/teacher/theories/create"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]}  component={CreateTheory}/>
                     <PrivateRoute exact path="/teacher/submissions"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={Submissions} />
                     <PrivateRoute exact path="/teacher/submissions/detail/:id"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={SubmissionDetail} />
                     <PrivateRoute exact path="/teacher/submissions/lesson/:id"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={LessonSubmissions} />
                     <PrivateRoute exact path="/teacher/submissions/statistics"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={SubmissionStatistics} />
                     <PrivateRoute exact path="/teacher/quizzes"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={TeacherQuizzes} />
                     <PrivateRoute exact path="/teacher/quizzes/detail/:id"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={TeacherQuizDetail}/>
                     <PrivateRoute exact path="/teacher/quizzes/edit/:id"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={EditQuiz}/>
                     <PrivateRoute exact path="/teacher/quizzes/question/detail/:id"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={TeacherQuestionDetail}/>
                     <PrivateRoute exact path="/teacher/quizzes/question/edit/:id"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={EditQuestion}/>
                     <PrivateRoute exact path="/teacher/quizzes/option/detail/:id"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={TeacherOptionDetail}/>
                     <PrivateRoute exact path="/teacher/quizzes/option/edit/:id"  rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]} component={EditOption}/>
                </MainLayout>
             </Route>

              <Route path="/requestchangeemail" component={RequestChangeEmail}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/requestresetpassword" component={RequestResetPassword}/>
              <Route path="/resetpassword" component={ResetPassword}/>
              <Route path="/confirmemail/:id/:token/:newEmail?" component={ConfirmEmail} />
            </ChakraProvider>
          </Switch>
      </Router>
    </>
  );
}

export default App;
