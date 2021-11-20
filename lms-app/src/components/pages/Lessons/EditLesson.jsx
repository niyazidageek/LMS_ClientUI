import React, { useState, useEffect } from "react";
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Radio,
  Stack,
  RadioGroup,
  Input,
  Switch,
  SimpleGrid,
  Textarea,
  Thead,
  Tr,
  Button,
  Td,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { FaCheckCircle } from "react-icons/fa";
import { useHistory, useParams } from "react-router";
import { actionTypes } from "../../../actions/const";
// Custom components
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";

import SpinnerComponent from "../../spinners/SpinnerComponent";
import { getLessonByIdAction } from "../../../actions/lessonActions";

function EditLesson() {
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const lesson = useSelector((state) => state.lessonReducer.lesson);

  useEffect(() => {
    dispatch(getLessonByIdAction(id));
  }, []);

  function handleSubmit(values) {
    console.log(values);
  }

  return isFetching || !lesson ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Lesson:{" "}
            <Text
              color={textColor}
              display="inline-block"
              fontSize="xl"
              fontWeight="semi-bold"
            >
              {lesson.name}
            </Text>
          </Text>
        </CardHeader>
        <CardBody>
          <Card p="16px">
            <CardHeader p="12px 5px" mb="12px">
              <Text fontSize="lg" color="teal.300" fontWeight="bold">
                Edit lesson
              </Text>
            </CardHeader>
            <CardBody px="5px">
              <Flex direction="column" width="100%">
                <Formik
                  initialValues={{
                    name: lesson.name,
                    description: lesson.description,
                    startDate: lesson.startDate,
                    endDate: lesson.endDate,
                    isOnline: lesson.isOnline ? "1" : "0",
                  }}
                  // validationSchema={profileSettingsSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <FormControl>
                      <SimpleGrid
                        columns={{ sm: 1, md: 1, lg: 2, xl: 2 }}
                        spacing={10}
                      >
                        <Field name="name">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontWeight="semibold" fontSize="md">
                                Name
                              </FormLabel>
                              <Input
                                fontSize="md"
                                borderRadius="15px"
                                type="text"
                                placeholder="Your Name"
                                size="lg"
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="description">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.description &&
                                form.touched.description
                              }
                            >
                              <FormLabel fontWeight="semibold" fontSize="md">
                                Description
                              </FormLabel>
                              <Input
                                fontSize="md"
                                borderRadius="15px"
                                type="text"
                                placeholder="Add description"
                                size="lg"
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.description}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="startDate">
                          {({ field, form }) => (
                            <FormControl
                              mt="24px"
                              isInvalid={
                                form.errors.startDate && form.touched.startDate
                              }
                            >
                              <FormLabel fontWeight="semibold" fontSize="md">
                                Start time
                              </FormLabel>
                              <Input
                                fontSize="sm"
                                borderRadius="15px"
                                size="lg"
                                type="datetime-local"
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.startDate}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="endDate">
                          {({ field, form }) => (
                            <FormControl
                              mt="24px"
                              isInvalid={
                                form.errors.endDate && form.touched.endDate
                              }
                            >
                              <FormLabel fontWeight="semibold" fontSize="md">
                                End time
                              </FormLabel>
                              <Input
                                size="lg"
                                fontSize="sm"
                                borderRadius="15px"
                                type="datetime-local"
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.endDate}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </SimpleGrid>

                      <Field name="isOnline">
                          {({ field, form }) => (
                            <FormControl
                              mt="24px"
                              display="flex"
                              flexDirection="column"
                            >
                              <FormLabel
                                htmlFor="isSubscribedToSender"
                                fontWeight="semibold"
                                fontSize="md"
                              >
                                Format of the lesson
                              </FormLabel>
                              <RadioGroup {...field}>
                                <Stack spacing={5} direction="row">
                                  <Radio
                                    onChange={(e) => {
                                      console.log();
                                      form.setFieldValue(
                                        field.name,
                                        e.target.value
                                      );
                                    }}
                                    fontWeight="semibold"
                                    color="green"
                                    colorScheme="green"
                                    value="1"
                                  >
                                    Online
                                  </Radio>
                                  <Radio
                                    onChange={(e) => {
                                      console.log();
                                      form.setFieldValue(
                                        field.name,
                                        e.target.value
                                      );
                                    }}
                                    fontWeight="semibold"
                                    color="yellow.500"
                                    colorScheme="yellow"
                                    value="0"
                                  >
                                    Offline
                                  </Radio>
                                </Stack>
                              </RadioGroup>
                            </FormControl>
                          )}
                        </Field>

                      <Button
                        isLoading={isFetching}
                        type="submit"
                        bg="teal.300"
                        fontSize="13px"
                        color="white"
                        fontWeight="bold"
                        w="100%"
                        h="45"
                        mt="24px"
                        mb="24px"
                        _hover={{
                          bg: "teal.200",
                        }}
                        _active={{
                          bg: "teal.400",
                        }}
                      >
                        SAVE
                      </Button>
                    </FormControl>
                  </Form>
                </Formik>
              </Flex>
            </CardBody>
          </Card>
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

export default EditLesson;
