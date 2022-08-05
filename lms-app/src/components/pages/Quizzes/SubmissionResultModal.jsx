import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import CardBody from "../../cards/CardBody";
import { Flex, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FaExclamationTriangle, FaCheck, FaCheckCircle } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";

const SubmissionResultModal = ({ onClick, value, appUserOptions }) => {
  return (
    <Modal size="xl" isOpen={value} onClose={onClick}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontWeight="bold" color="black">
            Your submission
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Card boxShadow="none" p="16px">
            <CardBody>
              <Flex
                borderRadius="5px"
                direction="column"
                width="100%"
                height={appUserOptions && appUserOptions.length != 0 && "400px"}
                overflowY="auto"
              >
                {appUserOptions && appUserOptions.length != 0 ? (
                  appUserOptions.map((ao, index) => {
                    return (
                      <Card
                        _hover={{
                          bg: "#c9c9c9",
                        }}
                        flexDirection="row"
                        bg="whitesmoke"
                        width="100%"
                        my="0.3rem"
                        p="0.5rem"
                        borderRadius="5px"
                        boxShadow="md"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Flex flexDirection="column">
                          <Text fontWeight="bold">
                            <Text display="inline-block" color="teal.300">
                              Question:
                            </Text>{" "}
                            {ao.question.name}
                          </Text>
                          <Text mt="0.5rem" fontWeight="bold">
                            <Text display="inline-block" color="teal.600">
                              Your answer:
                            </Text>{" "}
                            {ao.option ? ao.option.name : "No answer."}
                            {}
                          </Text>
                        </Flex>
                        {!ao.option ? (
                          <Flex color="yellow.400" alignItems="center">
                            <Text
                              whiteSpace="nowrap"
                              lineHeight="unset"
                              fontWeight="bold"
                              me="0.3rem"
                            >
                              Not answered!
                            </Text>
                            <FaExclamationTriangle />
                          </Flex>
                        ) : ao.option.isCorrect ? (
                          <Flex color="green.500" alignItems="center">
                            <Text
                              whiteSpace="nowrap"
                              lineHeight="unset"
                              fontWeight="bold"
                              me="0.3rem"
                            >
                              Correct!
                            </Text>
                            <FaCheckCircle />
                          </Flex>
                        ) : (
                          <Flex color="red.500" alignItems="center">
                            <Text
                              whiteSpace="nowrap"
                              fontWeight="bold"
                              me="0.3rem"
                            >
                              Incorrect!
                            </Text>
                            <RiCloseCircleFill />
                          </Flex>
                        )}
                        {/* <Text fontWeight="bold">Grade: {ss.grade.toFixed(2)}</Text> */}
                      </Card>
                    );
                  })
                ) : (
                  <Text
                    fontSize="lg"
                    textAlign="center"
                    fontWeight="bold"
                    color="red.500"
                  >
                    There are no submissions yet..
                  </Text>
                )}
              </Flex>
            </CardBody>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubmissionResultModal;
