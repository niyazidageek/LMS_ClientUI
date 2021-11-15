// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  SimpleGrid,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
// Assets
import { AuthErrorAlert } from "../../alerts/AuthErrorAlert";
import { signUpAction } from "../../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import signUpSchema from "../../../validations/signUpSchema";
import { Redirect } from "react-router-dom";
import validateEmail from "../../../validations/validateEmail";
import validatePassword from "../../../validations/validatePassword";
import { NavLink } from "react-router-dom";
import BgSignUp from "../../../assets/img/BgSignUp.png";
import React from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

export function Register() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  function handleSubmit(values) {
    dispatch(signUpAction(values));
  }

  if (isLoggedIn) return <Redirect to="/" />;

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
          Welcome!
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
        >
          Create a new account.
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
          height='100%'
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <Formik
            initialValues={{
              name: "",
              surname: "",
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              rememberMe: "false",
            }}
            validationSchema={signUpSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormControl>
                <SimpleGrid columns={{sm:1,md:1,lg:2,xl:2}} spacing={10}>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        //   mb="24px"
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          First Name
                        </FormLabel>
                        <Input
                          fontSize="sm"
                          ms="4px"
                          borderRadius="15px"
                          type="text"
                          placeholder="Your name"
                          size="lg"
                          {...field}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="surname">
                    {({ field, form }) => (
                      <FormControl
                        //   mb="24px"
                        isInvalid={form.errors.surname && form.touched.surname}
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Last Name
                        </FormLabel>
                        <Input
                          fontSize="sm"
                          ms="4px"
                          borderRadius="15px"
                          type="text"
                          placeholder="Your surname"
                          size="lg"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.surname}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        //   mb="24px"
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Username
                        </FormLabel>
                        <Input
                          fontSize="sm"
                          ms="4px"
                          borderRadius="15px"
                          type="text"
                          placeholder="New username"
                          size="lg"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="email" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        //   mb="24px"
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          E-mail
                        </FormLabel>
                        <Input
                          fontSize="sm"
                          ms="4px"
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

                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        //   mb="24px"
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Password
                        </FormLabel>
                        <Input
                          fontSize="sm"
                          ms="4px"
                          borderRadius="15px"
                          type="password"
                          placeholder="New password"
                          size="lg"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="confirmPassword">
                    {({ field, form }) => (
                      <FormControl
                        //   mb="24px"
                        isInvalid={
                          form.errors.confirmPassword &&
                          form.touched.confirmPassword
                        }
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Confirm Password
                        </FormLabel>
                        <Input
                          fontSize="sm"
                          ms="4px"
                          borderRadius="15px"
                          type="password"
                          placeholder="Confirm your password"
                          size="lg"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.confirmPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </SimpleGrid>

                <Field name="rememberMe">
                  {({ field, form }) => (
                    <FormControl m='24px 0' display="flex" alignItems="center">
                      <Switch
                        id="remember-login"
                        {...field}
                        colorScheme="teal"
                        me="10px"
                      />
                      <FormLabel
                        htmlFor="remember-login"
                        mb="0"
                        ms="1"
                        fontWeight="normal"
                      >
                        Remember me
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
                  mb="24px"
                  _hover={{
                    bg: "teal.200",
                  }}
                  _active={{
                    bg: "teal.400",
                  }}
                >
                  SIGN UP
                </Button>
              </FormControl>
            </Form>
          </Formik>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Already have an account?
              <NavLink path to="/login">
                <Link
                    color={titleColor}
                    as="span"
                    ms="5px"
                    href="#"
                    fontWeight="bold"
                >
                    Sign In
                </Link>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Register;
