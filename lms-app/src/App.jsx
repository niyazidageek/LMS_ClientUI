import React, { useEffect } from "react";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {PrivateRoute} from "./utils/PrivateRoute";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Register/Register";
import RequestResetPassword from "./components/pages/RequestResetPassword/RequestResetPassword";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
import ConfirmEmail from "./components/pages/EmailConfirmation/ConfirmEmail";
import { useValidateToken } from "./hooks/useValidateToken";
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



function App() {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const userRoles = useSelector((state) => state.authReducer.roles);
  
  useValidateToken();

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
                  userRoles.some(r=>r==roles.Teacher || r==roles.SuperAdmin || r==roles.Admin)?
                  <Redirect to="/teacher/home"/> :
                  ( userRoles.some(r=>r==roles.Student) &&  <Redirect to="/student/home"/>)
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />

            <Route path="/videochat">
              <PrivateRoute exact path="/videochat/startlesson/:id" 
                rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]}
                component={StartLesson}
              />
            </Route>

             <Route path="/student">
               <MainLayout>
                  <PrivateRoute exact path="/student/home" 
                    rolesRestriction={[roles.Student]}
                    component={StudentHome}
                    />
                  <PrivateRoute exact path="/student/profile" component={Profile}/>
                  <PrivateRoute exact path="/student/lessons" component={StudentLessons}/>
                  <PrivateRoute exact path="/student/assignments" />
                  <PrivateRoute exact path="/student/assignments/:id" component={StudentAssignmentDetail}/>
                  <PrivateRoute exact path="/student/theories" />
                  <PrivateRoute exact path="/student/theories/detail/:id" component={StudentTheoryDetail}/>
                  <PrivateRoute exact path="/student/lessons/:id" component={StudentLessonDetail}/>
               </MainLayout>
             </Route>

             <Route path="/teacher">
               <MainLayout>
                  <PrivateRoute exact path="/teacher/home" 
                    rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]}
                    component={TeacherHome}
                    />
                     <PrivateRoute exact path="/teacher/profile" component={Profile}/>
                     <PrivateRoute exact path="/teacher/lessons" component={TeacherLessons}/>
                     <PrivateRoute exact path="/teacher/lessons/:id" component={TeacherLessonDetail}/>
                     <PrivateRoute exact path="/teacher/lessons/edit/:id" component={EditLesson}/>
                     <PrivateRoute exact path="/teacher/assignments" component={TeacherAssignments} />
                     <PrivateRoute exact path="/teacher/assignments/:id" component={TeacherAssignmentDetail}/>
                     <PrivateRoute exact path="/teacher/assignments/edit/:id" component={EditAssignment}/>
                     <PrivateRoute exact path="/teacher/theories" component={TeacherTheories} />
                     <PrivateRoute exact path="/teacher/theories/detail/:id" component={TeacherTheoryDetail}/>
                     <PrivateRoute exact path="/teacher/theories/edit/:id" component={EditTheory}/>
                     <PrivateRoute exact path="/teacher/theories/create"  component={CreateTheory}/>
                     <PrivateRoute exact path="/teacher/submissions" component={Submissions} />
                     <PrivateRoute exact path="/teacher/submissions/detail/:id" component={SubmissionDetail} />
                     <PrivateRoute exact path="/teacher/submissions/lesson/:id" component={LessonSubmissions} />
                     <PrivateRoute exact path="/teacher/submissions/statistics" component={SubmissionStatistics} />
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
