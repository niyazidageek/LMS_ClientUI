import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { Flex, Text, Grid, useColorModeValue, Image } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import { getSubmissionsByLessonIdAction } from "../../../actions/assignmentActions";
import { getLessonByIdAction } from "../../../actions/lessonActions";
import { distinctBy } from "../../../utils/distinctBy";
import StudentSubmissionsModal from "./StudentSubmissionsModal";

function LessonSubmissions() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalContent, setModalContent] = useState({
    name: null,
    surname: null,
    submissions: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const submissions = useSelector(
    (state) => state.assignmentReducer.submissions
  );
  const lesson = useSelector((state) => state.lessonReducer.lesson);
  const count = useSelector((state) => state.assignmentReducer.count);
  const token = useSelector((state) => state.authReducer.jwt);
  const currentGroupId = useSelector((state) => state.onBoardReducer.groupId);

  useEffect(() => {
    dispatch(getSubmissionsByLessonIdAction(id, token));
    dispatch(getLessonByIdAction(id));
  }, []);

  function handleModal(id, name, surname) {
    let tempSubmissions = submissions.filter(
      (s) => s.appUserId == id && s.isSubmitted == true
    );
    setModalContent({
      name: name,
      surname: surname,
      submissions: tempSubmissions,
    });
    setIsOpen((prev) => !prev);
  }

  function assignmentClick(id) {
    let path = history.location.pathname.split("submissions")[0];
    path = path.concat("assignments/" + id);
    history.push(path);
  }

  if (!currentGroupId) {
    return (
      <Text
        fontSize="4xl"
        fontWeight="bold"
        pos="absolute"
        top="50%"
        left="50%"
        textAlign="center"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <Text>Oops!</Text>
        <Text color="teal.300">
          You do not participate in any of the groups yet!
        </Text>
      </Text>
    );
  }

  return isFetching || !submissions || !lesson ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card
        h={{ xl: "640px" }}
        justifyContent="space-between"
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
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
                  {lesson.assignments && lesson.assignments.length != 0 ? (
                    lesson.assignments.map((a, index) => {
                      return (
                        <Card
                          _hover={{
                            bg: "#c9c9c9",
                          }}
                          onClick={() => assignmentClick(a.id)}
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
                            {++index}. {a.name}
                          </Text>
                          <Text fontWeight="bold">
                            Deadline:{" "}
                            {dateHelper.isLessonOver(a.deadline) ? (
                              <Text display="inline-block" color="red.500">
                                {dateHelper.normalizedDate(a.deadline)}
                              </Text>
                            ) : (
                              <Text display="inline-block" color="green.500">
                                {dateHelper.normalizedDate(a.deadline)}
                              </Text>
                            )}
                          </Text>
                        </Card>
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
              <StudentSubmissionsModal
                onClick={() => handleModal()}
                value={isOpen}
                modalContent={modalContent}
              />
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
                  {submissions && submissions.length != 0 ? (
                    distinctBy(submissions).map((au, index) => {
                      return (
                        <Card
                          _hover={{
                            bg: "#c9c9c9",
                          }}
                          onClick={() =>
                            handleModal(au.appUserId, au.name, au.surname)
                          }
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
                          <Text fontWeight="bold">
                            Submissions:{" "}
                            <Text
                              fontWeight="bold"
                              display="inline-block"
                              color="teal.300"
                            >
                              {
                                submissions.filter(
                                  (s) =>
                                    s.appUserId == au.appUserId && s.isSubmitted
                                ).length
                              }
                              /
                              {
                                submissions.filter(
                                  (s) => s.appUserId == au.appUserId
                                ).length
                              }
                            </Text>
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

export default LessonSubmissions;
