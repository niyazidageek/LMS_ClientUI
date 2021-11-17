import React, { useState, useEffect, useRef, useMemo } from "react";
// Chakra imports
import { Formik, Form, Field } from "formik";
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  FormControl,
  Box,
  Input,
  FormErrorMessage,
  Icon,
  Link,
  Td,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaCheckCircle,
  FaFileUpload,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useHistory, useParams } from "react-router";
import { actionTypes } from "../../../actions/const";
import classes from "./main.module.scss";
// Custom components
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { getStudentsAssignmentByIdAction } from "../../../actions/assignmentActions";
import { fileHelper } from "../../../utils/fileHelper";
import {
  getStudentsTheoryByIdAction,
  markTheoryAsReadAction,
} from "../../../actions/theoryActions";
import { getTheoryContent } from "../../../services/theoryService";

function StudentTheoryDetail() {
  const [html, setHtml] = useState(null);
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const theory = useSelector((state) => state.theoryReducer.theory);

  useEffect(() => {
    let resp = dispatch(getStudentsTheoryByIdAction(id, token));
    resp.then((r) => setHtml(draftToHtml(r)));
  }, []);

  function handleMarkAsRead(id) {
    dispatch(markTheoryAsReadAction(id, token));
  }

  return isFetching || !theory || !html ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader justifyContent="space-between" p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Theory:{" "}
            <Text
              color={textColor}
              display="inline-block"
              fontSize="xl"
              fontWeight="semi-bold"
            >
              {theory.name}
            </Text>
          </Text>
          {theory.theoryAppUsers.length != 0 &&
          !theory.theoryAppUsers[0].isRead ? (
            <Button
              onClick={() => handleMarkAsRead(theory.id)}
              lineHeight="unset"
              color="white"
              bg="teal.300"
              _hover={{
                bg: "teal.400",
              }}
              justifySelf="flex-end"
              width="max-content"
            >
              Mark as read
            </Button>
          ) : (
            <Button
              disabled={true}
              bg="teal.300"
              lineHeight="unset"
              _hover={{
                bg: "teal.400",
              }}
              color="white"
              justifySelf="flex-end"
              width="max-content"
            >
              Mark as read
            </Button>
          )}
        </CardHeader>
        <CardBody flexDirection="column">
          <div
            className={classes.renderedHtml}
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </CardBody>

        <Button
          onClick={() => history.goBack()}
          lineHeight="unset"
          bg="transparent"
          outlineColor="teal.300"
          _hover={{
            bg: "teal.400",
            color: "white",
          }}
          color="teal.400"
          mt="2rem"
          width="max-content"
        >
          Back
        </Button>
      </Card>
    </Flex>
  );
}

export default StudentTheoryDetail;
