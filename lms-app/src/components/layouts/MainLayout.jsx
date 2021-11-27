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
import LoadingBar from "react-top-loading-bar";

function MainLayout({ children }) {
  const mainPanel = React.createRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userRoles = useSelector((state) => state.authReducer.roles);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
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
        h="100%"
      >
        <AdminNavbar onOpen={onOpen} />
        <PanelContent>
          <PanelContainer>
            <AuthErrorAlert />
            <AuthMessageAlert />
            {isFetching && <LoadingBar color="teal" progress={90} />}
            {children}
          </PanelContainer>
        </PanelContent>
        {/* <Footer /> */}
      </MainPanel>
    </ChakraProvider>
  );
}

export default MainLayout;
