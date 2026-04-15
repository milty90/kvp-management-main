import ReactApexChart from "react-apexcharts";
import type { Kvp } from "../../types";
import type { ApexOptions } from "apexcharts";
import { useWindowWidth } from "../../utils/useWindowWidth";

interface SimpleDonutChartProps {
  kvps: Kvp[];
}

export const SimpleDonutChart = ({ kvps }: SimpleDonutChartProps) => {
  const planCount = kvps.filter((k) => k.state === "Plan").length;
  const doCount = kvps.filter((k) => k.state === "Do").length;
  const checkCount = kvps.filter((k) => k.state === "Check").length;
  const actCount = kvps.filter((k) => k.state === "Act").length;
  const width = useWindowWidth();

  const state = {
    series: [planCount, doCount, checkCount, actCount],
    options: {
      chart: {
        type: "donut" as const,
      },

      labels: ["Plan", "Do", "Check", "Act"],
      colors: ["#3B82F6", "#8B5CF6", "#F59E0B", "#10B981"],
      legend: {
        position: "right" as const,
        offsetY: 0,
        itemMargin: {
          vertical: 10,
        },
      },

      stroke: {
        show: true,
        width: 5,
        lineCap: "round",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "55%",

            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "16px",
                fontWeight: 600,
                color: "#373d3f",
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "24px",
                fontWeight: 400,
                color: "#373d3f",
                offsetY: 10,
              },
              total: {
                show: true,
                label: "Gesamt",
                fontSize: "18px",
                fontWeight: 600,
                color: "#373d3f",
              },
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 300,
          options: {
            chart: {
              width: 300,
            },

            legend: {
              position: "center" as const,
            },
          },
        },
      ],
    } as ApexOptions,
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          height="300"
          width={width < 400 ? 300 : 400}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
