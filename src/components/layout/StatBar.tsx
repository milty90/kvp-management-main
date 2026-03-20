import { type Kvp } from "../../types";
import { ColumnChart } from "../charts/ColumnChart";
import { BarChart } from "../charts/BarChart";
import { BasicLineChart } from "../charts/BasicLineChart";
import { SimpleDonutChart } from "../charts/SimpleDonutChart";

interface StatBarProps {
  kvps: Kvp[];
}

export default function StatBar({ kvps }: StatBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full min-h-0 content-start overflow-y-auto p-3 rounded-lg bg-white text-gray-800 gap-3 scrollbar-none">
      <div className="flex flex-col items-start rounded-lg border border-dashed border-gray-300 p-4 pb-0 ">
        <h1 className="text-sm font-medium pl-0.5 text-gray-700">
          PDCA-Phasen Verteilung
        </h1>
        <h2 className="text-md font-semibold pl-0.5 text-gray-900">
          Anzahl der Verbesserungen pro Phase
        </h2>
        <div className="flex w-full h-full mt-5 items-center justify-center mb-5 pr-10">
          {/* <DonutChart kvps={kvps} /> */}
          <SimpleDonutChart kvps={kvps} />
        </div>
      </div>
      <div className="flex flex-col items-start rounded-lg border border-dashed border-gray-300 p-4 pb-0 ">
        <h1 className="text-sm font-medium pl-0.5 text-gray-700">
          Prioritäten
        </h1>
        <h2 className="text-md font-semibold pl-0.5 text-gray-900">
          Verteilung nach Prioritätsstufen
        </h2>
        <div className="flex w-full h-full mt-5 items-center justify-center pr-5">
          <ColumnChart kvps={kvps} />
        </div>
      </div>
      <div className="flex flex-col items-start rounded-lg border border-dashed border-gray-300 p-4 pb-0 ">
        <h1 className="text-sm font-medium pl-0.5 text-gray-700">Kategorien</h1>
        <h2 className="text-md font-semibold pl-0.5 text-gray-900">
          Verbesserungen nach Kategorie
        </h2>
        <div className="flex w-full h-full mt-5 items-center justify-center pr-10">
          <BarChart kvps={kvps} />
        </div>
      </div>
      <div className="flex flex-col items-start  rounded-lg border border-dashed border-gray-300 p-4 pb-0 ">
        <h1 className="text-sm font-medium pl-0.5 text-gray-700">
          Zeitverlauf
        </h1>
        <h2 className="text-md font-semibold pl-0.5 text-gray-900">
          Neue Verbesserungen pro Monat
        </h2>
        <div className="flex w-full h-full mt-5 items-center justify-center pr-5">
          <BasicLineChart kvps={kvps} />
        </div>
      </div>
    </div>
  );
}
