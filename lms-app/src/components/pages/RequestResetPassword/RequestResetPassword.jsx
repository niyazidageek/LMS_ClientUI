import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import {authCreator} from '../../../redux/authCreator'
import requestResetPasswordSchema from '../../../validations/requestResetPasswordSchema';
import { Redirect } from 'react-router-dom';
import validateEmail from '../../../validations/validateEmail';
import validatePassword from '../../../validations/validatePassword';
import { NavLink, useHistory } from 'react-router-dom';
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
import { actionTypes } from '../../../redux/actionTypes';
import { AuthMessageAlert } from '../../alerts/AuthMessageAlert';


const RequestResetPassword = () => {
    const dispatch = useDispatch();
    const isFetching = useSelector(state=>state.authReducer.isFetching)
    function handleSubmit(values) {
        dispatch(authCreator.requestResetPassword(values));
    }
    let history = useHistory();

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
                    <Heading fontSize={'4xl'}>Send a request for a new password</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to secure your account better!
                    </Text>
                </Stack>
                <Box
                    justifyContent='space-around'
                    alignSelf={'center'}
                    boxSize={'sm'}
                    rounded={'lg'}
                    boxShadow={'lg'}
                    height = {'max-content'}
                    p={8}>
                    <Formik
                    initialValues={
                        {
                            email: ''
                        }
                    }
                    validationSchema={requestResetPasswordSchema}
                    onSubmit={handleSubmit}
                    >
                    <Form>
                    <Stack spacing={8}>
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
                        
                        <Stack spacing={6}>
                            <Button
                                isLoading={isFetching}
                                type="submit"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Send
                            </Button>
                        </Stack>
                        <Link fontSize="sm" color={'blue.400'} onClick={()=>history.goBack()}>
                            Go back
                        </Link>
                    </Stack>
                    </Form>
                    </Formik>
                </Box>
            </Stack>
        </Flex>
        </>
    );
}

export default RequestResetPassword;