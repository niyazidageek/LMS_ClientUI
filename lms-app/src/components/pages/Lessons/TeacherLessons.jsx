import React, { useState, useEffect, useMemo } from "react";
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import { actionTypes } from "../../../actions/const";
// Custom components
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import ReactPaginate from "react-paginate";
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
import { getMoreTeachersLessonsAction } from "../../../actions/lessonActions";

function TeacherLessons() {
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
  let size = 3;
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
      getMoreTeachersLessonsAction(token, currentGroupId, pageTake, size)
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
      getMoreTeachersLessonsAction(token, currentGroupId, number - 1, size)
    );
    setLessons(newLessons);
  };

  function lessonClick(id) {
    let path = history.location.pathname + "/" + id;
    history.push(path);
  }

  function lessonEditCLick(id){
    let path = history.location.pathname + "/edit" + "/" + id;
    history.push(path);
  }

  return isFetching || !lessons ? (
    <SpinnerComponent />
  ) : lessons.length != 0 ? (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Lessons
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
                  Start time
                </Th>
                <Th textAlign="center" color="gray.400">
                  End time
                </Th>
                <Th textAlign="center" color="gray.400">
                  Edit
                </Th>
                <Th textAlign="center" color="gray.400">
                  View
                </Th>
                <Th textAlign="center" color="gray.400">
                  Delete
                </Th>
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
                    _hover={{
                      bg: "whitesmoke",
                    }}
                  >
                    <Td textAlign="center">{lesson.name}</Td>
                    <Td textAlign="center">{startDate}</Td>
                    <Td textAlign="center">{endDate}</Td>
                    <Td textAlign="center">
                      <Button
                        borderRadius="6px"
                         _hover={{ bg: "yellow.500" }}
                        lineHeight="none"
                        bg="yellow.400"
                        onClick={()=>lessonEditCLick(lesson.id)}
                        color="white"
                      >
                        Edit
                      </Button>
                    </Td>
                    <Td textAlign="center">
                      <Button
                        onClick={()=>lessonClick(lesson.id)}
                        borderRadius="6px"
                        _hover={{ bg: "teal.400" }}
                        lineHeight="none"
                        bg="teal.300"
                        color="white"
                      >
                        View
                      </Button>
                    </Td>
                    <Td textAlign="center">
                      <Button
                        borderRadius="6px"
                        _hover={{ bg: "red.600" }}
                        lineHeight="none"
                        bg="red.500"
                        color="white"
                      >
                        Delete
                      </Button>
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
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Text textAlign="center" fontSize="xl" fontWeight="bold">
          You have no lessons..
        </Text>
      </Card>
    </Flex>
  );
}

export default TeacherLessons;
