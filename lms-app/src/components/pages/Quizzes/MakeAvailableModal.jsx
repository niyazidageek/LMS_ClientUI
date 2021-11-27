import React, { useEffect, useRef } from "react";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  getQuizByIdAction,
  makeQuizAvailableByIdAction,
} from "../../../actions/quizActions";

const MakeAvailableModal = ({ onClick, value, quizId }) => {
  const token = useSelector((state) => state.authReducer.jwt);
  const dispatch = useDispatch();
  function handleSubmit(notifyAll) {
    let data = {
      notifyAll: notifyAll,
    };
    let promise = dispatch(makeQuizAvailableByIdAction(quizId, data, token));

    promise.then(() => dispatch(getQuizByIdAction(quizId)));

    onClick();
  }

  return (
    <>
      <Modal isCentered={true} size="sm" isOpen={value} onClose={onClick}>
        <ModalOverlay />
        <ModalContent p="1rem">
          <ModalHeader>
            <Text fontSize="lg" fontWeight="bold">
              Do you want to notify everyone?
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody display="flex" justifyContent="space-between">
            <Button
              _hover={{
                bgColor: "green.600",
              }}
              color="white"
              lineHeight="unset"
              bgColor="green.500"
              me="0.5rem"
              width="100%"
              onClick={() => handleSubmit(true)}
            >
              Yes
            </Button>
            <Button
              _hover={{
                bgColor: "red.600",
              }}
              color="white"
              lineHeight="unset"
              bgColor="red.500"
              ms="0.5rem"
              width="100%"
              onClick={() => handleSubmit(false)}
            >
              No
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MakeAvailableModal;
