import React, { useState } from 'react';
import {useParams, NavLink, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {authCreator} from '../../../redux/authCreator'
import { AuthErrorAlert } from '../../alerts/AuthErrorAlert';
import { AuthMessageAlert } from '../../alerts/AuthMessageAlert';

import axios from 'axios';import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
  } from '@chakra-ui/react';

const ConfirmEmail = () => {
    const isFetching = useSelector(state=>state.authReducer.isFetching)
    const {id, token} = useParams();
    const dispatch = useDispatch();

    function handleSubmit(){
      const values = {userId:id,token};
      dispatch(authCreator.confirmEmail(values));
    }

    return (
        <Container maxW={'3xl'}>
        <AuthMessageAlert />
        <AuthErrorAlert />
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Confirm your email! <br />
            <Text as={'span'} color={'green.400'}>
              Just click the button
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Without confirming your e-mail, you will not be able to
            get the maximum from our app 😕
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'green'}
              isLoading={isFetching}
              bg={'green.400'}
              rounded={'full'}
              onClick={()=>handleSubmit()}
              px={6}
              _hover={{
                bg: 'green.500',
              }}>
              Confirm e-mail
            </Button>
            <NavLink to="/">
                <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                    Go to home
                </Button>
            </NavLink>
            <Box>
            </Box>
          </Stack>
        </Stack>
      </Container>
    );
}

export default ConfirmEmail;
