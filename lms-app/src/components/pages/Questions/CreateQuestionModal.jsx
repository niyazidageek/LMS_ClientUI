import React, { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { FaFileUpload, FaExclamationTriangle } from "react-icons/fa";
import { Icon } from "@chakra-ui/icon";
import { FormErrorMessage, Flex, Box, Textarea, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import questionSchema from "../../../validations/questionSchema";
import { createQuestionAction } from "../../../actions/questionActions";
import { getQuizByIdAction } from "../../../actions/quizActions";

const CreateQuestionModal = ({ onClick, value, quizId }) => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  function handleSubmit(values) {
    let { name, point, file } = values;
    let data = {
      name,
      point,
      quizId,
    };

    var formData = new FormData();
    formData.append("Values", JSON.stringify(data));

    file[0] && formData.append("QuestionFile", file[0]);

    let promise = dispatch(createQuestionAction(formData, token));

    promise.then(() => dispatch(getQuizByIdAction(quizId)));

    onClick();
  }

  return (
    <>
      <Modal size="xl" isOpen={value} onClose={onClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="lg" color="teal.300" fontWeight="bold">
              Create a question
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                point: "",
                file: [],
              }}
              validationSchema={questionSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <FormControl>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel fontWeight="semibold" fontSize="md">
                          Question
                        </FormLabel>
                        <Textarea
                          fontSize="md"
                          borderRadius="15px"
                          height="max-content"
                          type="text"
                          placeholder="Enter the question"
                          size="lg"
                          {...field}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="point">
                    {({ field, form }) => (
                      <FormControl
                        mt="24px"
                        isInvalid={form.errors.point && form.touched.point}
                      >
                        <FormLabel fontWeight="semibold" fontSize="md">
                          Point
                        </FormLabel>
                        <Input
                          fontSize="md"
                          borderRadius="15px"
                          type="number"
                          placeholder="Point"
                          size="lg"
                          {...field}
                        />
                        <FormErrorMessage>{form.errors.point}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="file">
                    {({ field, form }) => (
                      <FormControl
                        mt="24px"
                        mb="12px"
                        isInvalid={form.errors.file && form.touched.file}
                      >
                        <Input
                          ref={fileRef}
                          type="file"
                          placeholder="Files"
                          display="none"
                          onChange={(e) => {
                            form.setFieldValue(field.name, [e.target.files[0]]);
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
                            fileRef.current !== null &&
                            fileRef.current.value != "" ? (
                              fileRef.current.files.length == 1 ? (
                                <Text fontWeight="bold">
                                  {fileRef.current.files[0].name}
                                </Text>
                              ) : (
                                <Text fontWeight="bold">
                                  {fileRef.current.files.length} images
                                </Text>
                              )
                            ) : (
                              <Text fontWeight="bold">Upload an image</Text>
                            )}
                          </Text>
                        </Box>

                        <FormErrorMessage>{form.errors.file}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Flex
                    justifyContent="space-between"
                    color="yellow.400"
                    alignItems="center"
                  >
                    <Text>
                      <Text
                        display="inline-block"
                        lineHeight="unset"
                        fontWeight="bold"
                        me="10px"
                        borderBottom="1px"
                      >
                        Maximum file size: 16mb!
                      </Text>
                      <Text
                        display="inline-block"
                        lineHeight="unset"
                        fontWeight="bold"
                        me="10px"
                      >
                        Before attaching an image, make sure it is either in
                        ".jpg", ".jpeg", or ".png" format!
                      </Text>
                    </Text>
                    <FaExclamationTriangle size={70} />
                  </Flex>

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

export default CreateQuestionModal;
