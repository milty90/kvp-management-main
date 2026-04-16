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
      <div className="flex flex-col text-stone-600 absolute top-full w-42 bg-stone-50 -right-2 z-2 p-1 border border-gray-300 rounded-md focus:outline-none">
        <button
          onClick={onKvpsClick}
          className="text-sm flex text-left p-2 gap-2.5 w-full hover:bg-gray-200 hover:text-blue-600  rounded hover:scale-95 transition-transform duration-250"
        >
          <img
            src="./trending-gray.svg"
            alt="Add"
            className="inline-block h-4.5 w-4.5  object-cover"
          />
          Verbesserungen
        </button>
        <button
          onClick={onStatisticsClick}
          className="text-sm flex text-left p-2 gap-2.5 w-full hover:bg-gray-200 hover:text-blue-600  rounded hover:scale-95 transition-transform duration-250"
        >
          <img
            src="./graph-gray.svg"
            alt="Statistics"
            className="inline-block h-5 w-5 object-cover"
          />{" "}
          Statistik
        </button>
      </div>
    </div>
  );
}
