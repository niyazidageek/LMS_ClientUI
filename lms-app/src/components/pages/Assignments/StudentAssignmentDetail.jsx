import React, { useState, useEffect, useRef } from "react";
// Chakra imports
import { Formik, Form, Field } from "formik";
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  FormControl,
  Box,
  Input,
  FormErrorMessage,
  Icon,
  Link,
  Td,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaCheckCircle,
  FaFileUpload,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useHistory, useParams } from "react-router";
import { actionTypes } from "../../../actions/const";
// Custom components
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import {
  getStudentsAssignmentByIdAction,
  submitAssignmentByIdAction,
} from "../../../actions/assignmentActions";
import { fileHelper } from "../../../utils/fileHelper";

function StudentAssignmentDetail() {
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const assignment = useSelector((state) => state.assignmentReducer.assignment);

  useEffect(() => {
    dispatch(getStudentsAssignmentByIdAction(id, token));
  }, []);

  function handleSubmit(values) {
    let { files } = values;
    var formData = new FormData();
    var ins = files.length;
    for (var x = 0; x < ins; x++) {
      formData.append("Files", files[x]);
    }
    dispatch(submitAssignmentByIdAction(id, formData, token));
  }

  return isFetching || !assignment ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
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
              <CardBody px="5px">
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
              <CardBody px="5px">
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
                  Submission
                </Text>
              </CardHeader>
              <CardBody flexDirection="column" px="5px">
                {assignment.assignmentAppUsers.length != 0 &&
                !assignment.assignmentAppUsers[0].isSubmitted ? (
                  <>
                    <Flex
                      flexWrap="wrap"
                      color="yellow.400"
                      alignItems="center"
                    >
                      <Text lineHeight="unset" fontWeight="bold" me="10px">
                        Before attaching files, make sure your submission is
                        either in ".jpg", ".jpeg", ".pdf", or ".docx" format!
                      </Text>
                      <FaExclamationTriangle width="100%" />
                    </Flex>
                    <Formik
                      initialValues={{
                        files: [],
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <FormControl>
                          <Field name="files">
                            {({ field, form }) => (
                              <FormControl
                                my="24px"
                                isInvalid={
                                  form.errors.files && form.touched.files
                                }
                              >
                                <Input
                                  multiple={true}
                                  ref={fileRef}
                                  type="file"
                                  placeholder="Files"
                                  display="none"
                                  onChange={(e) => {
                                    form.setFieldValue(
                                      field.name,
                                      e.target.files
                                    );
                                  }}
                                />
                                <Box display="flex" alignItems="center">
                                  <Icon
                                    cursor="pointer"
                                    onClick={() => fileRef.current.click()}
                                    border="orange"
                                    boxSize={10}
                                    as={FaFileUpload}
                                  />
                                  <Text
                                    cursor="pointer"
                                    onClick={() => fileRef.current.click()}
                                    marginLeft="1"
                                  >
                                    {fileRef.current !== undefined &&
                                    fileRef.current !== null ? (
                                      fileRef.current.files.length == 1 ? (
                                        <Text fontWeight="bold">
                                          {fileRef.current.files[0].name}
                                        </Text>
                                      ) : (
                                        <Text fontWeight="bold">
                                          {fileRef.current.files.length} files
                                        </Text>
                                      )
                                    ) : (
                                      <Text fontWeight="bold">
                                        Upload files
                                      </Text>
                                    )}
                                  </Text>
                                </Box>

                                <FormErrorMessage>
                                  {form.errors.email}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Button
                            lineHeight="unset"
                            mr={3}
                            isLoading={isFetching}
                            type="submit"
                            mb="24px"
                            bg="teal.300"
                            _hover={{
                              bg: "teal.400",
                            }}
                            color="white"
                          >
                            Submit assignment
                          </Button>
                        </FormControl>
                      </Form>
                    </Formik>
                  </>
                ) : (
                  <Text
                    fontSize="lg"
                    textAlign="center"
                    fontWeight="bold"
                    my="2rem"
                  >
                    You have already submitted the assignment!
                  </Text>
                )}
              </CardBody>
            </Card>
          </Grid>
        </CardBody>
        <Button
          onClick={() => history.goBack()}
          lineHeight="unset"
          bg="transparent"
          outlineColor="teal.300"
          _hover={{
            bg: "teal.400",
            color: "white",
          }}
          color="teal.400"
          mt="2rem"
          width="max-content"
        >
          Back
        </Button>
      </Card>
    </Flex>
  );
}

export default StudentAssignmentDetail;
