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
  FormLabel,
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
import { validateGrade } from "../../../validations/validateGrade";
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
  getAssignmentByIdAction,
  getStudentsAssignmentByIdAction,
  getSubmissionByIdAction,
  gradeSubmissionByIdAction,
  submitAssignmentByIdAction,
} from "../../../actions/assignmentActions";
import { fileHelper } from "../../../utils/fileHelper";
import gradeSubmissionSchema from "../../../validations/gradeSubmissionSchema";

function SubmissionDetail() {
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const submission = useSelector((state) => state.assignmentReducer.submission);

  useEffect(() => {
    dispatch(getSubmissionByIdAction(id, token));
  }, []);

  function handleSubmit(values) {
    dispatch(gradeSubmissionByIdAction(id, values, token));
  }

  return isFetching || !submission ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader justifyContent="space-between" p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Submission:{" "}
            <Text
              color={textColor}
              display="inline-block"
              fontSize="xl"
              fontWeight="semi-bold"
            >
              #{submission.id}
            </Text>
          </Text>
          {submission.graded ? (
            <Flex color="green.500" alignItems="center">
              <Text
               lineHeight='initial'
                me="0.3rem"
                fontSize="xl"
                fontWeight="bold"
              >
                Graded!
              </Text>
              <FaCheckCircle />
            </Flex>
          ) : (
            <Flex color="red.500" alignItems="center">
              <Text
                lineHeight='initial'
                me="0.3rem"
                fontSize="xl"
                fontWeight="bold"
              >
                Needs grading!
              </Text>
              <FaExclamationTriangle size={20}/>
            </Flex>
          )}
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
                      Student:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {submission.appUser.name} {submission.appUser.surname}
                    </Text>
                  </Flex>
                  <Flex align="start" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Assignment:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {submission.assignment.name}
                    </Text>
                  </Flex>

                  <Flex align="start" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Assignment deadline:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {dateHelper.normalizedDateWithVerbalDateAndTime(
                        submission.assignment.deadline
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
                      Submission date:
                    </Text>
                    {dateHelper.isLate(
                      submission.submissionDate,
                      submission.assignment.deadline
                    ) ? (
                      <Text fontSize="md" color="red.500" fontWeight="400">
                        {dateHelper.normalizedDateWithVerbalDateAndTime(
                          submission.submissionDate
                        )}{" "}
                        (late)
                      </Text>
                    ) : (
                      <Text fontSize="md" color="green.500" fontWeight="400">
                        {dateHelper.normalizedDateWithVerbalDateAndTime(
                          submission.submissionDate
                        )}
                      </Text>
                    )}
                  </Flex>
                  <Flex align="center" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Grade:
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      {submission.grade.toFixed(2)}
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
                  Attachments
                </Text>
              </CardHeader>
              <CardBody px="5px">
                <Flex direction="column">
                  {submission.assignmentAppUserMaterials &&
                  submission.assignmentAppUserMaterials.length != 0 ? (
                    submission.assignmentAppUserMaterials.map((aam, index) => {
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
                              href={fileHelper.convertToUrl(aam.fileName)}
                            >
                              Attachment {index}
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
                      This submission doesn't have any attachments
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
                  Evaluation
                </Text>
              </CardHeader>
              <CardBody flexDirection="column" px="5px">
                <Flex
                  color="yellow.400"
                  flexWrap="wrap"
                  alignItems="center"
                  mb="1rem"
                >
                  <Text
                    display="inline-block"
                    lineHeight="unset"
                    fontWeight="bold"
                    me="10px"
                    borderBottom="1px"
                  >
                    Maximum grade possible is:{" "}
                    {submission.assignment.maxGrade.toFixed(2)}!
                  </Text>
                  <FaExclamationTriangle size={20} />
                </Flex>

                <Formik
                  initialValues={{
                    grade: submission.graded ? submission.grade : "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={gradeSubmissionSchema}
                >
                  <Form>
                    <FormControl>
                      <Field
                        name="grade"
                        validate={(e) =>
                          validateGrade(e, submission.assignment.maxGrade)
                        }
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.grade && form.touched.grade}
                          >
                            <FormLabel fontWeight="semibold" fontSize="md">
                              Grade
                            </FormLabel>
                            <Input
                              fontSize="md"
                              borderRadius="15px"
                              type="number"
                              placeholder="Enter the grade"
                              size="lg"
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors.grade}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Button
                        lineHeight="unset"
                        mr={3}
                        mt="24px"
                        isLoading={isFetching}
                        type="submit"
                        bg="teal.300"
                        _hover={{
                          bg: "teal.400",
                        }}
                        color="white"
                      >
                        Grade submission
                      </Button>
                    </FormControl>
                  </Form>
                </Formik>
              </CardBody>
            </Card>
          </Grid>
        </CardBody>
        <Button
          onClick={() => history.goBack()}
          lineHeight="unset"
          bg="transparent"
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

export default SubmissionDetail;
