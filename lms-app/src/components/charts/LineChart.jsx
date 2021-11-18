import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {lineChartOptions} from "../../utils/chartOptions";

const LineChart = ({ lineChartData }) => {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    setData(lineChartData);
    setOptions(lineChartOptions);
  }, []);

  return (
    <ReactApexChart
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
