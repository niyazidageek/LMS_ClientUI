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
import { getMoreStudentsLessonsAction } from "../../../actions/lessonActions";

function StudentLessons() {
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const [lessons, setLessons] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const newLessons = useSelector((state) => state.lessonReducer.lessons);
  const total = useSelector((state) => state.lessonReducer.count);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const currentGroupId = useSelector((state) => state.onBoardReducer.groupId);
  let history = useHistory();
  let size = 9;
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

  useMemo(() => {
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });
    let pageTake = page ? currentPage - 1 : currentPage;
    dispatch(
      getMoreStudentsLessonsAction(token, currentGroupId, pageTake, size)
    );
    setPageCount(Math.ceil(total / size));
    setLessons(newLessons);
  }, [currentGroupId]);

  useMemo(() => {
    if (newLessons) {
      setLessons(newLessons);
    }
  }, [newLessons]);

  const handlePageClick = (number) => {
    setCurrentPage(number);
    let currentPath = history.location.pathname;
    history.push(currentPath + `?page=${number}`);
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });
    dispatch(
      getMoreStudentsLessonsAction(token, currentGroupId, number - 1, size)
    );
    setLessons(newLessons);
  };

  function lessonClick(id) {
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

  return isFetching || !lessons ? (
    <SpinnerComponent />
  ) : lessons.length != 0 ? (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card height="610px" overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Lessons
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr color="gray.400">
                <Th color="gray.400">Name</Th>
                <Th color="gray.400">Start time</Th>
                <Th color="gray.400">End time</Th>
              </Tr>
            </Thead>
            <Tbody fontWeight="semibold">
              {lessons.map((lesson) => {
                let startDate = dateHelper.normalizedDateWithVerbalDateAndTime(
                  lesson.startDate
                );
                let endDate = dateHelper.normalizedDateWithVerbalDateAndTime(
                  lesson.endDate
                );
                return (
                  <Tr
                    onClick={() => lessonClick(lesson.id)}
                    _hover={{
                      bg: "whitesmoke",
                    }}
                  >
                    <Td>{lesson.name}</Td>
                    <Td>{startDate}</Td>
                    <Td>{endDate}</Td>
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
    <Flex pos="relative" direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card h="610px" overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Text
          pos="absolute"
          left="50%"
          top="50%"
          style={{ transform: "translate(-50%,-50%)" }}
          textAlign="center"
          fontSize="xl"
          fontWeight="bold"
        >
          You have no lessons..
        </Text>
      </Card>
    </Flex>
  );
}

export default StudentLessons;
