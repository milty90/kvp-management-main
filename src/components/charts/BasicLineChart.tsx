import React from "react";
import ReactApexChart from "react-apexcharts";
import type { Kvp } from "../../types";
import { createRoot as reactCreateRoot } from "react-dom/client";

interface BasicLineChartProps {
  kvps: Kvp[];
}
export const BasicLineChart = ({ kvps }: BasicLineChartProps) => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 120, 130, 160],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line" as const,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth" as const,
      },

      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={300}
          width={450}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

const domContainer = document.querySelector("#app");
if (domContainer) {
  const root = createRoot(domContainer);
  root.render(<BasicLineChart kvps={[]} />);
}
function createRoot(domContainer: Element) {
  return reactCreateRoot(domContainer);
}
