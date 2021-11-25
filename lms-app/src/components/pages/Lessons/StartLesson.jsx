import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Cookies from "universal-cookie";
import BgSignUp from "../../../assets/img/BgSignUp.png";
import { db } from "../../../fireBase";
import {
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
import { startLessonByIdAction } from "../../../actions/lessonActions";

const StartLesson = () => {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const dispatch = useDispatch();
  let { id } = useParams();
  const history = useHistory();
  const name =  useSelector((state) => state.authReducer.name);
  const token = useSelector((state) => state.authReducer.jwt);
  const [localIsFetching, setLocalIsFetching] = useState(false);

  function handleStartLesson() {
    setLocalIsFetching(true);

    let dbRef = db.database().ref().push();
    let roomId = dbRef.key;
    let path = history.location.pathname.split("startlesson")[0];
    path = "/videochat/room/" + roomId;

    let data = {
      joinLink: roomId,
    };

    var resp = dispatch(startLessonByIdAction(id, data, token));



    resp.then((res) => {
      if (res) {
        const cookies = new Cookies();
        cookies.set("userName", name, { path: "/" });
        const win = window.open(path, "_blank");
        win.focus();
      }

      setLocalIsFetching(false);
    });
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
            Time to teach students!
          </Text>
          <Text
            fontSize="md"
            color="white"
            fontWeight="normal"
            mt="10px"
            mb="26px"
            w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
          >
            Start the lesson by clicking the button below.
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
          <Flex
            direction="column"
            boxSize="xl"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: "100px" }}
            height="100%"
            bg={bgColor}
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          >
            <Text alignSelf="center" fontSize="lg" fontWeight="bold">
              Lesson{" "}
              <Text
                display="inline-block"
                fontSize="lg"
                fontWeight="bold"
                color="teal.300"
              >
                #{id}
              </Text>
            </Text>

            <Button
              onClick={() => handleStartLesson()}
              isLoading={localIsFetching}
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

export default StartLesson;
