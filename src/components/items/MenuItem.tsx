import { useTheme } from "../../context/ThemeContext";

interface MenuItemProps {
  onKvpsClick: () => void;
  onStatisticsClick: () => void;
}
export default function MenuItem({
  onKvpsClick,
  onStatisticsClick,
}: MenuItemProps) {
  const { theme } = useTheme();
  return (
    <div className="relative z-40 flex flex-col items-start">
      <div className="flex flex-col text-text-primary absolute top-full w-42 bg-surface -right-2 z-40 p-1 border border-border rounded-md focus:outline-none">
        <button
          onClick={onKvpsClick}
          className={`text-sm flex text-left p-2 gap-2.5 w-full hover:bg-gray-200 ${theme === "dark" ? "hover:text-purple-500" : "hover:text-blue-500"}  rounded hover:scale-95 transition-transform duration-250`}
        >
          <img
            src={theme === "dark" ? "./trending.svg" : "./trending-gray.svg"}
            alt="Add"
            className="inline-block h-4.5 w-4.5  object-cover"
          />
          Verbesserungen
        </button>
        <button
          onClick={onStatisticsClick}
          className={`text-sm flex text-left p-2 gap-2.5 w-full hover:bg-gray-200 ${theme === "dark" ? "hover:text-green-500" : "hover:text-blue-500"}  rounded hover:scale-95 transition-transform duration-250`}
        >
          <img
            src={
              theme === "dark" ? "./statistics.svg" : "./statistics-gray.svg"
            }
            alt="Statistics"
            className="inline-block h-5 w-5 object-cover"
          />{" "}
          Statistik
        </button>
      </div>
    </div>
  );
}
