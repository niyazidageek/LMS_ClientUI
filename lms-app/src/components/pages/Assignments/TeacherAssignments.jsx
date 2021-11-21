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
// import CreateLessonModal from "./CreateLessonModal";
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
import { getAllAssignmentsByGroupIdAction } from "../../../actions/assignmentActions";
import CreateAssignmentModal from "./CreateAssignmentModal";

function TeacherAssignments() {
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const [assignments, setAssignments] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const newAssignments = useSelector((state) => state.assignmentReducer.assignments);
  const total = useSelector((state) => state.assignmentReducer.count);
  const [isOpen, setIsOpen] = useState(false);
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
      getAllAssignmentsByGroupIdAction(currentGroupId, pageTake, size)
    );
    setPageCount(Math.ceil(total / size));
    setAssignments(newAssignments);
  }, [currentGroupId]);

  useMemo(() => {
    if (newAssignments) {
      setAssignments(newAssignments);
    }
  }, [newAssignments]);

  const handlePageClick = (number) => {
    setCurrentPage(number);
    let currentPath = history.location.pathname;
    history.push(currentPath + `?page=${number}`);
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });
    dispatch(
      getAllAssignmentsByGroupIdAction(currentGroupId, number - 1, size)
    );
    setAssignments(newAssignments);
  };

  function assignmentClick(id) {
    let path = history.location.pathname + "/" + id;
    history.push(path);
  }

  function assignmentEditCLick(id) {
    let path = history.location.pathname + "/edit" + "/" + id;
    history.push(path);
  }

  function handleModal() {
    setIsOpen((prev) => !prev);
  }

  return isFetching || !assignments ? (
    <SpinnerComponent />
  ) : assignments.length != 0 ? (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px" justifyContent="space-between">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Assignments
          </Text>
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
            Create an assignment
          </Button>

          <CreateAssignmentModal
            onClick={() => handleModal()}
            value={isOpen}
            // lessonId={currentGroupId}
          />
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
                  Lesson name
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
              {assignments.map((assignment) => {
                let deadline = dateHelper.normalizedDateWithVerbalDateAndTime(
                    assignment.deadline
                );
                return (
                  <Tr
                    _hover={{
                      bg: "whitesmoke",
                    }}
                  >
                    <Td textAlign="center">{assignment.name}</Td>
                    <Td textAlign="center">{deadline}</Td>
                    <Td textAlign="center">{assignment.lesson.name}</Td>
                    <Td textAlign="center">
                      <Button
                        borderRadius="6px"
                        _hover={{ bg: "yellow.500" }}
                        lineHeight="none"
                        bg="yellow.400"
                        onClick={() => assignmentEditCLick(assignment.id)}
                        color="white"
                      >
                        Edit
                      </Button>
                    </Td>
                    <Td textAlign="center">
                      <Button
                        onClick={() => assignmentClick(assignment.id)}
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
          You have no assignments..
        </Text>
      </Card>
    </Flex>
  );
}

export default TeacherAssignments;
