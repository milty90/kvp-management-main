import ReactApexChart from "react-apexcharts";
import type { Kvp } from "../../types";
import { useWindowWidth } from "../../utils/useWindowWidth";

interface ColumnChartProps {
  kvps: Kvp[];
}

export const ColumnChart = ({ kvps }: ColumnChartProps) => {
  const lowCount = kvps.filter((k) => k.priority === "Low").length;
  const mediumCount = kvps.filter((k) => k.priority === "Medium").length;
  const highCount = kvps.filter((k) => k.priority === "High").length;
  const width = useWindowWidth();

  const state = {
    series: [
      {
        name: "Anzahl KVPs",
        data: [lowCount, mediumCount, highCount],
      },
    ],
    options: {
      chart: {
        height: 100,
        type: "bar" as const,
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          height: 140,
          borderRadius: 10,
          dataLabels: {
            position: "top" as const,
            padding: 10,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val;
        },
        offsetY: 10,
        style: {
          fontSize: "16px",
          colors: ["#333333"],
        },
      },

      xaxis: {
        categories: ["Niedrig", "Mittel", "Hoch"],
        position: "bottom" as const,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 95],
              opacityFrom: 0.1,
              opacityTo: 0.1,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        labels: {
          show: false,
          formatter: function (val: number) {
            return val.toString();
          },
        },
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={300}
          width={width < 480 ? 350 : 400}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
