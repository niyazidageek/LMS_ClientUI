import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import { Redirect } from "react-router";
import {
  Box,
  Link,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { confirmEmailAction, logOutAction, sendConfirmEmailAction } from "../../../actions/authActions";

const DemoOnBoard = () => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const jwt = useSelector((state) => state.authReducer.jwt);
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const dispatch = useDispatch();

    function handleSendConfirmEmail() {
      if(jwt){
          dispatch(sendConfirmEmailAction(jwt)).then(()=>{
              dispatch(logOutAction())
          })
      }
    }

  if(!isLoggedIn){
      return <Redirect to='/login'/>
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
          You haven't confirmed your email yet! <br />
          <Text as={"span"} color={"teal.300"}>
            Click the button below if you still haven't received a confirmation
            mail
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
            onClick={() => handleSendConfirmEmail()}
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
            Re-send confirmation
          </Button>
          <Text fontWeight="medium" color={titleColor}>
            <Link
              onClick={() =>
                dispatch(logOutAction())
              }
              color={titleColor}
              as="span"
              ms="5px"
              fontWeight="bold"
            >
              Log out
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
};

export default DemoOnBoard;
