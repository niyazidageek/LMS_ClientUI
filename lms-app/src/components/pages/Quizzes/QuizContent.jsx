import { Button } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';

const QuizContent = () => {
    const [count, setCount] = useState(0);
    return (
        <Flex flexDirection='column' justifyContent='center' width='100%'>
        <Text fontSize='3xl' fontWeight='bold' mt='3rem' textAlign='center'>
            suka
        </Text>
        <Button onClick={()=>setCount(prev=>prev+1)}>
            {count}
        </Button>
        </Flex>
    );
}

export default QuizContent;
