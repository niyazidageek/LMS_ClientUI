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
  Radio,
  Stack,
  RadioGroup,
  Icon,
  Input,
  Textarea,
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
  editOptionByIdAction,
  getOptionByIdAction,
} from "../../../actions/optionActions";
import optionSchema from "../../../validations/optionScheme";

function EditOption() {
  let { id } = useParams();
  const fileRef = useRef(null);
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const option = useSelector((state) => state.optionReducer.option);

  useEffect(() => {
    dispatch(getOptionByIdAction(id));
  }, []);

  function handleSubmit(values) {
    let { name, isCorrect, fileName, file } = values;
    let data = {
      name,
      isCorrect: isCorrect == "1" ? true : false,
      fileName: fileName[0],
      questionId: option.questionId,
    };

    var formData = new FormData();

    formData.append("Values", JSON.stringify(data));

    file[0] && formData.append("OptionFile", file[0]);

    dispatch(editOptionByIdAction(option.id, formData, token));
  }

  return isFetching || !option ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Option:{" "}
            <Text
              color={textColor}
              display="inline-block"
              fontSize="xl"
              fontWeight="semi-bold"
            >
              {option.name}
            </Text>
          </Text>
        </CardHeader>
        <CardBody>
          <Card p="16px">
            <CardHeader p="12px 5px" mb="12px">
              <Text fontSize="lg" color="teal.300" fontWeight="bold">
                Edit option
              </Text>
            </CardHeader>
            <CardBody px="5px">
              <Flex direction="column" width="100%">
                <Formik
                  initialValues={{
                    name: option.name,
                    isCorrect: option.isCorrect ? "1" : "0",
                    fileName: option.fileName ? [option.fileName] : [],
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
                                  Correct
                                </Radio>
                                <Radio
                                  onChange={(e) => {
                                    form.setFieldValue(
                                      field.name,
                                      e.target.value
                                    );
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

                      <FieldArray name="fileName">
                        {({ remove, form }) => (
                          <>
                            <FormLabel
                              mt="24px"
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

export default EditOption;
