import React, { useState, useEffect } from "react";
import {
  Flex,
  Table,
  Tbody,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import { useHistory, useParams } from "react-router";
import classes from "./main.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import draftToHtml from "draftjs-to-html";
import {
  getStudentsTheoryByIdAction,
  markTheoryAsReadAction,
} from "../../../actions/theoryActions";

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
      <Card minH="620px" overflowX={{ sm: "scroll", xl: "hidden" }}>
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
              borderRadius="5px"
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
            style={{ minHeight: "500px" }}
            className={classes.renderedHtml}
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
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

export default StudentTheoryDetail;
