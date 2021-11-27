import React, { useState, useEffect, useMemo } from "react";
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";

import { actionTypes } from "../../../actions/const";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";
import SpinnerComponent from "../../spinners/SpinnerComponent";

import { getMoreStudentsQuizzesByGroupIdAction } from "../../../actions/quizActions";

function StudentQuizzes() {
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const [quizzes, setQuizzes] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const newQuizzes = useSelector((state) => state.quizReducer.quizzes);
  const total = useSelector((state) => state.quizReducer.count);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const currentGroupId = useSelector((state) => state.onBoardReducer.groupId);
  let history = useHistory();
  let size = 8;
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page");
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
    total: total,
    initialState: {
      pageSize: size,
      isDisabled: false,
      currentPage: (page && parseInt(page)) ?? 0,
    },
  });

  function fetchMore() {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });
    let pageTake = page ? currentPage - 1 : currentPage;
    dispatch(
      getMoreStudentsQuizzesByGroupIdAction(
        token,
        currentGroupId,
        pageTake,
        size
      )
    );
  }

  useEffect(() => {
    fetchMore();
    setPageCount(Math.ceil(total / size));
    setQuizzes(newQuizzes);
  }, [currentGroupId]);

  useEffect(() => {
    if (newQuizzes) {
      setQuizzes(newQuizzes);
    }
  }, [newQuizzes]);

  const handlePageClick = (number) => {
    setCurrentPage(number);
    let currentPath = history.location.pathname;
    history.push(currentPath + `?page=${number}`);
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });
    dispatch(
      getMoreStudentsQuizzesByGroupIdAction(
        token,
        currentGroupId,
        number - 1,
        size
      )
    );
    setQuizzes(newQuizzes);
  };

  function quizClick(id) {
    let path = history.location.pathname + "/" + id;
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

  return isFetching || !quizzes ? (
    <SpinnerComponent />
  ) : quizzes.length != 0 ? (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card height="620px" overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px" justifyContent="space-between">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Quizzes
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr color="gray.400">
                <Th textAlign="center" color="gray.400">
                  Name
                </Th>
                <Th textAlign="center" color="gray.400">
                  Deadline
                </Th>
                <Th textAlign="center" color="gray.400">
                  Status
                </Th>
                <Th textAlign="center" color="gray.400">
                  Result
                </Th>
              </Tr>
            </Thead>
            <Tbody fontWeight="semibold">
              {quizzes.map((quiz) => {
                let deadline = dateHelper.normalizedDateWithVerbalDateAndTime(
                  quiz.deadline
                );
                return (
                  <Tr
                    onClick={() => quizClick(quiz.id)}
                    _hover={{
                      bg: "whitesmoke",
                    }}
                  >
                    <Td textAlign="center">{quiz.name}</Td>
                    <Td textAlign="center">
                      {dateHelper.isLate(new Date(), quiz.deadline) ? (
                        <Text color="red.500">{deadline}</Text>
                      ) : (
                        <Text color="green.500">{deadline}</Text>
                      )}
                    </Td>
                    <Td textAlign="center">
                      {quiz.appUserQuizzes[0].isSubmitted ? (
                        <Flex color="green.500" justifyContent="center">
                          <Text>Submitted!</Text>
                        </Flex>
                      ) : (
                        <Flex color="red.500" justifyContent="center">
                          <Text>Not submitted yet!</Text>
                        </Flex>
                      )}
                    </Td>
                    <Td textAlign="center">
                      {quiz.appUserQuizzes[0].isSubmitted ? (
                        <Flex justifyContent="center">
                          <Text>
                            {quiz.appUserQuizzes[0].result.toFixed(2)}
                          </Text>
                        </Flex>
                      ) : (
                        <Flex justifyContent="center">
                          <Text>No grade</Text>
                        </Flex>
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
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
            color="white"
            borderRadius="6px"
            _hover={{
              bg: "teal.400",
            }}
            bg="teal.300"
          >
            <Text>Previous</Text>
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
          >
            {pages.map((page) => (
              <PaginationPage
                lineHeight="none"
                w={7}
                h={7}
                borderRadius="6px"
                color="white"
                bg="gray.300"
                key={`pagination_page_${page}`}
                page={page}
                fontSize="sm"
                _hover={{
                  bg: "teal.400",
                }}
                _current={{
                  bg: "teal.300",
                  fontSize: "sm",
                  w: 7,
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            lineHeight="none"
            color="white"
            _hover={{
              bg: "teal.400",
            }}
            bg="teal.300"
            borderRadius="6px"
          >
            <Text>Next</Text>
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Flex>
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card h="610px" overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px" justifyContent="space-between">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Quizzes
          </Text>
        </CardHeader>
        <Text
          pos="absolute"
          left="50%"
          top="50%"
          style={{ transform: "translate(-50%,-50%)" }}
          textAlign="center"
          fontSize="xl"
          fontWeight="bold"
        >
          You have no quizzes..
        </Text>
      </Card>
    </Flex>
  );
}

export default StudentQuizzes;
