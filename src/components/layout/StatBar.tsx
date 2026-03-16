export default function StatBar() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full p-4 rounded-lg bg-white text-gray-800 gap-3 overflow-hidden flex-1 min-h-0 scrollbar-none">
      <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 min-h-0">
        <p className="text-xs text-gray-500">Keine Elemente</p>
      </div>
      <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 min-h-0">
        <p className="text-xs text-gray-500">Keine Elemente</p>
      </div>
      <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 min-h-0">
        <p className="text-xs text-gray-500">Keine Elemente</p>
      </div>
      <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 min-h-0">
        <p className="text-xs text-gray-500">Keine Elemente</p>
      </div>
    </div>
  );
}
