import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";

import axios from "axios";
import {
  Box,
  Link,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";
import { confirmEmailAction } from "../../../actions/authActions";

const ConfirmEmail = () => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const [confirmDone, setConfirmDone] = useState(false);
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const { id, token, newEmail } = useParams();
  const dispatch = useDispatch();

  function handleSubmit() {
    if (newEmail) {
      const values = { userId: id, token, newEmail };
      dispatch(confirmEmailAction(values));
    } else {
      const values = { userId: id, token };
      dispatch(confirmEmailAction(values));
    }
  }

  return (
    <Container maxW={"3xl"}>
      <AuthMessageAlert />
      <AuthErrorAlert />
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Confirm your email! <br />
          <Text as={"span"} color={"teal.300"}>
            Just click the button
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Without confirming your e-mail, you will not be able to get the
          maximum from our app 😕
        </Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Button
            isLoading={isFetching}
            type="submit"
            bg="teal.300"
            fontSize="15px"
            color="white"
            fontWeight="bold"
            onClick={() => handleSubmit()}
            w="100%"
            h="45"
            p="0 5rem"
            mb="35px"
            _hover={{
              bg: "teal.200",
            }}
            _active={{
              bg: "teal.400",
            }}
          >
            Confirm e-mail
          </Button>
          <Text fontWeight="medium" color={titleColor}>
            <NavLink to="/">
              <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                Go to home
              </Link>
            </NavLink>
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ConfirmEmail;
