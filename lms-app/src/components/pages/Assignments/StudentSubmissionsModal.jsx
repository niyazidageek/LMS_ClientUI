import React, { useEffect, useRef } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "chakra-react-select";
import { NavLink, Redirect } from "react-router-dom";
import Card from "../../cards/Card";
import CardBody from "../../cards/CardBody";

import { Icon } from "@chakra-ui/icon";
import {
  FormErrorMessage,
  Flex,
  Box,
  Checkbox,
  Stack,
  Link,
  Heading,
  SimpleGrid,
  RadioGroup,
  Radio,
  Text,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useHistory, useParams } from "react-router";
import { FaExclamationTriangle, FaCheck, FaCheckCircle } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import { createLessonAction } from "../../../actions/lessonActions";
import lessonSchema from "../../../validations/lessonSchema";

const StudentSubmissionsModal = ({ onClick, value, modalContent }) => {
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const dispatch = useDispatch();
  const { submissions, name, surname } = modalContent;

  function submissionClick(id){
    let path = history.location.pathname.split("lesson")[0];
    path = path.concat("detail/" + id);
    history.push(path);
  }

  //   onClick();
  return (
    <Modal size="xl" isOpen={value} onClose={onClick}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontWeight="bold" color="black">
            {name} {surname}'s{" "}
            <Text display="inline-block" color="teal.300" fontWeight="bold">
              submissions
            </Text>
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Card boxShadow="none" p="16px">
            <CardBody>
              <Flex
              borderRadius='5px' 
                direction="column"
                width="100%"
                height={(submissions && submissions.length) != 0 && "400px"}
                overflowY="auto"
              >
                {submissions && submissions.length != 0 ? (
                  submissions.map((ss, index) => {
                    return (
                      <Card
                        onClick={()=>submissionClick(ss.id)}
                        _hover={{
                          bg: "#c9c9c9",
                        }}
                        flexDirection="row"
                        bg="whitesmoke"
                        width='100%'
                        my="0.3rem"
                        p="0.5rem"
                        borderRadius="5px"
                        boxShadow="md"
                        alignItems='center'
                        justifyContent="space-between"
                      >
                        <Flex
                        flexDirection='column'
                        >
                        <Text fontWeight="bold">Submission #{++index}</Text>
                        {ss.graded ? (
                            <Flex color="green.500" alignItems='center'>
                          <Text fontWeight="bold" me='0.3rem'>
                            Graded!
                          </Text>
                          <FaCheckCircle/>
                          </Flex>
                        ) : (
                            <Flex color="red.500" alignItems='center'>
                          <Text fontWeight="bold" me='0.3rem'>
                            Needs grading!
                          </Text>
                          <FaExclamationTriangle/>
                          </Flex>
                        )}
                        </Flex>
                         <Text fontWeight="bold">Grade: {ss.grade.toFixed(2)}</Text>
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
                    This student doesn't have any submissions yet.
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

export default StudentSubmissionsModal;
