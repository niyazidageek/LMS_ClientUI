import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import BgSignUp from "../../../../assets/img/BgSignUp.png";
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
import { AuthErrorAlert } from "../../../alerts/AuthErrorAlert";
import { AuthMessageAlert } from "../../../alerts/AuthMessageAlert";
import { Formik, Field, Form } from "formik";
import joinVideoChatSchema from "../../../../validations/joinVideoChatSchema";
import Cookies from "universal-cookie";

const OnBoardPage = () => {
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
      console.log(roomId);
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
            Time to get education!
          </Text>
          <Text
            fontSize="md"
            color="white"
            fontWeight="normal"
            mt="10px"
            mb="26px"
            w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
          >
            Join the lesson by entering your name and clicking the button below.
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
            <Formik
              initialValues={{
                name: name ?? "",
              }}
              validationSchema={joinVideoChatSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <FormControl>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Join as
                        </FormLabel>
                        <Input
                          fontSize="sm"
                          borderRadius="15px"
                          type="text"
                          placeholder="Your name"
                          size="lg"
                          {...field}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

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
                    JOIN
                  </Button>
                </FormControl>
              </Form>
            </Formik>
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

export default OnBoardPage;
