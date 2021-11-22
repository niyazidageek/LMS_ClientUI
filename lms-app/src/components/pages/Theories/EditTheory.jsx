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
import { Select } from "chakra-react-select";
import { useHistory, useParams } from "react-router";
import { actionTypes } from "../../../actions/const";
// Custom components
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import {searchLessonsByGroupIdAction} from "../../../actions/lessonActions";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import theorySchema from "../../../validations/theorySchema";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import { editLessonByIdAction, getLessonByIdAction } from "../../../actions/lessonActions";
import { editTheoryByIdAction, getTheoryByIdAction } from "../../../actions/theoryActions";
import EditorUtil from "../../editor/EditorUtil";

function EditTheory() {
  let { id } = useParams();
  const currentGroupId = useSelector((state) => state.onBoardReducer.groupId);
  const [firstTouch, setFirstTouch] = useState(true);
  const [lessons, setLessons] = useState([]);
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const [rawContent, setRawContent] = useState(null);
  const token = useSelector((state) => state.authReducer.jwt);
  const [editorError, setEditorError] = useState(null);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const theory = useSelector((state) => state.theoryReducer.theory);

  useEffect(() => {
    let resp =dispatch(getTheoryByIdAction(id));
    resp.then((r) => setRawContent(r));
  }, []);

  function onEditorStateChange(rawContentState, form, field) {
    form.setFieldValue(field.name, rawContentState);
  }
  
  function handleSearchInput(input) {
    let lessons = dispatch(
      searchLessonsByGroupIdAction(currentGroupId, input.trim())
    );
    lessons.then((res) => {
      res ? setLessons(res) : setLessons([]);
    });
  }

  const handleEditorError = (e) => {
    setEditorError(e);
  };

  function handleSubmit(values) {
    let { name, point, lessonId, content } = values;
    let data = {
      name,
      point,
      lessonId,
    };
    var formData = new FormData();
    formData.append("Values", JSON.stringify(data));
    formData.append("Content", JSON.stringify(content));
    let resp = dispatch(editTheoryByIdAction(id, formData, token));
    resp.then(r=>setRawContent(r))
  }

  return isFetching || !theory || !rawContent ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Theory:{" "}
            <Text
              color={textColor}
              display="inline-block"
              fontSize="xl"
              fontWeight="semi-bold"
            >
              {theory.name}
            </Text>
          </Text>
        </CardHeader>
        <CardBody>
          <Card p="16px">
            <CardHeader p="12px 5px" mb="12px">
              <Text fontSize="lg" color="teal.300" fontWeight="bold">
                Edit theory
              </Text>
            </CardHeader>
            <CardBody px="5px">
              <Flex direction="column" width="100%">
              <Formik
                  initialValues={{
                    name: theory.name,
                    point: theory.point,
                    lessonId: theory.lessonId,
                    content: rawContent,
                  }}
                  validationSchema={theorySchema}
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
                                placeholder="Name of the theory"
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
                                placeholder="Maximum point"
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

                      <Field name="lessonId">
                        {({ field, form }) => (
                          <FormControl
                            mt="24px"
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
                                label: theory.lesson.name,
                                value: theory.lesson.id,
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

                      <Field name="content">
                        {({ field, form }) => (
                          console.log(field.value, '2'),
                          <FormControl mt="24px">
                            <FormLabel fontWeight="semibold" fontSize="md">
                              Content
                            </FormLabel>
                            <EditorUtil
                              handleEditorError={handleEditorError}
                              onEditorStateChange={onEditorStateChange}
                              form={form}
                              field={field}
                              rawContent={rawContent}
                              setFirstTouch={setFirstTouch}
                              firstTouch={firstTouch}
                            />
                            <Text fontSize="sm" color="#e53e3e">
                              {editorError ??
                                (firstTouch &&
                                  form.errors.content &&
                                  form.touched.content &&
                                  form.errors.content.blocks)}
                            </Text>
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

export default EditTheory;
