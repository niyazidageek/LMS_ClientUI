import React, { useState, useEffect } from "react";
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  Td,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

import { useHistory, useParams } from "react-router";
import { actionTypes } from "../../../actions/const";
// Custom components
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";

import SpinnerComponent from "../../spinners/SpinnerComponent";
import { getLessonByIdAction } from "../../../actions/lessonActions";
import { getUndoneAssignmentsByLessonIdAction } from "../../../actions/assignmentActions";
import { getStudentsTheoriesByLessonIdAction } from "../../../actions/theoryActions";

function StudentLessonDetail() {
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const lesson = useSelector((state) => state.lessonReducer.lesson);
  const undoneAssignments = useSelector(
    (state) => state.assignmentReducer.assignments
  );
  const studentsTheories = useSelector((state) => state.theoryReducer.theories);

  useEffect(() => {
    dispatch(getLessonByIdAction(id));
    dispatch(getUndoneAssignmentsByLessonIdAction(id, token));
    dispatch(getStudentsTheoriesByLessonIdAction(id, token));
  }, []);

  function assignmentClick(id) {
    let path = history.location.pathname.split("lessons")[0];
    path=path.concat("assignments/" + id);
    history.push(path)
  }

  function theoryClick(id) {
    console.log("theo click" + id);
  }

  return isFetching || !lesson || !undoneAssignments || !studentsTheories ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
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
        </CardHeader>
        <CardBody>
          <Grid
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
              <CardBody px="5px">
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
                      {lesson.isOnline ? 'Online' : 'Offline'}
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
              <CardBody px="5px">
                <Flex direction="column" w="100%">
                  {studentsTheories && studentsTheories.length != 0 ? (
                    studentsTheories.map((t, index) => {
                      return(t.theoryAppUsers[0].isRead ? (
                        <Card
                          flexDirection="row"
                          alignItems="center"
                          color="green"
                          bg="whitesmoke"
                          my="0.3rem"
                          p="0.5rem"
                          borderRadius="5px"
                          boxShadow="md"
                          justifyContent="space-between"
                        >
                          <Text fontWeight="bold">
                            {++index}. {t.name}
                          </Text>
                          <Flex alignItems="center">
                            <Text mx="0.5rem" fontWeight="bold">
                              Done!
                            </Text>
                            <FaCheckCircle />
                          </Flex>
                        </Card>
                      ) : (
                        <Card
                          onClick={() => theoryClick(t.id)}
                          _hover={{
                            bg: "gray.300",
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
                      ))
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
              <CardBody px="5px">
                <Flex direction="column" w="100%">
                  {undoneAssignments && undoneAssignments.length != 0 ? (
                    undoneAssignments.map((ua, index) => {
                      return ua.assignmentAppUsers[0].isSubmitted ? (
                        <Card
                          flexDirection="row"
                          alignItems="center"
                          color="green"
                          bg="whitesmoke"
                          my="0.3rem"
                          p="0.5rem"
                          borderRadius="5px"
                          boxShadow="md"
                          justifyContent="space-between"
                        >
                          <Text fontWeight="bold">
                            {++index}. {ua.name}
                          </Text>
                          <Flex alignItems="center">
                            <Text mx="0.5rem" fontWeight="bold">
                              Done!
                            </Text>
                            <FaCheckCircle />
                          </Flex>
                        </Card>
                      ) : (
                        <Card
                          onClick={() => assignmentClick(ua.id)}
                          _hover={{
                            bg: "gray.300",
                          }}
                          bg="whitesmoke"
                          my="0.3rem"
                          p="0.5rem"
                          borderRadius="5px"
                          boxShadow="md"
                        >
                          <Text fontWeight="bold">
                            {++index}. {ua.name}
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
        <Button
          onClick={() => history.goBack()}
          lineHeight="unset"
          bg='transparent'
          outlineColor="teal.300"
          _hover={{
            bg: "teal.400",
            color:'white'
          }}
          color="teal.400"
          mt="2rem"
          width="max-content"
        >
          Back
        </Button>
      </Card>
    </Flex>
  );
}

export default StudentLessonDetail;
