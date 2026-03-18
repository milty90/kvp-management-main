import React from "react";
import ReactApexChart from "react-apexcharts";
import { createRoot } from "react-dom/client";
import type { Kvp } from "../../types";

interface BarChartProps {
  kvps: Kvp[];
}

export const BarChart = ({ kvps }: BarChartProps) => {
  const categoryCounts = kvps.reduce((acc: Record<string, number>, kvp) => {
    acc[kvp.category] = (acc[kvp.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(categoryCounts);
  const counts = Object.values(categoryCounts);

  const [state, setState] = React.useState({
    series: [
      {
        data: counts,
      },
    ],
    options: {
      chart: {
        type: "bar" as const,
        height: 200,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end" as const,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
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
  createRoot(domContainer).render(<BarChart kvps={[]} />);
}
