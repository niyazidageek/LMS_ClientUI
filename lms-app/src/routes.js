// import
import StudentHome from "./components/pages/Home/StudentHome";
import Home from "./components/pages/Home/Home";
// import Tables from "views/Dashboard/Tables.js";
// import Billing from "views/Dashboard/Billing.js";
// import RTLPage from "views/RTL/RTLPage.js";
// import Profile from "views/Dashboard/Profile.js";
// import SignIn from "views/Pages/SignIn.js";
// import SignUp from "views/Pages/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
  ProfileIcon,
} from "./components/icons/Icons";

import {MdPlayLesson} from 'react-icons/md'

var dashRoutes = [
  // {
  //   path: "/home",
  //   name: "Home",
  //   icon: <HomeIcon color="inherit" />,
  //   layout: "/teacher",
  // },
  {
    path: "/home",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
    layout: "/student",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <ProfileIcon color="inherit" />,
    layout: "/student",
  },
  {
    path: "/lessons",
    name: "Lessons",
    icon: <MdPlayLesson color="inherit" />,
    layout: "/student",
  },
];
export default dashRoutes;
