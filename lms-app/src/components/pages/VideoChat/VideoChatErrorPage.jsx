import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";

import axios from "axios";
import {
  Box,
  Link,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";

const VideoChatErrorPage = ({message}) => {

  const titleColor = useColorModeValue("teal.300", "teal.200");

  return (
    <Container maxW={"3xl"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Sorry! <br />
          <Text as={"span"} color={"teal.300"}>
            {message}
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Click the button below in order to go to home
        </Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Text fontWeight="medium" color={titleColor}>
            <NavLink to="/">
              <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                Go to home
              </Link>
            </NavLink>
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
};

export default VideoChatErrorPage;
