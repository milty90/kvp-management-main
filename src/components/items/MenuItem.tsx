interface MenuItemProps {
  onKvpsClick: () => void;
  onStatisticsClick: () => void;
}
export default function MenuItem({
  onKvpsClick,
  onStatisticsClick,
}: MenuItemProps) {
  return (
    <div className="relative z-30 flex flex-col items-start">
      <div className="flex flex-col text-stone-600 absolute top-full bg-stone-50 -right-3 z-2 p-1 border border-gray-300 rounded-md focus:outline-none">
        <button
          onClick={onKvpsClick}
          className="p-2 w-full hover:bg-gray-200 hover:text-blue-600  rounded hover:scale-95 transition-transform duration-250"
        >
          Verbesserungen
        </button>
        <button
          onClick={onStatisticsClick}
          className="p-2 w-full hover:bg-gray-200 hover:text-blue-600  rounded hover:scale-95 transition-transform duration-250"
        >
          Statistik
        </button>
      </div>
    </div>
  );
}
