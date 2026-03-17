import ReactApexChart from "react-apexcharts";
import type { Kvp } from "../../types";

interface ApexChartProps {
  kvps: Kvp[];
}

export const ApexChart = ({ kvps }: ApexChartProps) => {
  const planCount = kvps.filter((k) => k.state === "Plan").length;
  const doCount = kvps.filter((k) => k.state === "Do").length;
  const checkCount = kvps.filter((k) => k.state === "Check").length;
  const actCount = kvps.filter((k) => k.state === "Act").length;

  const series: number[] = [planCount, doCount, checkCount, actCount];

  const options = {
    chart: {
      width: 300,
      type: "pie",
    },
    labels: ["Plan", "Do", "Check", "Act"],
    legend: {
      position: "right",
    },
    responsive: [
      {
        breakpoint: 380,
        options: {
          chart: { width: 150 },
          legend: { position: "top" },
        },
      },
    ],
  };

  console.log("kvps:", kvps);
  console.log("series:", series);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          series={series}
          options={options as any}
          type="pie"
          width={290}
        />
      </div>
    </div>
  );
};
