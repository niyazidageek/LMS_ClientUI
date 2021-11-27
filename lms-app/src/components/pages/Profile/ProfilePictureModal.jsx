import React, { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, FieldArray } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
  FormErrorMessage,
  Flex,
  Box,
  Stack,
  Divider,
  Image,
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
import profilePictureSchema from "../../../validations/profilePictureSchema";
import { fileHelper } from "../../../utils/fileHelper";
import {
  editProfilePictureAction,
  getProfileAction,
} from "../../../actions/profileActions";

const ProfilePictureModal = ({ onClick, value, profilePicture }) => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [src, setSrc] = useState([]);

  function handleSubmit(values) {
    const { file, fileName } = values;

    let data = {
      fileName: fileName[0],
    };

    var formData = new FormData();

    formData.append("Picture", file[0]);
    formData.append("Value", JSON.stringify(data));

    let promise = dispatch(editProfilePictureAction(token, formData));

    promise.then(() => dispatch(getProfileAction(token)));
    onClick();
  }

  return (
    <>
      <Modal size="xs" isOpen={value} onClose={onClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="lg" color="teal.300" fontWeight="bold">
              Change profile picture
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Formik
              initialValues={{
                fileName: profilePicture ? [profilePicture] : [],
                file: [],
              }}
              validationSchema={profilePictureSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <FormControl>
                  <FieldArray name="fileName">
                    {({ remove, push, form, field }) => (
                      <>
                        <FormLabel fontWeight="semibold" fontSize="md">
                          Picture
                        </FormLabel>
                        {form.values.fileName.length > 0 || src.length > 0 ? (
                          <Box width="100%">
                            {
                              (src[0] && (form.values.fileName = src),
                              console.log(form.values.fileName))
                            }
                            {form.values.fileName.map(
                              (file, index) => (
                                console.log(index),
                                (
                                  <Box
                                    paddingRight="4"
                                    paddingLeft="4"
                                    borderRadius="md"
                                  >
                                    <Stack
                                      justifyContent="center"
                                      alignItems="center"
                                      key={index}
                                      direction="column"
                                      width="100%"
                                    >
                                      <Image
                                        maxH="200px"
                                        maxW="200px"
                                        borderRadius="15px"
                                        wordBreak="break-all"
                                        cursor="pointer"
                                        src={
                                          src[0] ??
                                          fileHelper.convertToUrl(
                                            profilePicture
                                          )
                                        }
                                      />

                                      <Flex
                                        width="100%"
                                        justifyContent="space-between"
                                      >
                                        <Button
                                          borderRadius="5px"
                                          width="max-content"
                                          onClick={() => {
                                            remove(index);
                                            setSrc([]);
                                            form.setFieldValue("fileName", []);
                                          }}
                                          size="sm"
                                          color="white"
                                          bgColor="red.500"
                                        >
                                          Delete
                                        </Button>
                                        <Button
                                          borderRadius="5px"
                                          width="max-content"
                                          onClick={() =>
                                            fileRef.current.click()
                                          }
                                          size="sm"
                                          color="white"
                                          bgColor="blue.500"
                                        >
                                          Update
                                        </Button>
                                      </Flex>
                                    </Stack>
                                    {form.values.fileName.length > 1 ? (
                                      <Divider />
                                    ) : null}
                                  </Box>
                                )
                              )
                            )}
                          </Box>
                        ) : (
                          <Flex alignItems="center" flexDirection="column">
                            <Box
                              width="100%"
                              border="1px"
                              borderRadius="15px"
                              borderColor="gray.200"
                            >
                              <Box
                                textAlign="center"
                                p="1rem"
                                borderRadius="15px"
                              >
                                <Text color="gray.500">No photo..</Text>
                              </Box>
                            </Box>
                            <Button
                              marginTop="24px"
                              borderRadius="5px"
                              width="max-content"
                              _hover={{
                                bg: "green.600",
                              }}
                              onClick={() => fileRef.current.click()}
                              size="sm"
                              color="white"
                              bgColor="green.500"
                            >
                              Add a new photo
                            </Button>
                          </Flex>
                        )}
                      </>
                    )}
                  </FieldArray>

                  <Field name="file">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.file && form.touched.file}
                      >
                        <Input
                          ref={fileRef}
                          type="file"
                          placeholder="Files"
                          display="none"
                          onChange={(e) => {
                            form.setFieldValue(field.name, [e.target.files[0]]);
                            const reader = new FileReader();
                            console.log(e.target.files[0]);
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onload = function () {
                              setSrc([reader.result]);
                            };
                          }}
                        />
                        <FormErrorMessage>{form.errors.file}</FormErrorMessage>
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

export default ProfilePictureModal;
