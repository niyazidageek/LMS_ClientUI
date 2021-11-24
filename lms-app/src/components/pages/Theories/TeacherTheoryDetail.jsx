import React, { useState, useEffect, useRef, useMemo } from "react";
// Chakra imports
import { Formik, Form, Field } from "formik";
import {
  Flex,
  Table,
  Tbody,
  Text,
  Button,
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
import draftToHtml from "draftjs-to-html";
import { getTheoryByIdAction } from "../../../actions/theoryActions";

function TeacherTheoryDetail() {
  const [html, setHtml] = useState(null);
  let { id } = useParams();
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const theory = useSelector((state) => state.theoryReducer.theory);

  useEffect(() => {
    let resp = dispatch(getTheoryByIdAction(id));
    resp.then((r) => setHtml(draftToHtml(r)));
  }, []);

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

export default TeacherTheoryDetail;
