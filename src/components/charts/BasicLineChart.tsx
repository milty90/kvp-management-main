import ReactApexChart from "react-apexcharts";
import type { Kvp } from "../../types";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useTheme } from "../../context/ThemeContext";

interface BasicLineChartProps {
  kvps: Kvp[];
}

const MONTH_LABELS = [
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
];

export const BasicLineChart = ({ kvps }: BasicLineChartProps) => {
  const width = useWindowWidth();
  const { theme } = useTheme();
  const countsByMonth: number[] = Array(12).fill(0);
  kvps.forEach((k) => {
    const date = new Date(k.createdAt);
    if (!isNaN(date.getTime())) {
      countsByMonth[date.getMonth()] += 1;
    }
  });

  const state = {
    series: [
      {
        data: countsByMonth,
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
          colors:
            theme === "dark"
              ? ["#333", "transparent"]
              : ["#f3f3f3", "transparent"],
        },
      },
      xaxis: {
        categories: MONTH_LABELS,
        labels: {
          style: {
            colors: theme === "dark" ? "#fff" : "#000",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: theme === "dark" ? "#fff" : "#000",
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
          type="line"
          height="300"
          width={width < 480 ? 350 : 400}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
