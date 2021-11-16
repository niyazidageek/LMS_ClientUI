// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets

// Custom Icons
import { ProfileIcon, SettingsIcon } from "../icons/Icons";
// Custom Components
import { ItemContent } from "../menu/ItemContent";
import { SidebarResponsive } from "../sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import { logOutAction } from "../../actions/authActions";
import { FaDoorOpen } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  // Chakra Color Mode
  const dispatch = useDispatch();
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();
  return (
    <Flex alignItems="center" justifyContent='space-between' flexDirection="row" mt={{ sm: "8px",md:"unset"}}>
      <InputGroup
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
      </InputGroup>

      <Flex>
        <IconButton
          bg="none"
          me={{ sm: "1px", md: "8px" }}
          ml={{ sm: "1px", md: "8px" }}
        >
          <IoLogIn
            color="gray"
            size={25}
            onClick={() => {
              dispatch(logOutAction());
            }}
          />
        </IconButton>
        <Menu>
          <MenuButton
            me={{ sm: "1px", md: "8px" }}
            ml={{ sm: "1px", md: "8px" }}
          >
            <BellIcon color="gray" w="25px" h="25px" />
          </MenuButton>
          <MenuList>

            <Flex flexDirection="column">
              <MenuItem borderRadius="8px">
                <ItemContent
                  time="13 minutes ago"
                  info="from Alicia"
                  boldInfo="New Message"
                  aName="Alicia"
                />
              </MenuItem>
              <MenuItem borderRadius="8px">
                <ItemContent
                  time="2 days ago"
                  info="by Josh Henry"
                  boldInfo="New Album"
                  aName="Josh Henry"
                />
              </MenuItem>
              <MenuItem borderRadius="8px">
                <ItemContent
                  time="3 days ago"
                  info="Payment succesfully completed!"
                  boldInfo=""
                  aName="Kara"
                />
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>

        <Flex me={{ sm: "1px", md: "8px" }} ml={{ sm: "1px", md: "8px" }}>
          <SidebarResponsive
            logoText={props.logoText}
            secondary={props.secondary}
            routes={routes}
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
