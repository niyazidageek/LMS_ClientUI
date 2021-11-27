import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartOptions } from "./chartOptions";
import { yAxisTypes } from "./yAxisTypes";
import SpinnerComponent from "../spinners/SpinnerComponent";
import { useSelector } from "react-redux";
import { actionTypes } from "../../actions/const";
import { Select } from "chakra-react-select";
import {
  getAssignmentProgressByGroupId,
  getSubmissionsCountByGroupId,
} from "../../services/submissionStatisticsServce";
import { Spinner } from "@chakra-ui/spinner";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

const LineChart = React.memo(
  ({ actionType, optionType, currentGroupId, yearCallback }) => {
    const [options, setOptions] = useState(null);
    const [statistics, setStatistics] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [year, setYear] = useState(null);
    const token = useSelector((state) => state.authReducer.jwt);
    useEffect(() => {
      let options = lineChartOptions(optionType);
      setOptions(options);

      switch (actionType) {
        case actionTypes.GET_SUBMISSIONS_COUNT_BY_GROUP_ID:
          getSubmissionsCountByGroupId(currentGroupId, token, year)
            .then((res) => {
              setStatistics(res.data);
              yearCallback(res.data.currentYear);
            })
            .then(() => setIsFetching(false));
          break;
        case actionTypes.GET_ASSIGNMENT_PROGRESS_BY_GROUP_ID:
          getAssignmentProgressByGroupId(currentGroupId, token, year)
            .then((res) => {
              setStatistics(res.data);
              yearCallback(res.data.currentYear);
            })
            .then(() => setIsFetching(false));
        default:
          break;
      }
    }, [currentGroupId, year]);

    return isFetching || !statistics ? (
      <Spinner color="teal.300" alignSelf="center" />
    ) : (
      <>
        <Select
          closeMenuOnSelect={true}
          placeholder="Select a year"
          defaultValue={{
            label: `${statistics.currentYear}`,
            value: statistics.currentYear,
          }}
          onChange={(value) => setYear(value.value)}
          options={statistics.years.map((y) => ({
            label: `${y}`,
            value: y,
          }))}
        />
        <ReactApexChart
          options={options}
          series={[
            {
              name: "Submissions",
              data: statistics.data,
            },
          ]}
          type="area"
          width="100%"
          height="100%"
        />
      </>
    );
  }
);
export default LineChart;
