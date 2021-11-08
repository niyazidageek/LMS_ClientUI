import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router';
import resetPasswordSchema from '../../../validations/resetPasswordSchema';
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
import { useValidateToken } from '../../../hooks/useValidateToken';
import { resetPasswordAction } from '../../../actions/authActions';


const ResetPassword = () => {
    const history = useHistory();
    useValidateToken()
    const dispatch = useDispatch();
    const isFetching = useSelector(state=>state.authReducer.isFetching)
    const [resetDone, setResetDone] = useState(false);
    async function handleSubmit(values) {
        await dispatch(resetPasswordAction(values));
        setResetDone(true);
    }

    if(resetDone) return <Redirect to="/login" />;

    return (
        <> 
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Reset your password</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to secure your account better!
                    </Text>
                </Stack>
                <Box
                    alignSelf={'center'}
                    boxSize={'lg'}
                    rounded={'lg'}
                    height={'max-content'}
                    boxShadow={'lg'}
                    p={8}>
                    <Formik
                    initialValues={
                        {
                            email: '',
                            newPassword:'',
                            confirmNewPassword:'',
                            token:''
                        }
                    }
                    validationSchema={resetPasswordSchema}
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
                        <FormControl id="newPassword">
                        <Field name="newPassword" validate={validatePassword}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.newPassword && form.touched.newPassword}>
                                    <FormLabel htmlFor="newPassword">New Password</FormLabel>
                                    <Input type='password' {...field} placeholder="New Password" />
                                    <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                                </FormControl>
                            )
                            }
                        </Field>
                        </FormControl>
                        <FormControl id="confirmNewPassword">
                        <Field name="confirmNewPassword">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.confirmNewPassword && form.touched.confirmNewPassword}>
                                    <FormLabel htmlFor="confirmNewPassword">Confrim your Password</FormLabel>
                                    <Input type='password' {...field} placeholder="Confirm new Password" />
                                    <FormErrorMessage>{form.errors.confirmNewPassword}</FormErrorMessage>
                                </FormControl>
                            )
                            }
                        </Field>
                        </FormControl>
                        <FormControl id="token">
                        <Field name="token">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.token && form.touched.token}>
                                    <FormLabel htmlFor="token">Security code</FormLabel>
                                    <Input type='password' {...field} placeholder="Security code" />
                                    <FormErrorMessage>{form.errors.token}</FormErrorMessage>
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
                                Reset
                            </Button>
                            <Link fontSize="sm" color={'blue.400'} onClick={()=>history.goBack()}>
                            Go back
                            </Link>
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

export default ResetPassword;