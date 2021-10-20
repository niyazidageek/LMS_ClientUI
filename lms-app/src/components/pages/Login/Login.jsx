import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import {authCreator} from '../../../redux/authCreator'
import signInSchema from '../../../validations/signInSchema';
import { NavLink, Redirect } from 'react-router-dom';
import validateEmail from '../../../validations/validateEmail';
import validatePassword from '../../../validations/validatePassword';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Flex,
    Box,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
} from "@chakra-ui/react"
import { AuthErrorAlert } from '../../alerts/AuthErrorAlert';
import { AuthMessageAlert } from '../../alerts/AuthMessageAlert';
import RequestResetPassword from '../RequestResetPassword/RequestResetPassword';


const Login = () => {
    const dispatch = useDispatch();
    const isFetching = useSelector(state=>state.authReducer.isFetching)
    const isLoggedIn = useSelector(state=>state.authReducer.isLoggedIn)
    function handleSubmit(values) {
        dispatch(authCreator.signIn(values));
    }

    if (isLoggedIn) return <Redirect to="/" />;


    return (
        <> 
        <AuthErrorAlert />
        <AuthMessageAlert />
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to start learning!
                    </Text>
                </Stack>
                <Box
                    boxSize={'md'}
                    rounded={'lg'}
                    boxShadow={'lg'}
                    p={8}>
                    <Formik
                    initialValues={
                        {
                            email: '',
                            password:''
                        }
                    }
                    validationSchema={signInSchema}
                    onSubmit={handleSubmit}
                    >
                    <Form>
                    <Stack spacing={4}>
                        <FormControl id="email">
                        <Field name="email" validate={validateEmail}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel htmlFor="email">E-mail</FormLabel>
                                    <Input type='email' {...field} placeholder="E-mail" />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )
                            }
                        </Field>
                        </FormControl>
                        <FormControl id="password">
                        <Field name="password" validate={validatePassword}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Input type='password' {...field} placeholder="Password" />
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )
                            }
                        </Field>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <NavLink exact to="/requestresetpassword" color={'blue.400'} >Forgot password?</NavLink>
                            </Stack>
                            <Button
                                isLoading={isFetching}
                                type="submit"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                    </Form>
                    </Formik>
                </Box>
            </Stack>
        </Flex>
        </>
    );
}

export default Login;
