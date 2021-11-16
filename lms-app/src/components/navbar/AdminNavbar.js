// Chakra Imports
import { Select } from "chakra-react-select";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import AdminNavbarLinks from "./AdminNavbarLinks";
import { useDispatch, useSelector } from "react-redux";
import { getStudentHomeAction } from "../../actions/studentHomeActions";
import {
  setOnBoardAction,
  setOnBoardGroupId,
} from "../../actions/onBoardActions";

export default function AdminNavbar(props) {
  const dispatch = useDispatch();
  const { variant, children, fixed, secondary, brandText, onOpen, ...rest } =
    props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = useColorModeValue("gray.700", "gray.200");
  let secondaryText = useColorModeValue("gray.400", "gray.200");
  let navbarPosition = "absolute";
  let navbarFilter = "none";
  let navbarBackdrop = "blur(21px)";
  let navbarShadow = "none";
  let navbarBg = "none";
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let paddingX = "15px";
  if (props.fixed === true)
    if (props.secondary) {
      navbarBackdrop = "none";
      navbarPosition = "absolute";
      mainText = "white";
      secondaryText = "white";
      secondaryMargin = "22px";
      paddingX = "30px";
    }

  const groups = useSelector((state) => state.onBoardReducer.groups);
  const currentGroupId = useSelector((state) => state.onBoardReducer.groupId);

  var a = useSelector((state) => state.onBoardReducer);
  const [currentGroup, setCurrentGroup] = useState(null);

  useEffect(() => {
    if (groups && currentGroupId) {
      setCurrentGroup(groups.find((gr) => gr.id == currentGroupId));
    }
    console.log(a);
  }, [currentGroupId]);

  function handleChange(id) {
    dispatch(setOnBoardAction({ groupId: id, groups }));
  }

  return (
    <Flex
      zIndex="1"
      position={navbarPosition}
      boxShadow={navbarShadow}
      backgroundColor='white !important'
      bg={navbarBg}
      filter={navbarFilter}
      borderWidth="1.5px"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      borderRadius="16px"
      display="flex"
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      left="50%"
      style={{ transform: "translate(-50%,0)" }}
      top="18px"
      p={{xl:'1rem',sm:'8px'}}
      w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 275px)" }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems="center"
      >
        <Box ml={{ sm: "1rem" }} width="100%" marginRight="1rem">
          {groups && currentGroup ? (
            <Select 
              width="500px"
              name="subjectId"
              closeMenuOnSelect={true}
              placeholder="Select subjects"
              value={{ label: `${currentGroup.name}`, value: currentGroup.id }}
              onChange={(value) => handleChange(value.value)}
              options={groups.map((gr) => ({
                label: `${gr.name}`,
                value: gr.id,
              }))}
            />
          ) : (
            <Select
              width="500px"
              name="subjectId"
              closeMenuOnSelect={true}
              placeholder="Select subjects"
              isDisabled={true}
            />
          )}
        </Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
