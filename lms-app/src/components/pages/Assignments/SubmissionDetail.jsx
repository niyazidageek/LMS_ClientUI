import React, { useState, useEffect, useRef } from "react";
// Chakra imports
import { Formik, Form, Field } from "formik";
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  FormControl,
  Box,
  Input,
  FormErrorMessage,
  Icon,
  Link,
  Td,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaCheckCircle,
  FaFileUpload,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useHistory, useParams } from "react-router";
import { actionTypes } from "../../../actions/const";
// Custom components
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import {
  getAssignmentByIdAction,
  getStudentsAssignmentByIdAction,
  getSubmissionsByLessonIdAction,
  submitAssignmentByIdAction,
} from "../../../actions/assignmentActions";
import { fileHelper } from "../../../utils/fileHelper";
import { getLessonByIdAction } from "../../../actions/lessonActions";
import { distinctBy } from "../../../utils/distinctBy";

function SubmissionDetail() {
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const submissions = useSelector(
    (state) => state.assignmentReducer.submissions
  );
  const lesson = useSelector((state) => state.lessonReducer.lesson);
  const count = useSelector((state) => state.assignmentReducer.count);
  const token = useSelector((state) => state.authReducer.jwt);

  useEffect(() => {
    dispatch(getSubmissionsByLessonIdAction(id, token));
    dispatch(getLessonByIdAction(id));
  }, []);

  function assignmentClick(id) {
    let path = history.location.pathname.split("submissions")[0];
    path = path.concat("assignments/" + id);
    history.push(path);
  }

  function studentClick(id){
    let path = history.location.pathname.split("lesson")[0];
    path = path.concat("detail/"+id);
    history.push(path);
  }

  return isFetching || !submissions || !lesson ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Submissions:{" "}
            <Text
              color="teal.300"
              display="inline-block"
              fontSize="xl"
              fontWeight="semi-bold"
            >
              {submissions.filter((s) => s.isSubmitted).length}/{count}
            </Text>
          </Text>
        </CardHeader>
        <CardBody flexDirection="column">
          <Grid
            w="100%"
            templateColumns={{ sm: "1fr", xl: "repeat(2 , 1fr)" }}
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
                  Assignments
                </Text>
              </CardHeader>
              <CardBody px="5px">
                <Flex direction="column">
                  {lesson.assignments && lesson.assignments.length != 0 ? (
                    lesson.assignments.map((a, index) => {
                      return (
                        <Flex align="start" mb="18px">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            me="10px"
                          >
                            {++index})
                          </Text>
                          <Text
                            onClick={() => assignmentClick(a.id)}
                            fontSize="md"
                            borderBottom="1px"
                            _hover={{ color: "teal.300", cursor: "pointer" }}
                            color="teal.400"
                            fontWeight="400"
                          >
                            {a.name}
                          </Text>
                        </Flex>
                      );
                    })
                  ) : (
                    <Text fontSize="lg" textAlign="center" fontWeight="bold">
                      This lesson doesn't have any assignments
                    </Text>
                  )}
                </Flex>
              </CardBody>
            </Card>
            <Card boxShadow="xl" p="16px">
              <CardHeader pb="1rem">
                <Text
                  fontSize="xl"
                  color="teal.400"
                  fontWeight="bold"
                  me="10px"
                  borderBottom="2px solid"
                >
                  Students
                </Text>
              </CardHeader>
              <CardBody px="5px">
                <Flex direction="column" width='100%'>
                  {submissions && submissions.length != 0 ? (
                    distinctBy(submissions).map((au, index) => {
                      return (
                        <Card
                        _hover={{
                          bg: "#c9c9c9",
                        }}
                          onClick={()=>studentClick(au.id)}
                          flexDirection="row"
                          alignItems="center"
                          bg="whitesmoke"
                          my="0.3rem"
                          p="0.5rem"
                          borderRadius="5px"
                          boxShadow="md"
                          justifyContent="space-between"
                        >
                          <Text fontWeight="bold">
                            {++index}. {au.name} {au.surname}
                          </Text>
                          <Text color='teal.300' fontWeight="bold">
                          {
                              submissions.filter(
                                (s) => s.appUserId == au.appUserId && s.isSubmitted
                              ).length
                            }
                            /
                            {
                              submissions.filter((s) => s.appUserId == au.id)
                                .length
                            }
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
                      This assignment doesn't have any submissions
                    </Text>
                  )}
                </Flex>
              </CardBody>
            </Card>
          </Grid>

          <Grid
            w="100%"
            mt="22px"
            templateColumns={{ sm: "1fr", xl: "repeat(1 , 1fr)" }}
            gap="22px"
          ></Grid>
        </CardBody>
        <Button
          onClick={() => history.goBack()}
          lineHeight="unset"
          bg="transparent"
          outlineColor="teal.300"
          _hover={{
            bg: "teal.400",
            color: "white",
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

export default SubmissionDetail;
