import React from "react";
// Chakra imports
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import signInSchema from "../../../validations/signInSchema";
import { NavLink, Redirect } from "react-router-dom";
import validateEmail from "../../../validations/validateEmail";
import validatePassword from "../../../validations/validatePassword";
import { AuthErrorAlert } from '../../alerts/AuthErrorAlert';
import { AuthMessageAlert } from '../../alerts/AuthMessageAlert';
import { signInAction } from '../../../actions/authActions';
import {
  Box,
  FormErrorMessage,
  SwitchControl,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "../../../assets/img/signInImage.png";

export function Login() {
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const dispatch = useDispatch();
    const isFetching = useSelector(state=>state.authReducer.isFetching)
    const isLoggedIn = useSelector(state=>state.authReducer.isLoggedIn)
    function handleSubmit(values) {
       dispatch(signInAction(values))
    }


  if (isLoggedIn) return <Redirect to="/" />;

  return (
    <>
     <AuthErrorAlert />
    <AuthMessageAlert />
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your email and password to sign in
            </Text>

            <Formik
              initialValues={{
                email: "",
                password: "",
                rememberMe: false,
              }}
              validationSchema={signInSchema}
                onSubmit={handleSubmit}
            >
              <Form>
                <FormControl>
                  <Field name="email" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        mb="24px"
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Email
                        </FormLabel>
                        <Input
                          borderRadius="15px"
                          fontSize="sm"
                          type="text"
                          placeholder="Your email adress"
                          size="lg"
                          type="email"
                          {...field}
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                        mb="36px"
                      >
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                          Password
                        </FormLabel>
                        <Input
                          type="password"
                          {...field}
                          borderRadius="15px"
                          fontSize="sm"
                          placeholder="Your password"
                          size="lg"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='rememberMe'>
                    {({ field, form }) => (
                      <FormControl display="flex" alignItems="center">
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
                    fontSize="13px"
                    type="submit"
                    bg="teal.300"
                    isLoading={isFetching}
                    w="100%"
                    h="45"
                    mb="20px"
                    color="white"
                    mt="20px"
                    _hover={{
                      bg: "teal.200",
                    }}
                    _active={{
                      bg: "teal.400",
                    }}
                  >
                    SIGN IN
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
                Don't have an account?
                <NavLink path to="/register">
                    <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                    Sign Up!
                    </Link>
                </NavLink>
              </Text>

              <Text color={textColor} fontWeight="medium">
              Forgot password?
                <NavLink path to="/requestresetpassword">
                    <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                    Reset it!
                    </Link>
                </NavLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
    </>
  );
}

export default Login;
