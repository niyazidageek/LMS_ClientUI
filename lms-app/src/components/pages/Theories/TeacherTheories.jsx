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
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import { actionTypes } from "../../../actions/const";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Card from "../../cards/Card";
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
import { getAllTheoriesByGroupIdAction } from "../../../actions/theoryActions";

function TeacherTheories() {
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const [theories, setTheories] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const newTheories = useSelector((state) => state.theoryReducer.theories);
  const total = useSelector((state) => state.theoryReducer.count);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const currentGroupId = useSelector((state) => state.onBoardReducer.groupId);
  let history = useHistory();
  let size = 6;
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
    dispatch(getAllTheoriesByGroupIdAction(currentGroupId, pageTake, size));
    setPageCount(Math.ceil(total / size));
    setTheories(newTheories);
  }, [currentGroupId]);

  useMemo(() => {
    if (newTheories) {
      setTheories(newTheories);
    }
  }, [newTheories]);

  const handlePageClick = (number) => {
    setCurrentPage(number);
    let currentPath = history.location.pathname;
    history.push(currentPath + `?page=${number}`);
    dispatch({
      type: actionTypes.SET_IS_FETCHING,
    });
    dispatch(getAllTheoriesByGroupIdAction(currentGroupId, number - 1, size));
    setTheories(newTheories);
  };

  function theoryClick(id) {
    let path = history.location.pathname + "/" + "detail/" + id;
    history.push(path);
  }

  function theoryEditCLick(id) {
    let path = history.location.pathname + "/edit" + "/" + id;
    history.push(path);
  }

  function handleCreate() {
    let path = history.location.pathname + "/create";
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

  return isFetching || !theories ? (
    <SpinnerComponent />
  ) : theories.length != 0 ? (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card height="610px" overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px" justifyContent="space-between">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Theory
          </Text>
          <Button
            color="white"
            bg="green.500"
            _hover={{
              bg: "green.600",
            }}
            borderRadius="6px"
            onClick={() => handleCreate()}
            lineHeight="initial"
          >
            Create theory
          </Button>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr color="gray.400">
                <Th textAlign="center" color="gray.400">
                  Name
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
              {theories.map((theory) => {
                return (
                  <Tr
                    _hover={{
                      bg: "whitesmoke",
                    }}
                  >
                    <Td textAlign="center">{theory.name}</Td>
                    <Td textAlign="center">{theory.lesson.name}</Td>
                    <Td textAlign="center">
                      <Button
                        borderRadius="6px"
                        _hover={{ bg: "yellow.500" }}
                        lineHeight="none"
                        bg="yellow.400"
                        onClick={() => theoryEditCLick(theory.id)}
                        color="white"
                      >
                        Edit
                      </Button>
                    </Td>
                    <Td textAlign="center">
                      <Button
                        onClick={() => theoryClick(theory.id)}
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
      <Card height="610px" overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px" justifyContent="space-between">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Theory
          </Text>
          <Button
            color="white"
            bg="green.500"
            _hover={{
              bg: "green.600",
            }}
            borderRadius="6px"
            onClick={() => handleCreate()}
            lineHeight="initial"
          >
            Create theory
          </Button>
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
          You have no theory..
        </Text>
      </Card>
    </Flex>
  );
}

export default TeacherTheories;
