import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Table,
  Tbody,
  Text,
  Box,
  Link,
  Th,
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
import { Formik, Form, Field, FieldArray } from "formik";
import { fileHelper } from "../../../utils/fileHelper";
import { Select } from "chakra-react-select";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import { FaFileUpload, FaExclamationTriangle } from "react-icons/fa";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import { searchLessonsByGroupIdAction } from "../../../actions/lessonActions";
import {
  editAssignmentByIdAction,
  getAssignmentByIdAction,
} from "../../../actions/assignmentActions";
import assignmentSchema from "../../../validations/assignmentSchema";

function EditAssignment() {
  let { id } = useParams();
  const fileRef = useRef(null);
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const [lessons, setLessons] = useState([]);
  const currentGroupId = useSelector((state) => state.onBoardReducer.groupId);
  const history = useHistory();
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const assignment = useSelector((state) => state.assignmentReducer.assignment);

  useEffect(() => {
    dispatch(getAssignmentByIdAction(id));
  }, []);

  function handleSearchInput(input) {
    let lessons = dispatch(
      searchLessonsByGroupIdAction(currentGroupId, input.trim())
    );
    lessons.then((res) => {
      res ? setLessons(res) : setLessons([]);
    });
  }

  function handleSubmit(values) {
    let { name, lessonId, description, deadline, fileNames, files, maxGrade } =
      values;
    var formData = new FormData();
    let data = {
      name,
      deadline,
      description,
      maxGrade,
      lessonId,
      assignmentMaterials: fileNames,
    };

    formData.append("Values", JSON.stringify(data));
    var ins = files.length;
    for (var x = 0; x < ins; x++) {
      formData.append("Materials", files[x]);
    }

    dispatch(editAssignmentByIdAction(assignment.id, formData, token));
  }

  return isFetching || !assignment ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Assignment:{" "}
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
        <CardBody>
          <Card p="16px">
            <CardHeader p="12px 5px" mb="12px">
              <Text fontSize="lg" color="teal.300" fontWeight="bold">
                Edit assignment
              </Text>
            </CardHeader>
            <CardBody px="5px">
              <Flex direction="column" width="100%">
                <Formik
                  initialValues={{
                    name: assignment.name,
                    description: assignment.description,
                    deadline: assignment.deadline,
                    maxGrade: assignment.maxGrade,
                    lessonId: assignment.lessonId,
                    fileNames:
                      assignment.assignmentMaterials.length > 0
                        ? assignment.assignmentMaterials
                        : [],
                    files: [],
                  }}
                  validationSchema={assignmentSchema}
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
                                placeholder="Name of the assignment"
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

                        <Field name="maxGrade">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.maxGrade && form.touched.maxGrade
                              }
                            >
                              <FormLabel fontWeight="semibold" fontSize="md">
                                Maximum grade
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
                                {form.errors.maxGrade}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </SimpleGrid>

                      <Field name="lessonId">
                        {({ field, form }) => (
                          <FormControl
                            mt="36px"
                            isInvalid={
                              form.errors.lessonId && form.touched.lessonId
                            }
                          >
                            <FormLabel fontWeight="semibold" fontSize="md">
                              Lesson
                            </FormLabel>
                            <Select
                              name="lessonId"
                              closeMenuOnSelect={false}
                              placeholder="Select the lesson"
                              onInputChange={(e) => handleSearchInput(e)}
                              onChange={(option) => {
                                form.setFieldValue(field.name, option.value);
                              }}
                              defaultValue={{
                                label: assignment.lesson.name,
                                value: assignment.lesson.id,
                              }}
                              options={lessons.map((s) => ({
                                label: s.name,
                                value: s.id,
                              }))}
                            />
                            <FormErrorMessage>
                              {form.errors.lessonId}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <FieldArray name="fileNames">
                        {({ remove, form }) => (
                          <>
                            <FormLabel
                              mt="36px"
                              fontWeight="semibold"
                              fontSize="md"
                            >
                              Content
                            </FormLabel>
                            {form.values.fileNames.length > 0 ? (
                              <Box
                                border="1px"
                                borderRadius="15px"
                                borderColor="gray.200"
                              >
                                {form.values.fileNames.map((file, index) => (
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
                                        href={fileHelper.convertToUrl(
                                          file.fileName
                                        )}
                                      >
                                        {file.fileName}
                                      </Link>
                                      <CloseButton
                                        // margin='unset !important'
                                        onClick={() => remove(index)}
                                        size="sm"
                                        color="red"
                                      />
                                    </Stack>
                                    {form.values.fileNames.length > 1 ? (
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

                      <Field name="files">
                        {({ field, form }) => (
                          <FormControl
                            mt="24px"
                            mb="12px"
                            isInvalid={form.errors.files && form.touched.files}
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
                                  Array.from(e.target.files)
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
                                fileRef.current !== null &&
                                fileRef.current.value != "" ? (
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
                                  <Text fontWeight="bold">Upload files</Text>
                                )}
                              </Text>
                            </Box>

                            <FormErrorMessage>
                              {form.errors.files}
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
                            Before attaching files, make sure your submission is
                            either in ".jpg", ".jpeg", ".png", ".pptx", ".txt",
                            ".pdf", or ".docx" format!
                          </Text>
                        </Text>
                        <FaExclamationTriangle size={50} />
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

export default EditAssignment;
