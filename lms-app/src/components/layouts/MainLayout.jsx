import React from "react";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";

import theme from "../../theme/theme";
import Sidebar from "../sidebar/Sidebar";
import PanelContainer from "./PanelContainer";
import PanelContent from "./PanelContent";
import MainPanel from "./MainPanel";
import AdminNavbar from "../navbar/AdminNavbar";
import { roles } from "../../utils/roles";
import { useSelector } from "react-redux";
import { studentRoutes, teacherRoutes } from "../../routes";
import { AuthErrorAlert } from "../alerts/AuthErrorAlert";
import { AuthMessageAlert } from "../alerts/AuthMessageAlert";

function MainLayout({ children }) {
  const mainPanel = React.createRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userRoles = useSelector((state) => state.authReducer.roles);
  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar
        logoText={"LMS"}
        display="none"
        routes={
          userRoles.some(
            (r) =>
              r == roles.Teacher || r == roles.SuperAdmin || r == roles.Admin
          )
            ? teacherRoutes
            : studentRoutes
        }
      />
      <MainPanel
        ref={mainPanel}
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <AdminNavbar onOpen={onOpen} />
        <PanelContent>
          <PanelContainer>
            <AuthErrorAlert />
            <AuthMessageAlert />
            {children}
          </PanelContainer>
        </PanelContent>
        {/* <Footer /> */}
      </MainPanel>
    </ChakraProvider>
  );
}

export default MainLayout;
