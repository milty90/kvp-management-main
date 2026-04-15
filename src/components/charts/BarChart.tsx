import ReactApexChart from "react-apexcharts";
import type { Kvp } from "../../types";
import { useWindowWidth } from "../../utils/useWindowWidth";

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
  const width = useWindowWidth();

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
          width={width < 400 ? 300 : 400}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
