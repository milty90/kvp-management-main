import ReactApexChart from "react-apexcharts";
import type { Kvp } from "../../types";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useTheme } from "../../context/ThemeContext";

interface BarChartProps {
  kvps: Kvp[];
}

export const BarChart = ({ kvps }: BarChartProps) => {
  const categoryCounts = kvps.reduce((acc: Record<string, number>, kvp) => {
    const category = kvp.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(categoryCounts);
  const counts = Object.values(categoryCounts);
  const width = useWindowWidth();
  const { theme } = useTheme();

  const state = {
    series: [
      {
        data: counts,
      },
    ],
    options: {
      chart: {
        type: "bar" as const,
        height: 350,
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
          type="bar"
          height="300"
          width={width < 480 ? 320 : 400}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
