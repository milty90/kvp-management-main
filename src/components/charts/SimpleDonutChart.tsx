import React from "react";
import ReactApexChart from "react-apexcharts";
import { createRoot } from "react-dom/client";
import type { Kvp } from "../../types";
import type { ApexOptions } from "apexcharts";

interface SimpleDonutChartProps {
  kvps: Kvp[];
}

export const SimpleDonutChart = ({ kvps }: SimpleDonutChartProps) => {
  const planCount = kvps.filter((k) => k.state === "Plan").length;
  const doCount = kvps.filter((k) => k.state === "Do").length;
  const checkCount = kvps.filter((k) => k.state === "Check").length;
  const actCount = kvps.filter((k) => k.state === "Act").length;
  const [state, setState] = React.useState({
    series: [planCount, doCount, checkCount, actCount],
    options: {
      chart: {
        type: "donut" as const,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    } as ApexOptions,
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

const domContainer = document.querySelector("#app");
if (domContainer) {
  const root = createRoot(domContainer);
  root.render(<SimpleDonutChart kvps={[]} />);
}
