import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Text,
  Box,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Divider,
  CloseButton,
  Stack,
  Icon,
  Input,
  SimpleGrid,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldArray } from "formik";
import { fileHelper } from "../../../utils/fileHelper";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import { FaFileUpload, FaExclamationTriangle } from "react-icons/fa";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import {
  editQuestionByIdAction,
  getQuestionByIdAction,
} from "../../../actions/questionActions";
import questionSchema from "../../../validations/questionSchema";

function EditQuestion() {
  let { id } = useParams();
  const fileRef = useRef(null);
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const question = useSelector((state) => state.questionReducer.question);

  useEffect(() => {
    dispatch(getQuestionByIdAction(id));
  }, []);

  function handleSubmit(values) {
    let { name, point, fileName, file } = values;
    let data = {
      name,
      point,
      fileName: fileName[0],
      quizId: question.quizId,
    };

    var formData = new FormData();

    formData.append("Values", JSON.stringify(data));

    file[0] && formData.append("QuestionFile", file[0]);

    dispatch(editQuestionByIdAction(question.id, formData, token));
  }

  return isFetching || !question ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
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
        </CardHeader>
        <CardBody>
          <Card p="16px">
            <CardHeader p="12px 5px" mb="12px">
              <Text fontSize="lg" color="teal.300" fontWeight="bold">
                Edit question
              </Text>
            </CardHeader>
            <CardBody px="5px">
              <Flex direction="column" width="100%">
                <Formik
                  initialValues={{
                    name: question.name,
                    point: question.point,
                    fileName: question.fileName ? [question.fileName] : [],
                    file: [],
                  }}
                  validationSchema={questionSchema}
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
                                Question
                              </FormLabel>
                              <Input
                                fontSize="md"
                                borderRadius="15px"
                                type="text"
                                placeholder="Enter the question"
                                size="lg"
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="point">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.point && form.touched.point
                              }
                            >
                              <FormLabel fontWeight="semibold" fontSize="md">
                                Point
                              </FormLabel>
                              <Input
                                fontSize="md"
                                borderRadius="15px"
                                type="number"
                                placeholder="Maximum grade"
                                size="lg"
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.point}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </SimpleGrid>

                      <FieldArray name="fileName">
                        {({ remove, form }) => (
                          <>
                            <FormLabel
                              mt="36px"
                              fontWeight="semibold"
                              fontSize="md"
                            >
                              Content
                            </FormLabel>
                            {form.values.fileName.length > 0 ? (
                              <Box
                                border="1px"
                                borderRadius="15px"
                                borderColor="gray.200"
                              >
                                {form.values.fileName.map((file, index) => (
                                  <Box
                                    paddingRight="4"
                                    paddingLeft="4"
                                    borderRadius="md"
                                  >
                                    <Stack
                                      margin="1rem 0rem 1rem"
                                      key={index}
                                      direction="row"
                                      // flexWrap = 'wrap'
                                    >
                                      <Link
                                        wordBreak="break-all"
                                        cursor="pointer"
                                        href={fileHelper.convertToUrl(file)}
                                      >
                                        {file}
                                      </Link>
                                      <CloseButton
                                        // margin='unset !important'
                                        onClick={() => remove(index)}
                                        size="sm"
                                        color="red"
                                      />
                                    </Stack>
                                    {form.values.fileName.length > 1 ? (
                                      <Divider />
                                    ) : null}
                                  </Box>
                                ))}
                              </Box>
                            ) : (
                              <Box
                                border="1px"
                                borderRadius="15px"
                                borderColor="gray.200"
                              >
                                <Box
                                  textAlign="center"
                                  p="1rem"
                                  borderRadius="15px"
                                >
                                  <Text>No content..</Text>
                                </Box>
                              </Box>
                            )}
                          </>
                        )}
                      </FieldArray>

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
                                form.setFieldValue(field.name, [
                                  e.target.files[0],
                                ]);
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

                            <FormErrorMessage>
                              {form.errors.file}
                            </FormErrorMessage>
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
                        <FaExclamationTriangle size={40} />
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

export default EditQuestion;
