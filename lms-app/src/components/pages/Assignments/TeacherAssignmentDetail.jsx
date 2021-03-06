import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Text,
  Link,
  Td,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";

import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import { getAssignmentByIdAction } from "../../../actions/assignmentActions";
import { fileHelper } from "../../../utils/fileHelper";

function TeacherAssignmentDetail() {
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const assignment = useSelector((state) => state.assignmentReducer.assignment);

  useEffect(() => {
    dispatch(getAssignmentByIdAction(id));
  }, []);

  return isFetching || !assignment ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card
        justifyContent="center"
        minH="620px"
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Assingment:{" "}
            <Text
              color={textColor}
              display="inline-block"
              fontSize="xl"
              fontWeight="semi-bold"
            >
              {assignment.name}
            </Text>
          </Text>
        </CardHeader>
        <CardBody flexDirection="column">
          <Grid
            w="100%"
            templateColumns={{ sm: "1fr", xl: "repeat(2 , 1fr)" }}
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
                      Description:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {assignment.description}
                    </Text>
                  </Flex>
                  <Flex align="center" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Deadline:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {dateHelper.normalizedDateWithVerbalDateAndTime(
                        assignment.deadline
                      )}
                    </Text>
                  </Flex>
                  <Flex align="center" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Maximum grade:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {assignment.maxGrade}
                    </Text>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>

            <Card boxShadow="xl" p="16px">
              <CardHeader pb="1rem">
                <Text
                  fontSize="xl"
                  color="teal.400"
                  fontWeight="bold"
                  me="10px"
                  borderBottom="2px solid"
                >
                  Content
                </Text>
              </CardHeader>
              <CardBody h={{ base: "max-content", xl: "380px" }} px="5px">
                <Flex direction="column">
                  {assignment.assignmentMaterials &&
                  assignment.assignmentMaterials.length != 0 ? (
                    assignment.assignmentMaterials.map((am, index) => {
                      return (
                        <Flex align="start" mb="18px">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            me="10px"
                          >
                            {++index})
                          </Text>
                          <Text fontSize="md" color="gray.500" fontWeight="400">
                            <Link
                              borderBottom="1px"
                              color="teal.400"
                              _hover={{ color: "teal.300" }}
                              href={fileHelper.convertToUrl(am.fileName)}
                            >
                              Source {index}
                            </Link>
                          </Text>
                        </Flex>
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
                      This assignment doesn't have any contnet
                    </Text>
                  )}
                </Flex>
              </CardBody>
            </Card>
          </Grid>

          <Grid
            w="100%"
            mt="22px"
            templateColumns={{ sm: "1fr", xl: "repeat(1 , 1fr)" }}
            gap="22px"
          ></Grid>
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

export default TeacherAssignmentDetail;
