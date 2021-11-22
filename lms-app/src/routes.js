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
import { FaBook, FaCheck, FaFileAlt } from "react-icons/fa";

export const studentRoutes = [
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

export const teacherRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
    layout: "/teacher",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <ProfileIcon color="inherit" />,
    layout: "/teacher",
  },
  {
    path: "/lessons",
    name: "Lessons",
    icon: <MdPlayLesson color="inherit" />,
    layout: "/teacher",
  },
  {
    path: "/assignments",
    name: "Assignments",
    icon: <FaFileAlt color="inherit" />,
    layout: "/teacher",
  },
  {
    path: "/theories",
    name: "Theory",
    icon: <FaBook color="inherit" />,
    layout: "/teacher",
  },
  {
    path: "/submissions",
    name: "Submissions",
    icon: <FaCheck color="inherit" />,
    layout: "/teacher",
  }
]
