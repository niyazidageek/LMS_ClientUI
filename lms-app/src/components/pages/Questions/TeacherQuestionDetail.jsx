import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Button,
  Image,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";

import SpinnerComponent from "../../spinners/SpinnerComponent";
import {
  deleteQuestionByIdAction,
  getQuestionByIdAction,
} from "../../../actions/questionActions";
import { fileHelper } from "../../../utils/fileHelper";
import CreateOptionModal from "../Options/CreateOptionModal";
import { RiCloseCircleFill } from "react-icons/ri";

function TeacherQuestionDetail() {
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const [createOptionIsOpen, setCreateOptionIsOpen] = useState(false);
  const history = useHistory();
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const question = useSelector((state) => state.questionReducer.question);

  useEffect(() => {
    dispatch(getQuestionByIdAction(id));
  }, []);

  function handleQuestionEdit(id) {
    let path = history.location.pathname.split("detail")[0];
    path = path.concat("edit" + "/" + id);
    history.push(path);
  }

  function questionClick(id) {
    let path = history.location.pathname.split("detail")[0];
    path = path.concat("question" + "/" + "detail" + "/" + id);
    history.push(path);
  }

  function handleOptionModal() {
    setCreateOptionIsOpen((prev) => !prev);
  }

  function handleDelete(id) {
    let promise = dispatch(deleteQuestionByIdAction(id));
    promise.then(() => history.goBack());
  }

  function optionClick(id) {
    let path = history.location.pathname.split("question")[0];
    path = path.concat("option" + "/" + "detail" + "/" + id);
    history.push(path);
  }

  return isFetching || !question ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card
        h={{ xl: "640px" }}
        justifyContent="space-between"
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <CardHeader justifyContent="space-between" p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Question:{" "}
            <Text
              color={textColor}
              display="inline-block"
              fontSize="xl"
              fontWeight="semi-bold"
            >
              {question.name}
            </Text>
          </Text>
          <Flex>
            <Button
              color="white"
              bg="yellow.400"
              _hover={{
                bg: "yellow.500",
              }}
              borderRadius="6px"
              lineHeight="initial"
              me="0.5rem"
              onClick={() => handleQuestionEdit(question.id)}
            >
              Edit
            </Button>
            <Button
              color="white"
              bg="red.500"
              _hover={{
                bg: "red.600",
              }}
              borderRadius="6px"
              lineHeight="initial"
              me="0.5rem"
              onClick={() => handleDelete(question.id)}
            >
              Delete
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Grid
            width="100%"
            templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }}
            gap="22px"
          >
            <Card boxShadow="xl" p="16px">
              <CardHeader pb="1rem">
                <Text
                  fontSize="xl"
                  color="teal.400"
                  fontWeight="bold"
                  me="10px"
                  borderBottom="2px solid"
                >
                  Info
                </Text>
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
                      Point:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {question.point.toFixed(2)}
                    </Text>
                  </Flex>

                  <Flex flexDirection="column" align="start" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Content:
                    </Text>
                    {question.fileName ? (
                      <Image
                        borderRadius="16px"
                        src={fileHelper.convertToUrl(question.fileName)}
                      />
                    ) : (
                      <Text fontSize="md" color="gray.500" fontWeight="400">
                        No content
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </CardBody>
            </Card>

            <Card pos="relative" boxShadow="xl" p="16px">
              <CardHeader justifyContent="space-between" pb="1rem">
                <Text
                  fontSize="xl"
                  color="teal.400"
                  fontWeight="bold"
                  me="10px"
                  borderBottom="2px solid"
                  height="max-content"
                >
                  Options
                </Text>
                <CreateOptionModal
                  questionId={question.id}
                  value={createOptionIsOpen}
                  onClick={() => handleOptionModal()}
                />
                <Button
                  color="white"
                  bg="green.500"
                  _hover={{
                    bg: "green.600",
                  }}
                  borderRadius="6px"
                  lineHeight="initial"
                  onClick={() => handleOptionModal()}
                >
                  Create an option
                </Button>
              </CardHeader>
              <CardBody h={{ base: "max-content", xl: "380px" }} px="5px">
                <Flex
                  px="0.5rem"
                  py="0.2rem"
                  borderRadius="5px"
                  boxShadow="inner"
                  direction="column"
                  w="100%"
                  overflowY="scroll"
                >
                  {question.options && question.options.length != 0 ? (
                    question.options.map((o, index) => {
                      return (
                        <Card
                          onClick={() => optionClick(o.id)}
                          _hover={{
                            bg: "#c9c9c9",
                          }}
                          bg="whitesmoke"
                          my="0.3rem"
                          p="0.5rem"
                          borderRadius="5px"
                          boxShadow="md"
                          justifyContent="space-between"
                          display="flex"
                          flexDirection="row"
                        >
                          <Text fontWeight="bold">
                            {++index}. {o.name}
                          </Text>

                          {o.isCorrect ? (
                            <Flex alignItems="center" color="green.500">
                              <Text
                                me="0.3rem"
                                lineHeight="initial"
                                fontWeight="bold"
                              >
                                Correct
                              </Text>
                              <FaCheckCircle />
                            </Flex>
                          ) : (
                            <Flex alignItems="center" color="red.500">
                              <Text
                                me="0.3rem"
                                lineHeight="initial"
                                fontWeight="bold"
                              >
                                Incorrect
                              </Text>
                              <RiCloseCircleFill />
                            </Flex>
                          )}
                        </Card>
                      );
                    })
                  ) : (
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      pos="absolute"
                      left="50%"
                      top="50%"
                      style={{ transform: "translate(-50%,-50%)" }}
                      fontWeight="bold"
                    >
                      This question doesn't have any options
                    </Text>
                  )}
                </Flex>
              </CardBody>
            </Card>
          </Grid>
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

export default TeacherQuestionDetail;
