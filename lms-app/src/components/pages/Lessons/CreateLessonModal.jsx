import React, { useEffect, useRef } from "react";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

import {
  FormErrorMessage,
  Stack,
  SimpleGrid,
  RadioGroup,
  Radio,
  Text,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { createLessonAction } from "../../../actions/lessonActions";
import lessonSchema from "../../../validations/lessonSchema";

const CreateLessonModal = ({ onClick, value, groupId, fetchMore }) => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const dispatch = useDispatch();
  function handleSubmit(values) {
    let { name, startDate, endDate, groupId, isOnline, description } = values;
    let data = {
      name,
      startDate,
      description,
      endDate,
      groupId,
      isOnline: isOnline == "1" ? true : false,
    };

    let promise = dispatch(createLessonAction(data, token));

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
              Create a lesson
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                description: "",
                startDate: "",
                endDate: "",
                groupId: groupId,
                isOnline: "",
              }}
              validationSchema={lessonSchema}
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

                    <Field name="description">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.description && form.touched.description
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
                          isInvalid={
                            form.errors.startDate && form.touched.startDate
                          }
                        >
                          <FormLabel fontWeight="semibold" fontSize="md">
                            Start time
                          </FormLabel>
                          <Input
                            fontSize="md"
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
                          isInvalid={
                            form.errors.endDate && form.touched.endDate
                          }
                        >
                          <FormLabel fontWeight="semibold" fontSize="md">
                            End time
                          </FormLabel>
                          <Input
                            size="lg"
                            fontSize="md"
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
                        isInvalid={
                          form.errors.isOnline && form.touched.isOnline
                        }
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
                                form.setFieldValue(field.name, e.target.value);
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
                                form.setFieldValue(field.name, e.target.value);
                              }}
                              fontWeight="semibold"
                              color="yellow.500"
                              colorScheme="yellow"
                              value="0"
                            >
                              Offline
                            </Radio>
                          </Stack>
                          <FormErrorMessage>
                            {form.errors.isOnline}
                          </FormErrorMessage>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateLessonModal;
