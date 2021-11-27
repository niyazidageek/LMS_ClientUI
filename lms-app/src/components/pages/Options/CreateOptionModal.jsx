import React, { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { FaFileUpload, FaExclamationTriangle } from "react-icons/fa";
import { Icon } from "@chakra-ui/icon";
import {
  FormErrorMessage,
  Flex,
  Box,
  Stack,
  RadioGroup,
  Textarea,
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
import optionSchema from "../../../validations/optionScheme";
import { getQuestionByIdAction } from "../../../actions/questionActions";
import { createOptionAction } from "../../../actions/optionActions";

const CreateOptionModal = ({ onClick, value, questionId }) => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  function handleSubmit(values) {
    let { name, isCorrect, file } = values;
    let data = {
      name,
      isCorrect: isCorrect == "1" ? true : false,
      questionId,
    };

    var formData = new FormData();
    formData.append("Values", JSON.stringify(data));

    file[0] && formData.append("OptionFile", file[0]);

    let promise = dispatch(createOptionAction(formData, token));

    promise.then(() => dispatch(getQuestionByIdAction(questionId)));

    onClick();
  }

  return (
    <>
      <Modal size="xl" isOpen={value} onClose={onClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="lg" color="teal.300" fontWeight="bold">
              Create an option
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                isCorrect: "",
                file: [],
              }}
              validationSchema={optionSchema}
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
                          Option
                        </FormLabel>
                        <Textarea
                          fontSize="md"
                          borderRadius="15px"
                          height="max-content"
                          type="text"
                          placeholder="Enter the option"
                          size="lg"
                          {...field}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="isCorrect">
                    {({ field, form }) => (
                      <FormControl
                        mt="24px"
                        display="flex"
                        flexDirection="column"
                        isInvalid={
                          form.errors.isCorrect && form.touched.isCorrect
                        }
                      >
                        <FormLabel fontWeight="semibold" fontSize="md">
                          Type of the option
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
                              Correct
                            </Radio>
                            <Radio
                              onChange={(e) => {
                                form.setFieldValue(field.name, e.target.value);
                              }}
                              fontWeight="semibold"
                              color="red.500"
                              colorScheme="red"
                              value="0"
                            >
                              Incorrect
                            </Radio>
                          </Stack>
                          <FormErrorMessage>
                            {form.errors.isCorrect}
                          </FormErrorMessage>
                        </RadioGroup>
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

export default CreateOptionModal;
