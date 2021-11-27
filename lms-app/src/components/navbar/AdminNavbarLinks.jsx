import { BellIcon, SearchIcon } from "@chakra-ui/icons";

import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  CloseButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Badge,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import "./navbar.scss";

import { useEffect, useState } from "react";
import { roles } from "../../utils/roles";
import { ItemContent } from "../menu/ItemContent";
import { SidebarResponsive } from "../sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { studentRoutes, teacherRoutes } from "../../routes";
import { logOutAction } from "../../actions/authActions";
import { IoLogIn } from "react-icons/io5";
import { useToast } from "@chakra-ui/toast";
import {
  getUnreadNotifications,
  markNotificationAsReadById,
} from "../../services/notificationService";
import { dateHelper } from "../../utils/dateHelper";

export default function HeaderLinks(props) {
  const userRoles = useSelector((state) => state.authReducer.roles);
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const token = useSelector((state) => state.authReducer.jwt);
  const [notifications, setNotifications] = useState([]);
  const appUserNotification = useSelector(
    (state) => state.notificationReducer.appUserNotification
  );
  const toast = useToast();
  const dispatch = useDispatch();

  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }

  useEffect(() => {
    let resp = getUnreadNotifications(token);
    resp.then((res) => {
      setNotifications(res.data);
    });
  }, []);

  useEffect(() => {
    if (appUserNotification) {
      toast({
        title: appUserNotification.notification.content,
        position: "top-right",
        isClosable: true,
      });
      setNotifications((prev) => [appUserNotification, ...prev]);
    }
  }, [appUserNotification]);

  function handleReadNotification(id) {
    setNotifications(notifications.filter((n) => n.id != id));
    markNotificationAsReadById(id, token);
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row"
      mt={{ sm: "8px", md: "unset" }}
    >
      {/* <InputGroup
        width="100%"
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        w={{
          sm: "128px",
          md: "200px",
        }}
        // me={{ sm: "auto", md: "20px" }}
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
      >
        <InputLeftElement
          children={
            <IconButton
              bg="inherit"
              borderRadius="inherit"
              _hover="none"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
            ></IconButton>
          }
        />
        <Input
          fontSize="xs"
          py="11px"
          color={mainText}
          placeholder="Type here..."
          borderRadius="inherit"
        />
      </InputGroup> */}

      <Flex>
        <IoLogIn
          id="logout-button"
          style={{ margin: "0 0.3rem" }}
          alignSelf="center"
          color="gray"
          size={25}
          onClick={() => {
            dispatch(logOutAction());
          }}
        />
        <Menu>
          <MenuButton>
            <BellIcon
              m={{ xl: "0", sm: "0 0.3rem" }}
              id="notification-button"
              margin="0 0.3rem"
              color="gray"
              w="25px"
              h="25px"
            />
          </MenuButton>
          <MenuList maxH="300px" overflowX="auto">
            {notifications.length != 0 ? (
              <Flex flexDirection="column">
                {notifications.map((n) => {
                  return (
                    <MenuItem
                      closeOnSelect={false}
                      justifyContent="space-between"
                      borderRadius="8px"
                    >
                      <ItemContent
                        time={dateHelper.getNotificationAgoTimeString(
                          n.notification.creationDate
                        )}
                        boldInfo={n.notification.content}
                      />
                      <CloseButton
                        onClick={() => handleReadNotification(n.id)}
                        color="red"
                        alignSelf="baseline"
                      />
                    </MenuItem>
                  );
                })}
              </Flex>
            ) : (
              <Flex pos="relative" height="70px" flexDirection="column">
                <Text
                  textAlign="center"
                  lineHeight="unset"
                  whiteSpace="nowrap"
                  pos="absolute"
                  top="50%"
                  left="50%"
                  style={{ transform: "translate(-50%,-50%)" }}
                  color="gray.500"
                >
                  No new notifications..
                </Text>
              </Flex>
            )}
          </MenuList>
        </Menu>

        <Flex>
          <SidebarResponsive
            logoText={props.logoText}
            secondary={props.secondary}
            routes={
              userRoles.some(
                (r) =>
                  r == roles.Teacher ||
                  r == roles.SuperAdmin ||
                  r == roles.Admin
              )
                ? teacherRoutes
                : studentRoutes
            }
            {...rest}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
