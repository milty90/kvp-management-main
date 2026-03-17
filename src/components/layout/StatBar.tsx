import { ApexChart } from "../charts/ApexChart";
import { type Kvp } from "../../types";

interface StatBarProps {
  kvps: Kvp[];
}

export default function StatBar({ kvps }: StatBarProps) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full p-4 rounded-lg bg-white text-gray-800 gap-3 overflow-hidden flex-1 min-h-0 scrollbar-none">
      <div className="flex flex-col items-start rounded-lg border border-dashed border-gray-300 p-2 min-h-0">
        <h1 className="text-sm font-medium text-gray-700">
          PDCA-Phasen Verteilung
        </h1>
        <h2 className="text-md font-semibold text-gray-900">
          Anzahl der Verbesserungen pro Phase
        </h2>
        <div className="flex w-full  space-x-2">
          <ApexChart kvps={kvps} />
        </div>
      </div>
      <div className="flex flex-col items-start rounded-lg border border-dashed border-gray-300 p-2 min-h-0">
        <h1 className="text-sm font-medium text-gray-700">Prioritäten</h1>
        <h2 className="text-md font-semibold text-gray-900">
          Verteilung nach Prioritätsstufen
        </h2>
        <ApexChart kvps={kvps} />
      </div>
      <div className="flex flex-col items-start rounded-lg border border-dashed border-gray-300 p-2 min-h-0">
        <h1 className="text-sm font-medium text-gray-700">Kategorien</h1>
        <h2 className="text-md font-semibold text-gray-900">
          Verbesserungen nach Kategorie
        </h2>
        <ApexChart kvps={kvps} />
      </div>
      <div className="flex flex-col items-start rounded-lg border border-dashed border-gray-300 p-2 min-h-0">
        <h1 className="text-sm font-medium text-gray-700">Zeitverlauf</h1>
        <h2 className="text-md font-semibold text-gray-900">
          Neue Verbesserungen pro Monat
        </h2>
        <ApexChart kvps={kvps} />
      </div>
    </div>
  );
}
