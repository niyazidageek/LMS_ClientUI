import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Grid, useColorModeValue } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";

import SpinnerComponent from "../../spinners/SpinnerComponent";
import { getLessonByIdAction } from "../../../actions/lessonActions";

function TeacherLessonDetail() {
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const lesson = useSelector((state) => state.lessonReducer.lesson);

  useEffect(() => {
    dispatch(getLessonByIdAction(id));
  }, []);

  function handleStartLesson(id) {
    let path = history.location.pathname.split("teacher")[0];
    path = path.concat("videochat/startlesson/" + id);
    history.push(path);
  }

  function assignmentClick(id) {
    let path = history.location.pathname.split("lessons")[0];
    path = path.concat("assignments/" + id);
    history.push(path);
  }

  function theoryClick(id) {
    let path = history.location.pathname.split("lessons")[0];
    path = path.concat("theories" + "/" + "detail" + "/" + id);
    history.push(path);
  }

  return isFetching || !lesson ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card
        h={{ xl: "620px" }}
        justifyContent="space-between"
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <CardHeader justifyContent="space-between" p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Lesson:{" "}
            <Text
              color={textColor}
              display="inline-block"
              fontSize="xl"
              fontWeight="semi-bold"
            >
              {lesson.name}
            </Text>
          </Text>
          {lesson.isOnline && !dateHelper.isLessonOver(lesson.endDate) ? (
            <Button
              color="white"
              bg="green.500"
              _hover={{
                bg: "green.600",
              }}
              borderRadius="6px"
              onClick={() => handleStartLesson(lesson.id)}
              lineHeight="initial"
            >
              Start the lesson
            </Button>
          ) : (
            <Button
              color="white"
              disabled={true}
              bg="green.500"
              _hover={{
                bg: "green.600",
              }}
              borderRadius="6px"
              lineHeight="initial"
            >
              Start the lesson
            </Button>
          )}
        </CardHeader>
        <CardBody>
          <Grid
            width="100%"
            templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }}
            gap="22px"
          >
            <Card boxShadow="xl" p="16px">
              <CardHeader pb="1rem">
                <Text
                  fontSize="xl"
                  color="teal.400"
                  fontWeight="bold"
                  me="10px"
                  borderBottom="2px solid"
                >
                  Info
                </Text>
              </CardHeader>
              <CardBody h={{ base: "max-content", xl: "380px" }} px="5px">
                <Flex direction="column">
                  <Flex align="start" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Description:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {lesson.description}
                    </Text>
                  </Flex>
                  <Flex align="center" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Start time:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {dateHelper.normalizedDateWithVerbalDateAndTime(
                        lesson.startDate
                      )}
                    </Text>
                  </Flex>
                  <Flex align="center" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      End time:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {dateHelper.normalizedDateWithVerbalDateAndTime(
                        lesson.endDate
                      )}
                    </Text>
                  </Flex>
                  <Flex align="center" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Format:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {lesson.isOnline ? "Online" : "Offline"}
                    </Text>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>

            <Card pos="relative" boxShadow="xl" p="16px">
              <CardHeader pb="1rem">
                <Text
                  fontSize="xl"
                  color="teal.400"
                  fontWeight="bold"
                  me="10px"
                  borderBottom="2px solid"
                >
                  Theory
                </Text>
              </CardHeader>
              <CardBody h={{ base: "max-content", xl: "380px" }} px="5px">
                <Flex
                  px="0.5rem"
                  py="0.2rem"
                  borderRadius="5px"
                  boxShadow="inner"
                  direction="column"
                  w="100%"
                  overflowY="scroll"
                  direction="column"
                  w="100%"
                >
                  {lesson.theories && lesson.theories.length != 0 ? (
                    lesson.theories.map((t, index) => {
                      return (
                        <Card
                          onClick={() => theoryClick(t.id)}
                          _hover={{
                            bg: "#c9c9c9",
                          }}
                          bg="whitesmoke"
                          my="0.3rem"
                          p="0.5rem"
                          borderRadius="5px"
                          boxShadow="md"
                        >
                          <Text fontWeight="bold">
                            {++index}. {t.name}
                          </Text>
                        </Card>
                      );
                    })
                  ) : (
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      pos="absolute"
                      left="50%"
                      top="50%"
                      style={{ transform: "translate(-50%,-50%)" }}
                      fontWeight="bold"
                    >
                      This lesson doesn't have any theory
                    </Text>
                  )}
                </Flex>
              </CardBody>
            </Card>

            <Card pos="relative" boxShadow="xl" p="16px">
              <CardHeader pb="1rem">
                <Text
                  fontSize="xl"
                  color="teal.400"
                  fontWeight="bold"
                  me="10px"
                  borderBottom="2px solid"
                >
                  Assignments
                </Text>
              </CardHeader>
              <CardBody h={{ base: "max-content", xl: "380px" }} px="5px">
                <Flex
                  px="0.5rem"
                  py="0.2rem"
                  borderRadius="5px"
                  boxShadow="inner"
                  direction="column"
                  w="100%"
                  overflowY="scroll"
                >
                  {lesson.assignments && lesson.assignments.length != 0 ? (
                    lesson.assignments.map((a, index) => {
                      return (
                        <Card
                          onClick={() => assignmentClick(a.id)}
                          _hover={{
                            bg: "#c9c9c9",
                          }}
                          bg="whitesmoke"
                          my="0.3rem"
                          p="0.5rem"
                          borderRadius="5px"
                          boxShadow="md"
                        >
                          <Text fontWeight="bold">
                            {++index}. {a.name}
                          </Text>
                        </Card>
                      );
                    })
                  ) : (
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      pos="absolute"
                      left="50%"
                      top="50%"
                      style={{ transform: "translate(-50%,-50%)" }}
                      fontWeight="bold"
                    >
                      This lesson doesn't have any assingments
                    </Text>
                  )}
                </Flex>
              </CardBody>
            </Card>
          </Grid>
        </CardBody>
        <Text
          onClick={() => history.goBack()}
          lineHeight="unset"
          fontWeight="bold"
          fontSize="large"
          bg="transparent"
          _hover={{
            cursor: "pointer",
            color: "teal.300",
          }}
          color="teal.400"
          mt="2rem"
          width="max-content"
        >
          Back
        </Text>
      </Card>
    </Flex>
  );
}

export default TeacherLessonDetail;
