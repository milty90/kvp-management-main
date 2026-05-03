import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "../../utils/useTranslation";

interface MenuItemProps {
  onKvpsClick: () => void;
  onStatisticsClick: () => void;
}
export default function MenuItem({
  onKvpsClick,
  onStatisticsClick,
}: MenuItemProps) {
  const { theme } = useTheme();
  const translation = useTranslation();
  return (
    <div className="relative z-40 flex flex-col items-start">
      <div
        className={`flex flex-col text-primary absolute top-full w-42 ${theme === "dark" ? "bg-card border-gray-500" : "bg-surface border-gray-300"} -right-2 z-40 p-1 border rounded-md focus:outline-none`}
      >
        <button
          onClick={onKvpsClick}
          className={`text-sm flex text-left p-2 gap-2.5 w-full  ${theme === "dark" ? "hover:text-green-400 hover:bg-gray-500/50" : "hover:text-blue-500 hover:bg-gray-200"}  rounded hover:scale-95 transition-transform duration-250`}
        >
          <img
            src={theme === "dark" ? "./trending.svg" : "./trending-gray.svg"}
            alt="Add"
            className="inline-block h-4.5 w-4.5  object-cover"
          />
          {translation.menuItem.improvements}
        </button>
        <button
          onClick={onStatisticsClick}
          className={`text-sm flex text-left p-2 gap-2.5 w-full  ${theme === "dark" ? "hover:text-green-400 hover:bg-gray-500/50" : "hover:text-blue-500 hover:bg-gray-200"}  rounded hover:scale-95 transition-transform duration-250`}
        >
          <img
            src={theme === "dark" ? "./graph.svg" : "./graph-gray.svg"}
            alt="Statistics"
            className="inline-block h-4.5 w-4.5 object-cover"
          />{" "}
          {translation.menuItem.statistics}
        </button>
      </div>
    </div>
  );
}
