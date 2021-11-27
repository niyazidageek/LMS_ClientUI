import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import BgSignUp from "../../../assets/img/BgSignUp.png";
import { Flex, Box, useColorModeValue, Text } from "@chakra-ui/react";
import Timer from "../../timer/Timer";
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import { AuthMessageAlert } from "../../alerts/AuthMessageAlert";
import QuizContent from "./QuizContent";
import { getQuestionsByQuizId } from "../../../services/questionService";
import { Spinner } from "@chakra-ui/spinner";
import { submitQuizById } from "../../../services/quizService";

const Quiz = (props) => {
  const history = useHistory();
  const [isFetching, setIsFetching] = useState(false);
  const bgColor = useColorModeValue("white", "gray.700");
  const token = useSelector((state) => state.authReducer.jwt);
  let quiz = history.location.state.quiz;

  const time = new Date();
  const overAllTime = quiz.durationSeconds;
  time.setSeconds(time.getSeconds() + overAllTime);

  useEffect(() => {
    getQuestionsByQuizId(quiz.id).then((res) => {
      let quizAnswers = [];
      res.data.map((q) => {
        let answer = {
          questionId: q.id,
          optionId: null,
        };
        quizAnswers.push(answer);
      });
      quizAnswers = JSON.stringify(quizAnswers);
      sessionStorage.setItem("quizAnswers", quizAnswers);
    });
  }, []);

  function handleSubmit() {
    setIsFetching(true);
    let quizAnswers = JSON.parse(sessionStorage.getItem("quizAnswers"));
    let resultMessage;
    submitQuizById(quiz.id, { quizAnswers }, token)
      .then((res) => {
        setIsFetching(false);
        resultMessage = res.data;
      })
      .then(() => {
        history.replace({
          pathname: "/quizzes/offboard",
          state: { title: "Congratulations", message: resultMessage.message },
        });
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
          position="relative"
          w={{ md: "calc(100vw - 30px)" }}
          h={{ base: "100vh", md: "calc(100vh - 30px)" }}
          boxSizing="border-box"
          borderRadius={{ md: "15px" }}
          left="0"
          right="0"
          bgRepeat="no-repeat"
          // overflow="hidden"
          top="0"
          bgImage={BgSignUp}
          bgSize="cover"
          mx={{ md: "auto" }}
          my={{ md: "14px" }}
          width="100%"
        >
          <NavLink
            to="/student/home"
            style={{ position: "absolute", left: "2%", top: "2%" }}
          >
            <Text fontWeight="bold" color="white">
              Go to home
            </Text>
          </NavLink>
          <Flex
            width="100%"
            pos="absolute"
            direction="column"
            textAlign="center"
            justifyContent="center"
            align="center"
            top="50%"
            left="50%"
            style={{ transform: "translate(-50%,-50%)" }}
          >
            <Text fontSize="4xl" color="white" fontWeight="bold">
              Quiz: {quiz.name}
            </Text>
            <Flex
              p="1rem"
              direction="column"
              justifyContent="center"
              borderRadius="15px"
              width="50%"
              backgroundColor="transparent"
            >
              <Timer
                expiryTimestamp={time}
                overAllTime={overAllTime}
                isFetching={isFetching}
                onExpire={() => handleSubmit()}
              />
            </Flex>
            <Flex
              width="100%"
              alignItems="center"
              justifyContent="center"
              mb="60px"
              mt="20px"
            >
              <Flex
                direction="column"
                boxSize="5xl"
                background="transparent"
                borderRadius="15px"
                p="40px"
                mx={{ base: "100px" }}
                height="100%"
                bg={bgColor}
                boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
              >
                <Flex
                  flexDirection="column"
                  alignItems="felx-start"
                  maxW="100%"
                  mt="0px"
                >
                  {isFetching ? (
                    <Spinner />
                  ) : (
                    <QuizContent
                      questionCount={quiz.questionCount}
                      quizId={quiz.id}
                    />
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Quiz;
