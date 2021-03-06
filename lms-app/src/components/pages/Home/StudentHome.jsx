import {
  Box,
  Flex,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Card from "../../cards/Card";
import CardBody from "../../cards/CardBody";
import CardHeader from "../../cards/CardHeader";
import IconBox from "../../icons/IconBox";
import InfiniteScroll from "react-infinite-scroll-component";
import { GoBrowser } from "react-icons/go";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import { useValidateToken } from "../../../hooks/useValidateToken";
import { HiCursorClick } from "react-icons/hi";
import {
  FaChalkboardTeacher,
  FaChartPie,
  FaFileAlt,
  FaBook,
  FaSchool,
  FaVideo,
} from "react-icons/fa";
import { getStudentHomeAction } from "../../../actions/studentHomeActions";
import { dateHelper } from "../../../utils/dateHelper";
import { getMoreStudentsLessonsAction } from "../../../actions/lessonActions";

export default function StudentHome() {
  useValidateToken();
  const dispatch = useDispatch();
  const history = useHistory();
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const [hasMore, setHasMore] = useState(true);
  const link = useSelector((state) => state.joinLinkReducer.link);
  const homeContent = useSelector((state) => state.studentHomeReducer);
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const newLessons = useSelector((state) => state.lessonReducer.lessons);
  const onBoardGroupId = useSelector((state) => state.onBoardReducer.groupId);
  const [lessonsCount, setLessonsCount] = useState(0);
  const [lessons, setLessons] = useState([]);
  const [paging, setPaging] = useState(1);
  const size = 3;

  useEffect(() => {
    if (homeContent) {
      setLessons(homeContent.lessons);
      setLessonsCount(homeContent.lessonsCount);
    }
  }, [homeContent]);

  useEffect(() => {
    dispatch(getStudentHomeAction(token, onBoardGroupId));
  }, [onBoardGroupId]);

  const fetchMoreData = () => {
    if (lessons.length >= lessonsCount) {
      setHasMore(false);
      return;
    }
    dispatch(
      getMoreStudentsLessonsAction(token, onBoardGroupId, paging, size, 2)
    );

    setPaging(paging + 1);
  };

  useEffect(() => {
    if (newLessons) {
      setLessons(lessons.concat(newLessons));
    }
  }, [newLessons]);

  function handleLessonClick(id) {
    let path = history.location.pathname.split("home")[0];
    path = path.concat("lessons/" + id);
    history.push(path);
  }

  return isFetching || !homeContent.groups ? (
    <SpinnerComponent />
  ) : !onBoardGroupId ? (
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
  ) : (
    <Flex
      height="max-content"
      flexDirection="column"
      pt={{ base: "120px", md: "75px" }}
    >
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <Card minH="83px" justifyContent="center">
          <CardBody height="100%">
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto" height="100%">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Teacher
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="md" color={textColor}>
                    {homeContent.teacher
                      ? homeContent.teacher.name +
                        " " +
                        homeContent.teacher.surname
                      : "No teacher"}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                <FaChalkboardTeacher size={24} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px" justifyContent="center">
          <CardBody height="100%">
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat height="100%" mr="1rem">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Progress
                </StatLabel>
                <Text fontWeight="bold" fontSize="md">
                  {homeContent.progressPercentage}%
                </Text>
                <Progress
                  colorScheme="teal"
                  borderRadius="12px"
                  h="5px"
                  value={homeContent.progressPercentage}
                />
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                <FaChartPie size={24} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px" justifyContent="center">
          <CardBody height="100%">
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat height="100%">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Assignments
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="md" color={textColor}>
                    {homeContent.submittedAssignmentsCount ==
                    homeContent.totalAssignments
                      ? homeContent.submittedAssignmentsCount == 0 &&
                        homeContent.totalAssignments == 0
                        ? "No assignments yet!"
                        : "You have completed all assignments!"
                      : `${homeContent.submittedAssignmentsCount}/${homeContent.totalAssignments}`}
                  </StatNumber>
                </Flex>
              </Stat>

              <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                <FaFileAlt size={24} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px" justifyContent="center">
          <CardBody height="100%">
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat height="100%">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Theory
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="md" color={textColor}>
                    {homeContent.readTheoriesCount == homeContent.totalTheories
                      ? homeContent.readTheoriesCount == 0 &&
                        homeContent.totalTheories == 0
                        ? "No theory yet!"
                        : "You have read all materials!"
                      : `${homeContent.readTheoriesCount}/${homeContent.totalTheories}`}
                  </StatNumber>
                </Flex>
              </Stat>

              <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                <FaBook size={24} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card
        marginTop="3rem"
        p="16px"
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <CardHeader p="10px 5px" width="max-content">
          <Text
            textAlign="center"
            fontSize="lg"
            color={textColor}
            fontWeight="bold"
          >
            Upcoming lessons
          </Text>
        </CardHeader>
        <Box variant="simple" color={textColor}>
          <Box
            boxShadow="md"
            borderRadius="15px"
            id="scrollableDiv"
            width="100%"
            overflow="hidden"
            p="0 1rem"
            h={{ sm: "500px", md: "350px", xl: "450px" }}
            overflowY="scroll"
            pos="relative"
          >
            {lessons.length != 0 ? (
              <InfiniteScroll
                style={{ overflow: "unset" }}
                dataLength={lessons.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<SpinnerComponent />}
                scrollableTarget="scrollableDiv"
              >
                {lessons.map((lesson, index) => {
                  let startDate = dateHelper.normalizeDateToWeekDayAndDate(
                    lesson.startDate
                  );
                  let startTime = dateHelper.normalizeDateToTimeOnly(
                    lesson.startDate
                  );
                  let endTime = dateHelper.normalizeDateToTimeOnly(
                    lesson.endDate
                  );
                  let isLessonInProgress = dateHelper.isLessonInProgress(
                    lesson.startDate,
                    lesson.endDate
                  );
                  let isLessonOver = dateHelper.isLessonOver(lesson.endDate);
                  return (
                    <Card
                      justifyContent="space-between"
                      flexDirection="row"
                      m="1rem 0"
                      boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    >
                      <Flex
                        justifyContent="space-between"
                        flex="5"
                        flexDirection="column"
                      >
                        <CardHeader flexDirection="column">
                          <Flex
                            flexDirection="row"
                            justifyContent="space-between"
                          >
                            <Text
                              fontSize="lg"
                              color="gray.400"
                              fontWeight="bold"
                              marginBottom="1rem"
                              display="inline-block"
                            >
                              Lesson:{" "}
                              <Text display="inline-block" color={textColor}>
                                {lesson.name}
                              </Text>
                            </Text>
                            <Text
                              me="12px"
                              fontWeight="bold"
                              lineHeight="unset"
                              height="max-content"
                              color="teal.300"
                              display="inline-block"
                              onClick={() => handleLessonClick(lesson.id)}
                              _hover={{
                                cursor: "default",
                                color: "teal.200",
                              }}
                            >
                              View details
                            </Text>
                          </Flex>

                          <Text
                            fontSize="md"
                            color="gray.400"
                            fontWeight="bold"
                            mb="1rem"
                          >
                            Description:{" "}
                            <Text display="inline-block" color={textColor}>
                              {lesson.description}
                            </Text>
                          </Text>
                        </CardHeader>
                        <CardBody>
                          <SimpleGrid
                            mr="12px"
                            width="100%"
                            columns={{ sm: 3, md: 3, xl: 3 }}
                            spacing="12px"
                          >
                            <Card
                              p="0.5rem"
                              height="100%"
                              boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                            >
                              <CardBody>
                                <Flex
                                  flexDirection="row"
                                  align="center"
                                  justify="center"
                                  w="100%"
                                >
                                  <Stat me="auto">
                                    <StatLabel
                                      fontSize="sm"
                                      color="gray.400"
                                      fontWeight="bold"
                                    >
                                      Assignments
                                    </StatLabel>
                                    <Flex>
                                      <StatNumber
                                        fontWeight="medium"
                                        fontSize="sm"
                                        color={textColor}
                                      >
                                        {lesson.assignments.length > 0 ? (
                                          lesson.assignments.length > 1 ? (
                                            <Text fontWeight="bold">
                                              {lesson.assignments.reduce(
                                                (accumulator, curr) =>
                                                  accumulator +
                                                  curr.assignmentAppUsers
                                                    .length,
                                                0
                                              )}
                                              /{lesson.assignments.length}
                                            </Text>
                                          ) : (
                                            <Text fontWeight="bold">
                                              {lesson.assignments.map(
                                                (a) =>
                                                  a.assignmentAppUsers.length
                                              )}
                                              /{lesson.assignments.length}
                                            </Text>
                                          )
                                        ) : (
                                          <Text fontWeight="bold">
                                            No assignments
                                          </Text>
                                        )}
                                      </StatNumber>
                                    </Flex>
                                  </Stat>
                                  <FaFileAlt color="gray" />
                                </Flex>
                              </CardBody>
                            </Card>

                            <Card
                              p="0.5rem"
                              height="100%"
                              boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                            >
                              <CardBody>
                                <Flex
                                  flexDirection="row"
                                  align="center"
                                  justify="center"
                                  w="100%"
                                >
                                  <Stat me="auto">
                                    <StatLabel
                                      fontSize="sm"
                                      color="gray.400"
                                      fontWeight="bold"
                                    >
                                      Theory
                                    </StatLabel>
                                    <Flex>
                                      <StatNumber
                                        fontWeight="medium"
                                        fontSize="sm"
                                        color={textColor}
                                      >
                                        {lesson.theories.length > 0 ? (
                                          lesson.theories.length > 1 ? (
                                            <Text fontWeight="bold">
                                              {lesson.theories.reduce(
                                                (accumulator, curr) =>
                                                  accumulator +
                                                  curr.theoryAppUsers.length,
                                                0
                                              )}
                                              /{lesson.theories.length}
                                            </Text>
                                          ) : (
                                            <Text fontWeight="bold">
                                              {lesson.theories.map(
                                                (a) => a.theoryAppUsers.length
                                              )}
                                              /{lesson.theories.length}
                                            </Text>
                                          )
                                        ) : (
                                          <Text fontWeight="bold">
                                            No theory
                                          </Text>
                                        )}
                                      </StatNumber>
                                    </Flex>
                                  </Stat>
                                  <FaBook color="gray" />
                                </Flex>
                              </CardBody>
                            </Card>

                            <Card
                              p="0.5rem"
                              height="100%"
                              boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                            >
                              <CardBody>
                                <Flex
                                  flexDirection="row"
                                  align="center"
                                  justify="center"
                                  w="100%"
                                >
                                  <Stat me="auto">
                                    <StatLabel
                                      fontSize="sm"
                                      color="gray.400"
                                      fontWeight="bold"
                                    >
                                      Webinar
                                    </StatLabel>
                                    <Flex alignItems="center">
                                      <StatNumber
                                        fontWeight="medium"
                                        fontSize="sm"
                                        color={textColor}
                                        display="flex"
                                        alignItems="center"
                                        textAlign="center"
                                      >
                                        {((lesson.lessonJoinLink && true) ||
                                          (link &&
                                            link.lessonId == lesson.id)) &&
                                        !isLessonOver ? (
                                          <Flex
                                            _hover={{ color: "teal.200" }}
                                            alignItems="center"
                                            color="teal.400"
                                          >
                                            <Link
                                              mr="0.1rem"
                                              to={{
                                                pathname: "/videochat/onboard",
                                                state: {
                                                  roomId: link
                                                    ? link.joinLink
                                                    : lesson.lessonJoinLink &&
                                                      lesson.lessonJoinLink
                                                        .joinLink,
                                                },
                                              }}
                                            >
                                              Join the lesson
                                            </Link>
                                            <HiCursorClick />
                                          </Flex>
                                        ) : (
                                          <Text fontWeight="bold">
                                            Webinar isn't available
                                          </Text>
                                        )}
                                      </StatNumber>
                                    </Flex>
                                  </Stat>
                                  <FaVideo color="gray" />
                                </Flex>
                              </CardBody>
                            </Card>
                          </SimpleGrid>
                        </CardBody>
                      </Flex>
                      <Flex
                        justifyContent="space-between"
                        borderRight="1px"
                        borderLeft="1px"
                        borderColor="lightgray"
                        flex="1"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Text
                          textAlign="center"
                          fontSize="md"
                          fontWeight="bold"
                        >
                          {startDate}
                        </Text>

                        <Text
                          textAlign="center"
                          fontSize="lg"
                          color="teal.500"
                          fontWeight="bold"
                          m="0.3rem 0"
                        >
                          {startTime}-{endTime}
                        </Text>

                        {lesson.isOnline ? (
                          <Flex color="green.500">
                            <Text
                              style={{ lineHeight: "1 !important" }}
                              fontWeight="bold"
                              fontSize="sm"
                              mr="0.3rem"
                            >
                              Online
                            </Text>
                            <GoBrowser style={{ alignSelf: "center" }} />
                          </Flex>
                        ) : (
                          <Flex color="yellow.500">
                            <Text
                              style={{ lineHeight: "1 !important" }}
                              fontWeight="bold"
                              fontSize="sm"
                              mr="0.3rem"
                            >
                              Offline
                            </Text>
                            <FaSchool />
                          </Flex>
                        )}

                        {isLessonInProgress ? (
                          <Box
                            marginTop="0.5rem"
                            p="0.4rem"
                            borderRadius="10px"
                            bg="green.500"
                            width="max-conten"
                          >
                            <Text
                              color="white"
                              textAlign="center"
                              fontWeight="bold"
                              fontSize="sm"
                              px="0.3rem"
                            >
                              In progress
                            </Text>
                          </Box>
                        ) : isLessonOver ? (
                          <Box
                            marginTop="0.5rem"
                            p="0.4rem"
                            borderRadius="10px"
                            bg="red.500"
                            width="max-conten"
                          >
                            <Text
                              color="white"
                              textAlign="center"
                              fontWeight="bold"
                              fontSize="sm"
                              px="0.3rem"
                            >
                              Lesson is over
                            </Text>
                          </Box>
                        ) : (
                          <Box
                            marginTop="0.5rem"
                            p="0.4rem"
                            borderRadius="10px"
                            bg="lightgray"
                            width="max-conten"
                          >
                            <Text
                              color="white"
                              textAlign="center"
                              fontWeight="bold"
                              fontSize="sm"
                              px="0.3rem"
                            >
                              Hasn't started yet
                            </Text>
                          </Box>
                        )}
                      </Flex>
                    </Card>
                  );
                })}
              </InfiniteScroll>
            ) : (
              <Text
                fontSize="xl"
                fontWeight="bold"
                pos="absolute"
                top="50%"
                left="50%"
                style={{ transform: "translate(-50%,-50%)" }}
              >
                You have no upcoming lessons..
              </Text>
            )}
          </Box>
        </Box>
      </Card>
    </Flex>
  );
}
