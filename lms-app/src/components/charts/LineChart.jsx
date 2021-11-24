import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {lineChartOptions} from "../../utils/chartOptions";
import { yAxisTypes } from "../../utils/yAxisTypes";

const LineChart = ({ lineChartData, type }) => {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    setData(lineChartData);
    let options = lineChartOptions(type)
    setOptions(options);
  }, []);

  return (
    <ReactApexChart
      y-axis
      options={options}
      series={data}
      type="area"
      width="100%"
      height="100%"
    />
  );
};

export default LineChart;


// const lineChartData = [
//   {
//     name: "Mobile apps",
//     data: [50, 40, 0],
//   },
//   {
//     name: "Websites",
//     data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
//   },
// ];
