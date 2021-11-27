import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Grid, useColorModeValue } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import { getQuizByIdAction } from "../../../actions/quizActions";
import MakeAvailableModal from "./MakeAvailableModal";
import CreateQuestionModal from "../Questions/CreateQuestionModal";

function TeacherQuizDetail() {
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [questionIsOpen, setQuestionIsOpen] = useState(false);
  const history = useHistory();
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const quiz = useSelector((state) => state.quizReducer.quiz);

  useEffect(() => {
    dispatch(getQuizByIdAction(id));
  }, []);

  function questionClick(id) {
    let path = history.location.pathname.split("detail")[0];
    path = path.concat("question" + "/" + "detail" + "/" + id);
    history.push(path);
  }

  function handleModal() {
    setIsOpen((prev) => !prev);
  }

  function handleQuestionModal() {
    setQuestionIsOpen((prev) => !prev);
  }

  return isFetching || !quiz ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card
        h={{ xl: "640px" }}
        justifyContent="space-between"
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <CardHeader justifyContent="space-between" p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Qiuz:{" "}
            <Text
              color={textColor}
              display="inline-block"
              fontSize="xl"
              fontWeight="semi-bold"
            >
              {quiz.name}
            </Text>
          </Text>

          <MakeAvailableModal
            onClick={() => handleModal()}
            value={isOpen}
            quizId={quiz.id}
          />
          {!quiz.isAvailable ? (
            <Button
              color="white"
              bg="green.500"
              _hover={{
                bg: "green.600",
              }}
              borderRadius="6px"
              onClick={() => handleModal()}
              lineHeight="initial"
            >
              Make the quiz available
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
              Make the quiz available
            </Button>
          )}
        </CardHeader>
        <CardBody>
          <Grid
            width="100%"
            templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }}
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
                      Deadline:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {dateHelper.normalizedDateWithVerbalDateAndTime(
                        quiz.deadline
                      )}
                    </Text>
                  </Flex>
                  <Flex align="start" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Duration:
                    </Text>
                    <Text
                      me="0.3rem"
                      fontSize="md"
                      color="gray.500"
                      fontWeight="400"
                    >
                      {Math.floor(quiz.durationSeconds / 3600) == 1 ? (
                        <Text>1 hour,</Text>
                      ) : (
                        <Text>
                          {Math.floor(quiz.durationSeconds / 3600)} hours,
                        </Text>
                      )}
                    </Text>

                    <Text
                      me="0.3rem"
                      fontSize="md"
                      color="gray.500"
                      fontWeight="400"
                    >
                      {Math.floor(
                        (quiz.durationSeconds -
                          Math.floor(quiz.durationSeconds / 3600) * 3600) /
                          60
                      ) == 1 ? (
                        <Text>1 minute,</Text>
                      ) : (
                        <Text>
                          {Math.floor(
                            (quiz.durationSeconds -
                              Math.floor(quiz.durationSeconds / 3600) * 3600) /
                              60
                          )}{" "}
                          minutes,
                        </Text>
                      )}
                    </Text>

                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {quiz.durationSeconds -
                        Math.floor(quiz.durationSeconds / 3600) * 3600 -
                        Math.floor(
                          (quiz.durationSeconds -
                            Math.floor(quiz.durationSeconds / 3600) * 3600) /
                            60
                        ) *
                          60 ==
                      1 ? (
                        <Text>1 second</Text>
                      ) : (
                        <Text>
                          {quiz.durationSeconds -
                            Math.floor(quiz.durationSeconds / 3600) * 3600 -
                            Math.floor(
                              (quiz.durationSeconds -
                                Math.floor(quiz.durationSeconds / 3600) *
                                  3600) /
                                60
                            ) *
                              60}{" "}
                          seconds
                        </Text>
                      )}
                    </Text>
                  </Flex>
                  <Flex align="start" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Availability:
                    </Text>
                    {quiz.isAvailable ? (
                      <Text fontSize="md" color="green.500" fontWeight="400">
                        Available
                      </Text>
                    ) : (
                      <Text fontSize="md" color="yellow.500" fontWeight="400">
                        Not available
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </CardBody>
            </Card>

            <Card pos="relative" boxShadow="xl" p="16px">
              <CardHeader justifyContent="space-between" pb="1rem">
                <Text
                  fontSize="xl"
                  color="teal.400"
                  fontWeight="bold"
                  me="10px"
                  borderBottom="2px solid"
                  height="max-content"
                >
                  Quesitons
                </Text>
                <Button
                  color="white"
                  bg="green.500"
                  _hover={{
                    bg: "green.600",
                  }}
                  borderRadius="6px"
                  lineHeight="initial"
                  onClick={() => handleQuestionModal()}
                >
                  Create a question
                </Button>

                <CreateQuestionModal
                  value={questionIsOpen}
                  quizId={quiz.id}
                  onClick={() => handleQuestionModal()}
                />
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
                  {quiz.questions && quiz.questions.length != 0 ? (
                    quiz.questions.map((q, index) => {
                      return (
                        <Card
                          onClick={() => questionClick(q.id)}
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
                            {++index}. {q.name}
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
                      This quiz doesn't have any questions
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

export default TeacherQuizDetail;
