import { type Kvp } from "../../types";
import { ColumnChart } from "../charts/ColumnChart";
import { BarChart } from "../charts/BarChart";
import { BasicLineChart } from "../charts/BasicLineChart";
import { SimpleDonutChart } from "../charts/SimpleDonutChart";
import { useTranslation } from "../../utils/useTranslation";

interface StatBarProps {
  kvps: Kvp[];
}

export default function StatBar({ kvps }: StatBarProps) {
  const translation = useTranslation();
  return (
    <div className="grid grid-cols-1 mb-8 md:grid-cols-1 lg:grid-cols-2 w-full h-full min-h-0 content-start p-3 rounded-xl bg-surface text-gray-800 gap-3 overflow-y-auto scrollbar-none">
      <div className="flex flex-col items-start rounded-lg border border-dashed border-border p-4 pb-0 ">
        <h1 className="text-sm font-medium pl-0.5 text-text-secondary">
          {translation.statistics.DonutChart.title}
        </h1>
        <h2 className="text-md font-semibold pl-0.5 text-text-primary">
          {translation.statistics.DonutChart.description}
        </h2>
        <div className="flex w-full h-full mt-5 items-center justify-center mb-5">
          <SimpleDonutChart kvps={kvps} />
        </div>
      </div>
      <div className="flex flex-col items-start rounded-lg border border-dashed border-border p-4 pb-0 ">
        <h1 className="text-sm font-medium pl-0.5 text-text-secondary">
          {translation.statistics.ColumnChart.title}
        </h1>
        <h2 className="text-md font-semibold pl-0.5 text-text-primary">
          {translation.statistics.ColumnChart.description}
        </h2>
        <div className="flex w-full h-full mt-5 items-center justify-center">
          <ColumnChart kvps={kvps} />
        </div>
      </div>
      <div className="flex  flex-col items-start rounded-lg border border-dashed border-border p-4 pb-0 ">
        <h1 className="text-sm font-medium pl-0.5 text-text-secondary">
          {translation.statistics.BarChart.title}
        </h1>
        <h2 className="text-md font-semibold pl-0.5 text-text-primary">
          {translation.statistics.BarChart.description}
        </h2>
        <div className="flex w-full h-full mt-5 items-center justify-center">
          <BarChart kvps={kvps} />
        </div>
      </div>
      <div className="flex flex-col items-start rounded-lg border border-dashed border-border p-4 pb-0 ">
        <h1 className="text-sm font-medium pl-0.5 text-text-secondary">
          {translation.statistics.LineChart.title}
        </h1>
        <h2 className="text-md font-semibold pl-0.5 text-text-primary">
          {translation.statistics.LineChart.description}
        </h2>
        <div className="flex w-full h-full mt-5 items-center justify-center">
          <BasicLineChart kvps={kvps} />
        </div>
      </div>
    </div>
  );
}
