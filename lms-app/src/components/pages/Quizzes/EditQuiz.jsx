import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/toast";
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  Input,
  SimpleGrid,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import {
  editQuizByIdAciton,
  getQuizByIdAction,
} from "../../../actions/quizActions";
import quizSchema from "../../../validations/quizSchema";

function EditQuiz() {
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const quiz = useSelector((state) => state.quizReducer.quiz);

  useEffect(() => {
    dispatch(getQuizByIdAction(id));
  }, []);

  const toast = useToast();

  function handleSubmit(values) {
    const { name, deadline, groupId, hours, minutes, seconds } = values;

    let durationSeconds = hours * 3600 + minutes * 60 + parseInt(seconds);

    if (durationSeconds <= 0) {
      toast({
        status: "error",
        description: "Timer duration can't be 0!",
        position: "top",
        duration: 2000,
      });
      return;
    }

    let data = {
      name,
      deadline,
      groupId,
      durationSeconds,
    };

    dispatch(editQuizByIdAciton(id, data, token));
  }

  return isFetching || !quiz ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Quiz:{" "}
            <Text
              color={textColor}
              display="inline-block"
              fontSize="xl"
              fontWeight="semi-bold"
            >
              {quiz.name}
            </Text>
          </Text>
        </CardHeader>
        <CardBody>
          <Card p="16px">
            <CardHeader p="12px 5px" mb="12px">
              <Text fontSize="lg" color="teal.300" fontWeight="bold">
                Edit quiz
              </Text>
            </CardHeader>
            <CardBody px="5px">
              <Flex direction="column" width="100%">
                <Formik
                  initialValues={{
                    name: quiz.name,
                    deadline: quiz.deadline,
                    groupId: quiz.groupId,
                    hours: Math.floor(quiz.durationSeconds / 3600),
                    minutes: Math.floor(
                      (quiz.durationSeconds -
                        Math.floor(quiz.durationSeconds / 3600) * 3600) /
                        60
                    ),
                    seconds:
                      quiz.durationSeconds -
                      Math.floor(quiz.durationSeconds / 3600) * 3600 -
                      Math.floor(
                        (quiz.durationSeconds -
                          Math.floor(quiz.durationSeconds / 3600) * 3600) /
                          60
                      ) *
                        60,
                  }}
                  validationSchema={quizSchema}
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
                                placeholder="Name of the lesson"
                                size="lg"
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="deadline">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.deadline && form.touched.deadline
                              }
                            >
                              <FormLabel fontWeight="semibold" fontSize="md">
                                Deadline
                              </FormLabel>
                              <Input
                                fontSize="md"
                                borderRadius="15px"
                                size="lg"
                                type="datetime-local"
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.deadline}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </SimpleGrid>

                      <Text fontWeight="bold" mt="24px">
                        Timer duration
                      </Text>

                      <SimpleGrid
                        mt="12px"
                        columns={{ sm: 1, md: 1, lg: 3, xl: 3 }}
                        spacing={10}
                      >
                        <Field name="hours">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.hours && form.touched.hours
                              }
                            >
                              <FormLabel
                                fontWeight="semibold"
                                color="teal.300"
                                fontSize="sm"
                              >
                                Hours
                              </FormLabel>
                              <NumberInput
                                maxW={32}
                                defaultValue={0}
                                min={0}
                                {...field}
                                onChange={(val) =>
                                  form.setFieldValue(field.name, val)
                                }
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                              <FormErrorMessage>
                                {form.errors.hours}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="minutes">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.minutes && form.touched.minutes
                              }
                            >
                              <FormLabel
                                fontWeight="semibold"
                                fontSize="md"
                                color="teal.300"
                                fontSize="sm"
                              >
                                Minutes
                              </FormLabel>
                              <NumberInput
                                maxW={32}
                                defaultValue={10}
                                min={0}
                                {...field}
                                onChange={(val) =>
                                  form.setFieldValue(field.name, val)
                                }
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                              <FormErrorMessage>
                                {form.errors.minutes}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="seconds">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.seconds && form.touched.seconds
                              }
                            >
                              <FormLabel
                                fontWeight="semibold"
                                fontSize="md"
                                color="teal.300"
                                fontSize="sm"
                              >
                                Seconds
                              </FormLabel>
                              <NumberInput
                                maxW={32}
                                defaultValue={0}
                                min={0}
                                {...field}
                                onChange={(val) =>
                                  form.setFieldValue(field.name, val)
                                }
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                              <FormErrorMessage>
                                {form.errors.seconds}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </SimpleGrid>

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

export default EditQuiz;
