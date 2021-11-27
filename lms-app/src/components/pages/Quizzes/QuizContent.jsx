import { Button } from "@chakra-ui/button";
import { Box, Flex, Text, Stack } from "@chakra-ui/layout";
import { RadioGroup, Radio } from "@chakra-ui/radio";
import React, { useState, useEffect, useRef } from "react";
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";
import { useHistory } from "react-router";
import { MdArrowForward } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { getQuestionByPageAndQuizId } from "../../../services/questionService";
import { useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/spinner";
import { Image } from "@chakra-ui/image";
import { fileHelper } from "../../../utils/fileHelper";
import { submitQuizById } from "../../../services/quizService";

const QuizContent = ({ questionCount, quizId }) => {
  const token = useSelector((state) => state.authReducer.jwt);
  const [pageCount, setPageCount] = useState(0);
  const [question, setQuestion] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [value, setValue] = useState(null);
  let size = 1;
  const history = useHistory();

  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: questionCount,
    initialState: {
      pageSize: size,
      isDisabled: false,
      currentPage: 1,
    },
  });

  useEffect(() => {
    if (question) {
      let quizAnswers = JSON.parse(sessionStorage.getItem("quizAnswers"));
      if (quizAnswers) {
        let currentQuestionIndex = quizAnswers.findIndex(
          (qa) => qa.questionId == question.id
        );
        let value;
        if (
          quizAnswers[currentQuestionIndex] != null &&
          quizAnswers[currentQuestionIndex] != undefined
        ) {
          value = quizAnswers[currentQuestionIndex].optionId;
        }

        if (value) {
          setValue((prev) => (prev = value));
        }
      }
    }
  }, [question]);

  const handleUnload = (e) => {
    const message = "o/";
    (e || window.event).returnValue = message;
    return message;
  };

  useEffect(() => {
    setPageCount(questionCount);
    getQuestionByPageAndQuizId(0, quizId, token).then((res) => {
      setQuestion(res.data);
    });
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  function optionChange(value) {
    value = parseInt(value);
    setValue((prev) => (prev = value));
    let quizAnswers = JSON.parse(sessionStorage.getItem("quizAnswers"));
    let currentQuestionIndex = quizAnswers.findIndex(
      (qa) => qa.questionId == question.id
    );
    quizAnswers[currentQuestionIndex].optionId = value;
    sessionStorage.setItem("quizAnswers", JSON.stringify(quizAnswers));
  }

  const handlePageClick = (number) => {
    setCurrentPage(number);
    getQuestionByPageAndQuizId(number - 1, quizId, token).then((res) => {
      setQuestion(res.data);
    });
  };

  function handleSubmit() {
    setIsFetching(true);
    let resultMessage;
    let quizAnswers = JSON.parse(sessionStorage.getItem("quizAnswers"));
    submitQuizById(quizId, { quizAnswers }, token)
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
    <Flex direction="column">
      <Flex justifyContent="space-between">
        <Text
          display="inline-block"
          color="gray.500"
          fontWeight="semibold"
          textAlign="start"
        >
          {currentPage} of {pagesCount}
        </Text>
        {currentPage == pagesCount && (
          <Button
            color="white"
            bg="green.500"
            _hover={{
              bg: "green.600",
            }}
            isLoading={isFetching}
            borderRadius="6px"
            lineHeight="initial"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        )}
      </Flex>
      <Flex mt="1rem" pos="relative" minH="200px">
        {!question ? (
          <Box
            pos="absolute"
            left="50%"
            top="50%"
            style={{ transform: "translate(-50%,-50%)" }}
          >
            <Spinner color="teal.300" />
          </Box>
        ) : (
          <Flex width="100%" flexDirection="column">
            <Flex direction="column">
              <Text textAlign="start" fontWeight="bold" fontSize="lg">
                <Text display="inline-block" fontSize="lg" color="teal.300">
                  {currentPage})
                </Text>{" "}
                {question.name}
              </Text>
              {question.filename && (
                <Image
                  my="0.5rem"
                  maxW="500px"
                  borderRadius="15px"
                  maxH="250px"
                  src={fileHelper.convertToUrl(question.filename)}
                />
              )}
            </Flex>

            <Flex mt="1rem" alignSelf="start">
              <RadioGroup onChange={(v) => optionChange(v)} value={value}>
                <Stack spacing={5} direction="column">
                  {question.options.map((o) => {
                    return (
                      <Radio
                        fontWeight="semibold"
                        colorScheme="teal"
                        value={o.id}
                      >
                        <Flex alignItems="center">
                          {o.name}
                          {o.filename && (
                            <Image
                              borderRadius="15px"
                              maxH="100px"
                              maxW="100px"
                              ms="0.5rem"
                              src={fileHelper.convertToUrl(o.filename)}
                            />
                          )}
                        </Flex>
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={handlePageClick}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
        >
          <PaginationPrevious
            lineHeight="none"
            width="max-content"
            color="white"
            borderRadius="6px"
            _hover={{
              bg: "teal.400",
            }}
            bg="teal.300"
          >
            <MdArrowBack />
          </PaginationPrevious>
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                lineHeight="none"
                bg="blue.300"
                fontSize="sm"
                borderRadius="6px"
                w={7}
                jumpSize={11}
              />
            }
          ></PaginationPageGroup>
          <PaginationNext
            lineHeight="none"
            color="white"
            _hover={{
              bg: "teal.400",
            }}
            bg="teal.300"
            borderRadius="6px"
          >
            <MdArrowForward />
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Flex>
  );
};

export default QuizContent;
