import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router";
import resetPasswordSchema from "../../../validations/resetPasswordSchema";
import { NavLink, Redirect } from "react-router-dom";
import validateEmail from "../../../validations/validateEmail";
import validatePassword from "../../../validations/validatePassword";
import BgSignUp from "../../../assets/img/BgSignUp.png";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Box,
  useColorModeValue,
  Input,
  Link,
  Button,
  Text,
} from "@chakra-ui/react";
import { useValidateToken } from "../../../hooks/useValidateToken";
import { resetPasswordAction } from "../../../actions/authActions";

const ResetPassword = () => {
  const history = useHistory();
  useValidateToken();
  const dispatch = useDispatch();
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const [resetDone, setResetDone] = useState(false);
  async function handleSubmit(values) {
    await dispatch(resetPasswordAction(values));
    setResetDone(true);
  }

  if (resetDone) return <Redirect to="/login" />;

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
      ></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          Time to enhance your security!
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
        >
          Reset your passowrd.
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          boxSize="xl"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          height="100%"
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <Formik
            initialValues={{
              email: "",
              newPassword: "",
              confirmNewPassword: "",
              token: "",
            }}
            validationSchema={resetPasswordSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormControl>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        E-mail
                      </FormLabel>
                      <Input
                        fontSize="sm"
                        borderRadius="15px"
                        type="text"
                        placeholder="Your e-mail"
                        size="lg"
                        {...field}
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="newPassword" validate={validatePassword}>
                  {({ field, form }) => (
                    <FormControl
                      mt="24px"
                      isInvalid={
                        form.errors.newPassword && form.touched.newPassword
                      }
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        New Password
                      </FormLabel>
                      <Input
                        fontSize="sm"
                        borderRadius="15px"
                        type="password"
                        placeholder="New password"
                        size="lg"
                        {...field}
                      />
                      <FormErrorMessage>
                        {form.errors.newPassword}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="confirmNewPassword">
                  {({ field, form }) => (
                    <FormControl
                      mt="24px"
                      isInvalid={
                        form.errors.confirmNewPassword &&
                        form.touched.confirmNewPassword
                      }
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Confirm New Password
                      </FormLabel>
                      <Input
                        fontSize="sm"
                        borderRadius="15px"
                        type="password"
                        placeholder="Confirm your new password"
                        size="lg"
                        {...field}
                      />
                      <FormErrorMessage>
                        {form.errors.confirmNewPassword}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="token">
                  {({ field, form }) => (
                    <FormControl
                      mt="24px"
                      isInvalid={form.errors.token && form.touched.token}
                    >
                      <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Confirmation token
                      </FormLabel>
                      <Input
                        fontSize="sm"
                        borderRadius="15px"
                        type="password"
                        placeholder="Confirmation token"
                        size="lg"
                        {...field}
                      />
                      <FormErrorMessage>{form.errors.token}</FormErrorMessage>
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
                  RESET
                </Button>
              </FormControl>
            </Form>
          </Formik>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="felx-start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              <Link
                color={titleColor}
                as="span"
                ms="5px"
                onClick={() => history.goBack()}
                fontWeight="bold"
              >
                Go back
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ResetPassword;
