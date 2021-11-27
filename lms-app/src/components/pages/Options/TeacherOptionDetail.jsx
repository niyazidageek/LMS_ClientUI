import React, { useState, useEffect } from "react";
import { Flex, Text, Button, Image, useColorModeValue } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";

import SpinnerComponent from "../../spinners/SpinnerComponent";
import { fileHelper } from "../../../utils/fileHelper";
import { RiCloseCircleFill } from "react-icons/ri";
import {
  deleteOptionByIdAction,
  getOptionByIdAction,
} from "../../../actions/optionActions";

function TeacherOptionDetail() {
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const option = useSelector((state) => state.optionReducer.option);

  useEffect(() => {
    dispatch(getOptionByIdAction(id));
  }, []);

  function handleOptionEdit(id) {
    let path = history.location.pathname.split("detail")[0];
    path = path.concat("edit" + "/" + id);
    history.push(path);
  }

  function handleDelete(id) {
    let promise = dispatch(deleteOptionByIdAction(id));
    promise.then(() => history.goBack());
  }

  return isFetching || !option ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card
        h={{ xl: "640px" }}
        justifyContent="space-between"
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <CardHeader justifyContent="space-between" p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Option:{" "}
            <Text
              color={textColor}
              display="inline-block"
              fontSize="xl"
              fontWeight="semi-bold"
            >
              {option.name}
            </Text>
          </Text>
          <Flex>
            <Button
              color="white"
              bg="yellow.400"
              _hover={{
                bg: "yellow.500",
              }}
              borderRadius="6px"
              lineHeight="initial"
              me="0.5rem"
              onClick={() => handleOptionEdit(option.id)}
            >
              Edit
            </Button>
            <Button
              color="white"
              bg="red.500"
              _hover={{
                bg: "red.600",
              }}
              borderRadius="6px"
              lineHeight="initial"
              me="0.5rem"
              onClick={() => handleDelete(option.id)}
            >
              Delete
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Card boxShadow="xl" p="16px">
            <CardHeader pb="1rem">
              <Text
                fontSize="xl"
                color="teal.400"
                fontWeight="bold"
                me="10px"
                borderBottom="2px solid"
              >
                Info
              </Text>
            </CardHeader>
            <CardBody h={{ base: "max-content", xl: "380px" }} px="5px">
              <Flex direction="column">
                <Flex align="start" mb="18px">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    me="10px"
                  >
                    Type:
                  </Text>
                  <Text fontSize="md" color="gray.500" fontWeight="400">
                    {option.isCorrect ? (
                      <Flex color="green.500" alignItems="center">
                        <Text me="0.3rem">Correct</Text>
                        <FaCheckCircle />
                      </Flex>
                    ) : (
                      <Flex color="red.500" alignItems="center">
                        <Text me="0.3rem">Incorrect</Text>
                        <RiCloseCircleFill />
                      </Flex>
                    )}
                  </Text>
                </Flex>

                <Flex flexDirection="column" align="start" mb="18px">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    me="10px"
                  >
                    Content:
                  </Text>
                  {option.fileName ? (
                    <Image
                      borderRadius="16px"
                      src={fileHelper.convertToUrl(option.fileName)}
                    />
                  ) : (
                    <Text fontSize="md" color="gray.500" fontWeight="400">
                      No content
                    </Text>
                  )}
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </CardBody>
        <Text
          onClick={() => history.goBack()}
          lineHeight="unset"
          fontWeight="bold"
          fontSize="large"
          bg="transparent"
          _hover={{
            cursor: "pointer",
            color: "teal.300",
          }}
          color="teal.400"
          mt="2rem"
          width="max-content"
        >
          Back
        </Text>
      </Card>
    </Flex>
  );
}

export default TeacherOptionDetail;
