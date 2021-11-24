import React, { useState, useEffect, useMemo } from "react";
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import { actionTypes } from "../../../actions/const";
// Custom components
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Card from "../../cards/Card";
import { dateHelper } from "../../../utils/dateHelper";
import CardHeader from "../../cards/CardHeader";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import LineChart from "../../charts/LineChart";
import { yAxisTypes } from "../../../utils/yAxisTypes";

function SubmissionStatistics() {
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();

  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const currentGroupId = useSelector((state) => state.onBoardReducer.groupId);
  let history = useHistory();

  return isFetching ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px" justifyContent="space-between">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Lessons
          </Text>
        </CardHeader>
        <LineChart
            lineChartData={[{
              name: "Mobile apps",
              data: [30,40],
            }]}
            type={yAxisTypes.PERCENTAGE}
          />
      </Card>
    </Flex>
  );
}

export default SubmissionStatistics;
