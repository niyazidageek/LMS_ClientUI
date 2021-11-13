import React from "react";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from '../../theme/theme'
import Sidebar from "../sidebar/Sidebar";
import PanelContainer from './PanelContainer'
import PanelContent from './PanelContent'
import MainPanel from './MainPanel'
import AdminNavbar from "../navbar/AdminNavbar.js";
import routes from '../../routes'

function MainLayout({ children }) {
  const mainPanel = React.createRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar logoText={"LMS"} display="none" routes={routes}/>
      <MainPanel
        ref={mainPanel}
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <AdminNavbar onOpen={onOpen} />
        <PanelContent>
          <PanelContainer>{children}</PanelContainer>
        </PanelContent>
        {/* <Footer /> */}
      </MainPanel>
    </ChakraProvider>
  );
}

export default MainLayout;
