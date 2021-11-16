// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Portal,
  Progress,
  SimpleGrid,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
// Custom components
import Card from "../../cards/Card";
import CardBody from "../../cards/CardBody";
import CardHeader from "../../cards/CardHeader";
import IconBox from "../../icons/IconBox";
import InfiniteScroll from "react-infinite-scroll-component";
// Custom icons
import {
  CartIcon,
  GlobeIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "../../icons/Icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import { useValidateToken } from "../../../hooks/useValidateToken";
// react icons
import {
  FaChalkboardTeacher,
  FaFile,
  FaChartPie,
  FaFileAlt,
  FaBook,
} from "react-icons/fa";
import { BsArrowRight, BsTypeH1 } from "react-icons/bs";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { getStudentHomeAction } from "../../../actions/studentHomeActions";
import { dateHelper } from "../../../utils/dateHelper";
import { getMoreLessons } from "../../../services/lessonService";
import { getMoreLessonsAction } from "../../../actions/lessonActions";

export default function StudentHome() {
  const value = "$100.000";
  useValidateToken();
  const dispatch = useDispatch();
  // Chakra Color Mode
  const { colorMode, toggleColorMode } = useColorMode();
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const [hasMore, setHasMore] = useState(true);
  const [series, setSeries] = useState([
    {
      type: "area",
      name: "Mobile apps",
      data: [190, 220, 205, 350, 370, 450, 400, 360, 210, 250, 292, 150],
    },
    {
      type: "area",
      name: "Websites",
      data: [400, 291, 121, 117, 25, 133, 121, 211, 147, 25, 201, 203],
    },
  ]);
  const overlayRef = React.useRef();

  const dashboardTableData = [1, 2, 3, 4, 5];

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
      console.log("ss");
      return;
    }
    dispatch(getMoreLessonsAction(token, onBoardGroupId, paging, size));

    setPaging(paging + 1);
  };

  useEffect(() => {
    if (newLessons) {
      setLessons(lessons.concat(newLessons));
    }
  }, [newLessons]);

  return isFetching || !homeContent ? (
    <SpinnerComponent />
  ) : (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid zIndex="-1" columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
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
                    {(homeContent.teacher && homeContent.teacher.name) ??
                      "No teacher"}
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
            Upcoming lessons:
          </Text>
        </CardHeader>
        <Box variant="simple" color={textColor}>
          <Box
            id="scrollableDiv"
            width="100%"
            overflow="hidden"
            p="0 1rem"
            height="500px"
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
                    <>
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
                          <CardHeader>
                            <Text
                              textAlign="center"
                              fontSize="lg"
                              marginBottom="1rem"
                              color={textColor}
                              fontWeight="bold"
                            >
                              Lesson: {lesson.name}
                            </Text>
                          </CardHeader>
                          <CardBody>
                            <SimpleGrid
                              width="100%"
                              columns={{ sm: 3, md: 3, xl: 3 }}
                              spacing="12px  "
                            >
                              <Card
                                p="0.4rem"
                                height="max-content"
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
                                              <h1>
                                                {lesson.assignments.reduce(
                                                  (accumulator, curr) =>
                                                    accumulator
                                                      .assignmentAppUsers
                                                      .length +
                                                    curr.assignmentAppUsers
                                                      .length
                                                )}
                                                /{lesson.assignments.length}
                                              </h1>
                                            ) : (
                                              <h1>
                                                {lesson.assignments.map(
                                                  (a) =>
                                                    a.assignmentAppUsers.length
                                                )}
                                                /{lesson.assignments.length}
                                              </h1>
                                            )
                                          ) : (
                                            <h1>No assingments</h1>
                                          )}
                                        </StatNumber>
                                      </Flex>
                                    </Stat>
                                    <FaFileAlt color="gray" />
                                  </Flex>
                                </CardBody>
                              </Card>

                              <Card
                                p="0.4rem"
                                height="max-content"
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
                                              <h1>
                                                {lesson.theories.reduce(
                                                  (accumulator, curr) =>
                                                    accumulator.theoryAppUsers
                                                      .length +
                                                    curr.theoryAppUsers.length
                                                )}
                                                /{lesson.theories.length}
                                              </h1>
                                            ) : (
                                              <h1>
                                                {lesson.theories.map(
                                                  (a) => a.theoryAppUsers.length
                                                )}
                                                /{lesson.theories.length}
                                              </h1>
                                            )
                                          ) : (
                                            <h1>No theory</h1>
                                          )}
                                        </StatNumber>
                                      </Flex>
                                    </Stat>
                                    <FaBook color="gray" />
                                  </Flex>
                                </CardBody>
                              </Card>
                            </SimpleGrid>
                          </CardBody>
                        </Flex>
                        <Flex
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
                            marginBottom="0.5rem"
                          >
                            {startDate}
                          </Text>

                          <Text
                            textAlign="center"
                            fontSize="lg"
                            fontWeight="bold"
                            m="0.3rem 0"
                          >
                            {startTime}-{endTime}
                          </Text>

                          <Text textAlign="center" fontSize="sm" m="0.3rem 0">
                            Online
                          </Text>

                          <Box
                            marginTop="0.5rem"
                            p="0.4rem"
                            borderRadius="10px"
                            bg="lightgray"
                            width="max-content"
                          >
                            <Text
                              color="white"
                              textAlign="center"
                              fontSize="sm"
                            >
                              {isLessonInProgress
                                ? "In progress"
                                : isLessonOver
                                ? "Lesson is over"
                                : "Hasn't started yet"}
                            </Text>
                          </Box>
                        </Flex>
                      </Card>
                    </>
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
