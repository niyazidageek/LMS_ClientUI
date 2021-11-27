import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import BgSignUp from "../../../assets/img/BgSignUp.png";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Box,
  useColorModeValue,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import { Formik, Field, Form } from "formik";

import Cookies from "universal-cookie";
import { FaExclamationTriangle } from "react-icons/fa";

const QuizOnBoard = () => {
  const history = useHistory();
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.jwt);
  const name = useSelector((state) => state.authReducer.name);

  function handleSubmit(values) {
    const { name } = values;
    if (history.location.state) {
      const roomId = history.location.state.roomId;
      const cookies = new Cookies();
      cookies.set("userName", name, { path: "/" });
      let path = history.location.pathname.split("onboard")[0];
      path = "room/" + roomId;
      const win = window.open(path, "_blank");
      win.focus();
    }
  }

  return (
    <>
      <AuthErrorAlert />
      <AuthMessageAlert />
      <Flex
        direction="column"
        alignSelf="center"
        justifySelf="center"
        overflow="hidden"
      >
        <Box
          position="absolute"
          minH={{ base: "70vh", md: "50vh" }}
          w={{ md: "calc(100vw - 50px)" }}
          borderRadius={{ md: "15px" }}
          left="0"
          right="0"
          bgRepeat="no-repeat"
          overflow="hidden"
          zIndex="-1"
          top="0"
          bgImage={BgSignUp}
          bgSize="cover"
          mx={{ md: "auto" }}
          mt={{ md: "14px" }}
        ></Box>
        <Flex
          direction="column"
          textAlign="center"
          justifyContent="center"
          align="center"
          mt="6.5rem"
          mb="30px"
        >
          <Text fontSize="4xl" color="white" fontWeight="bold">
            Time to test yourself!
          </Text>
          <Text
            fontSize="md"
            color="white"
            fontWeight="normal"
            mt="10px"
            mb="26px"
            w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
          >
            Start the quiz by clicking the button below.
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
          <Flex
            direction="column"
            boxSize="2xl"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: "100px" }}
            height="100%"
            bg={bgColor}
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          >
            <Text textAlign="center" fontWeight="bold" fontSize="3xl">
              Quiz:{" "}
              <Text display="inline-block" color="teal.300">
                math quiz
              </Text>
            </Text>

            <Box my='1rem'>
              <Text fontWeight="bold" color="gray.400">
                Number of questions:{" "}
                <Text fontWeight="bold" display="inline-block" color="teal.300">
                  12
                </Text>
              </Text>

              <Text fontWeight="bold" color="gray.400">
                Duration of quiz:{" "}
                <Text fontWeight="bold" display="inline-block" color="teal.300">
                  1 hour 5 minutes
                </Text>
              </Text>

              <Text fontWeight="bold" color="gray.400">
                Maximum point:{" "}
                <Text fontWeight="bold" display="inline-block" color="teal.300">
                  50.00
                </Text>
              </Text>
            </Box>


            <Flex alignItems='center' justifyContent='center' color='yellow.400'>
            <Text lineHeight='unset' me='0.3rem' display='inline-block' textAlign="center" fontWeight="bold" fontSize="3xl">
             Warning
            </Text>
            <FaExclamationTriangle size={30} />
            </Flex>


            <Box mt='1rem'>
                <Text  color='yellow.400' fontWeight='bold' >If you reload or quit the page, your answers will not be saved!</Text>
                <Text  fontWeight='bold' color='red.500'>Once the time finishes, your quiz will be automatically submitted!</Text>

            </Box>

            <Button
              type="submit"
              bg="teal.300"
              fontSize="13px"
              color="white"
              fontWeight="bold"
              w="100%"
              h="45"
              mt="24px"
              mb="24px"
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}
            >
              START
            </Button>

            <Flex
              flexDirection="column"
              alignItems="felx-start"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                <Link
                  color={titleColor}
                  as="span"
                  ms="5px"
                  onClick={() => history.goBack()}
                  fontWeight="bold"
                >
                  Go back
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default QuizOnBoard;
