import React, { useState, useEffect } from "react";
import { Flex, Text, Button, useColorModeValue } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import SpinnerComponent from "../../spinners/SpinnerComponent";

import { getStudentsQuizInfoByIdAction } from "../../../actions/quizActions";
import SubmissionResultModal from "./SubmissionResultModal";

function StudentQuizDetail() {
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const quiz = useSelector((state) => state.quizReducer.quizInfo);

  function handleModal() {
    setIsOpen((prev) => !prev);
  }

  function startQuiz() {
    history.replace({
      pathname: "/quizzes/onboard",
      state: { quiz: quiz },
    });
  }

  useEffect(() => {
    dispatch(getStudentsQuizInfoByIdAction(id, token));
  }, []);

  return isFetching || !quiz ? (
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

          {quiz.appUserQuizzes[0].isSubmitted && (
            <Text fontSize="xl" color="gray.400" fontWeight="bold">
              Result:{" "}
              <Text
                color={textColor}
                display="inline-block"
                fontSize="xl"
                fontWeight="semi-bold"
              >
                {quiz.appUserQuizzes[0].correctAnswers}/{quiz.questionCount}
              </Text>
            </Text>
          )}
        </CardHeader>
        <CardBody h={{ base: "max-content", xl: "380px" }}>
          <Card boxShadow="xl" p="16px">
            <CardHeader justifyContent="space-between" pb="1rem">
              <Text
                fontSize="xl"
                color="teal.400"
                fontWeight="bold"
                me="10px"
                borderBottom="2px solid"
                height="max-content"
              >
                Info
              </Text>
              {quiz.appUserQuizzes[0].isSubmitted ? (
                <Button
                  color="white"
                  bg="green.500"
                  _hover={{
                    bg: "green.600",
                  }}
                  borderRadius="6px"
                  lineHeight="initial"
                  onClick={() => handleModal()}
                >
                  View submission
                </Button>
              ) : (
                <Button
                  color="white"
                  onClick={() => startQuiz()}
                  bg="green.500"
                  _hover={{
                    bg: "green.600",
                  }}
                  borderRadius="6px"
                  lineHeight="initial"
                >
                  Start quiz
                </Button>
              )}

              <SubmissionResultModal
                value={isOpen}
                onClick={() => handleModal()}
                appUserOptions={quiz.appUserOptions}
              />
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
                    {dateHelper.isLate(new Date(), quiz.deadline) ? (
                      <Text fontSize="md" color="red.500" fontWeight="400">
                        {dateHelper.normalizedDateWithVerbalDateAndTime(
                          quiz.deadline
                        )}{" "}
                        (late)
                      </Text>
                    ) : (
                      <Text fontSize="md" color="green.500" fontWeight="400">
                        {dateHelper.normalizedDateWithVerbalDateAndTime(
                          quiz.deadline
                        )}
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
                    Number of questions:
                  </Text>
                  <Text fontSize="md" color="teal.500" fontWeight="400">
                    {quiz.questionCount}
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
                              Math.floor(quiz.durationSeconds / 3600) * 3600) /
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
                    Status:
                  </Text>
                  {quiz.appUserQuizzes[0].isSubmitted ? (
                    <Text fontSize="md" color="green.500" fontWeight="400">
                      Submitted!
                    </Text>
                  ) : (
                    <Text fontSize="md" color="red.500" fontWeight="400">
                      Not submitted yet!
                    </Text>
                  )}
                </Flex>

                {quiz.appUserQuizzes[0].isSubmitted && (
                  <Flex align="start" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Your score:
                    </Text>
                    <Text fontSize="md" fontWeight="400">
                      {quiz.appUserQuizzes[0].result}
                    </Text>
                  </Flex>
                )}

                <Flex align="start" mb="18px">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    me="10px"
                  >
                    Maximum point:
                  </Text>
                  <Text fontSize="md" color="teal.500" fontWeight="400">
                    {quiz.quizMaxPoint.maxPoint}
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
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

export default StudentQuizDetail;
