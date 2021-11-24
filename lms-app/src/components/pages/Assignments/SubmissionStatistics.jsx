import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import { yAxisTypes } from "../../charts/yAxisTypes";

function SubmissionStatistics() {
  const textColor = useColorModeValue("gray.700", "white");
  const dispatch = useDispatch();
  const [submissionCountYear, setSubmissionCountYear] = useState(null);
  const [progressCountYear, setProgressCountYear] = useState(null);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const token = useSelector((state) => state.authReducer.jwt);
  const currentGroupId = useSelector((state) => state.onBoardReducer.groupId);
  let history = useHistory();

  const handleSubmissionYearCallback = useCallback((year)=>{
    setSubmissionCountYear(year)
  },[submissionCountYear])

  const handleProgressYearCallback = useCallback((year)=>{
    setProgressCountYear(year)
  },[progressCountYear])

  return isFetching ? (
    <SpinnerComponent />
  ) : (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card my='0.5rem' overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px" justifyContent="space-between">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Number of submissions during the year of{" "}
            <Text
              display="inline-block"
              fontSize="xl"
              color="teal.300"
              fontWeight="bold"
            >
              {submissionCountYear??"...."}
            </Text>
          </Text>
        </CardHeader>
        <LineChart
          yearCallback={handleSubmissionYearCallback}
          actionType={actionTypes.GET_SUBMISSIONS_COUNT_BY_GROUP_ID}
          currentGroupId={currentGroupId}
          optionType={yAxisTypes.NUMBER}
        />
      </Card>

      <Card my='0.5rem' overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px" justifyContent="space-between">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Percentage of assignments being submitted during the year of{" "}
            <Text
              display="inline-block"
              fontSize="xl"
              color="teal.300"
              fontWeight="bold"
            >
              {progressCountYear??"...."}
            </Text>
          </Text>
        </CardHeader>
        <LineChart
          yearCallback={handleProgressYearCallback}
          actionType={actionTypes.GET_ASSIGNMENT_PROGRESS_BY_GROUP_ID}
          currentGroupId={currentGroupId}
          optionType={yAxisTypes.PERCENTAGE}
        />
      </Card>
    </Flex>
  );
}

export default SubmissionStatistics;
