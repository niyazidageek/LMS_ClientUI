import React, { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "chakra-react-select";
import { FaFileUpload, FaExclamationTriangle } from "react-icons/fa";
import { Icon } from "@chakra-ui/icon";
import {
  FormErrorMessage,
  Flex,
  Box,
  Checkbox,
  Stack,
  Switch,
  Link,
  Heading,
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
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { searchLessonsByGroupIdAction } from "../../../actions/lessonActions";
import assignmentSchema from "../../../validations/assignmentSchema";
import { createAssignmentAction } from "../../../actions/assignmentActions";

const CreateAssignmentModal = ({ onClick, value, fetchMore }) => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const currentGroupId = useSelector((state) => state.onBoardReducer.groupId);
  const [lessons, setLessons] = useState([]);
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  function handleSearchInput(input) {
    let lessons = dispatch(
      searchLessonsByGroupIdAction(currentGroupId, input.trim())
    );
    lessons.then((res) => {
      res ? setLessons(res) : setLessons([]);
    });
  }
  function handleSubmit(values) {
    let { name, deadline, description, lessonId, maxGrade, files, notifyAll } =
      values;
    let data = {
      name,
      deadline,
      description,
      maxGrade,
      lessonId,
      notifyAll,
    };

    var formData = new FormData();
    formData.append("Values", JSON.stringify(data));
    var ins = files.length;
    for (var x = 0; x < ins; x++) {
      formData.append("Materials", files[x]);
    }

    let promise = dispatch(createAssignmentAction(formData, token));

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
              Create an assingment
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                description: "",
                deadline: "",
                maxGrade: "",
                files: [],
                lessonId: "",
                notifyAll: false,
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

                        <FormErrorMessage>{form.errors.files}</FormErrorMessage>
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
                    <FaExclamationTriangle size={70} />
                  </Flex>

                  <Field name="notifyAll">
                    {({ field, form }) => (
                      <FormControl mt="12px" display="flex" alignItems="center">
                        <Switch
                          id="notify-all"
                          {...field}
                          colorScheme="teal"
                          me="10px"
                        />
                        <FormLabel
                          htmlFor="notify-all"
                          mb="0"
                          ms="1"
                          fontWeight="bold"
                        >
                          Notify all
                        </FormLabel>
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

export default CreateAssignmentModal;
