import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { authCreator } from '../../../redux/authCreator'
import signUpSchema from '../../../validations/signUpSchema';
import { Redirect } from 'react-router-dom';
import validateEmail from '../../../validations/validateEmail';
import validatePassword from '../../../validations/validatePassword';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    FormErrorIcon,
    AlertIcon,
    Container,
    useToast,
    Flex,
    Box,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    SimpleGrid,
    Text,
} from "@chakra-ui/react"
import { AuthSignUpErrorAlert } from '../../alerts/AuthSignUpErrorAlert';


const Register = () => {
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.authReducer.isFetching)
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)
    function handleSubmit(values) {
        dispatch(authCreator.signUp(values));
    }

    if (isLoggedIn) return <Redirect to="/home" />;


    return (
        <>
            <AuthSignUpErrorAlert />
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
            >
                <Stack spacing={8} mx={'auto'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign Up</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to become a better learner!
                        </Text>
                    </Stack>
                    <Box
                        boxSize={'xl'}
                        rounded={'lg'}
                        boxShadow={'lg'}
                        p={8}>
                        <Formik
                            initialValues={
                                {
                                    name: '',
                                    surname: '',
                                    username: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: ''
                                }
                            }
                            validationSchema={signUpSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <Stack spacing={4}>
                                    <SimpleGrid columns={2} spacing={10}>
                                    <FormControl id="name">
                                        <Field name="name">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                    <FormLabel htmlFor="name">First name</FormLabel>
                                                    <Input {...field} placeholder="Name" />
                                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                                </FormControl>
                                            )
                                            }
                                        </Field>
                                    </FormControl>
                                    <FormControl id="surname">
                                        <Field name="surname">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.surname && form.touched.surname}>
                                                    <FormLabel htmlFor="lastname">Surname</FormLabel>
                                                    <Input {...field} placeholder="Surname" />
                                                    <FormErrorMessage>{form.errors.surname}</FormErrorMessage>
                                                </FormControl>
                                            )
                                            }
                                        </Field>
                                    </FormControl>
                                    <FormControl id="username">
                                        <Field name="username">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.username && form.touched.username}>
                                                    <FormLabel htmlFor="username">Username</FormLabel>
                                                    <Input {...field} placeholder="Username" />
                                                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                                </FormControl>
                                            )
                                            }
                                        </Field>
                                    </FormControl>
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
                                    <FormControl id="confirmPassword">
                                        <Field name="confirmPassword">
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                                    <FormLabel htmlFor="confirmPassword">Confirm your password</FormLabel>
                                                    <Input type='password' {...field} placeholder="Confirm your password" />
                                                    <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                                                </FormControl>
                                            )
                                            }
                                        </Field>
                                    </FormControl>
                                    </SimpleGrid>
                                    <Stack spacing={10}>
                                        <Stack
                                            direction={{ base: 'column', sm: 'row' }}
                                            align={'start'}
                                            justify={'space-between'}>
                                            <Checkbox>Remember me</Checkbox>
                                        </Stack>
                                        <Button
                                            isLoading={isFetching}
                                            type="submit"
                                            bg={'blue.400'}
                                            color={'white'}
                                            _hover={{
                                                bg: 'blue.500',
                                            }}>
                                            Sign up
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

export default Register;
