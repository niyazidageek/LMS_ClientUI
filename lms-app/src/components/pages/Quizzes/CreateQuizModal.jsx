import React, { useEffect, useRef } from "react";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import {
  FormErrorMessage,
  SimpleGrid,
  Text,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { createQuizAction } from "../../../actions/quizActions";
import quizSchema from "../../../validations/quizSchema";

const CreateQuizModal = ({ onClick, value, groupId, fetchMore }) => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const dispatch = useDispatch();
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

    let promise = dispatch(createQuizAction(data, token));

    promise.then(() => fetchMore());

    onClick();
  }

  return (
    <>
      <Modal size="xl" isOpen={value} onClose={onClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="lg" color="teal.300" fontWeight="bold">
              Create a quiz
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                deadline: "",
                groupId: groupId,
                hours: 0,
                minutes: 10,
                seconds: 0,
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
                            placeholder="Name of the quiz"
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
                          isInvalid={form.errors.hours && form.touched.hours}
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
                    CREATE
                  </Button>
                </FormControl>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateQuizModal;
