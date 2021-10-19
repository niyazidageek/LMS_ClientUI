import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import { Container, Text } from '@chakra-ui/layout';
import axios from 'axios';

const ConfirmationSuccess = () => {
    const {id, token} = useParams();
    axios.get(`https://localhost:5001/api/user/confirmemail?userId=${id}&token=${token}`).then(res=>console.log(res));
    return (
        <Container>
            <Text>
                Email has been confirmed!
            </Text>
        </Container>
    );
}

export default ConfirmationSuccess;
