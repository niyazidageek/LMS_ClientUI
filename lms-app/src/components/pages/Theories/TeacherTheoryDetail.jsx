import React, { useState, useEffect, useRef, useMemo } from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";
import classes from "./main.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
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
      <Card
        minH="620px"
        justifyContent="space-between"
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
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

export default TeacherTheoryDetail;
