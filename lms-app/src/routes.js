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
} from "./components/icons/Icons";

var dashRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
    component: StudentHome,
    layout: "/teacher",
  },
  {
    path: "/home",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
    component: StudentHome,
    layout: "/student",
  },
  {
    path: "/fig",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
    component: Home,
    layout: "/teacher",
  },
];
export default dashRoutes;
