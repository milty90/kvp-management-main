import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "../../utils/useTranslation";

interface CardMenuItemProps {
  onEdit: () => void;
  onArchive: () => void;
  onReject: () => void;
  onDelete: () => void;
  isRejected?: boolean;
}

export default function CardMenuItem({
  onEdit,
  onArchive,
  onReject,
  onDelete,
  isRejected = false,
}: CardMenuItemProps) {
  const { theme } = useTheme();
  const translations = useTranslation();
  return (
    <div className="relative z-10 flex flex-col items-start">
      <div
        className={`flex flex-col text-text-primary absolute top-full bg-card -right-3 z-2 p-1 border rounded-md focus:outline-none ${theme === "dark" ? "bg-card border-gray-500" : "bg-surface border-gray-300"}`}
      >
        <button
          onClick={onEdit}
          className={`p-2 text-sm w-full ${theme === "dark" ? "hover:bg-gray-500/50 hover:text-green-400" : "hover:bg-gray-200 hover:text-blue-600"} rounded hover:scale-95 transition-transform duration-250 ${isRejected ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isRejected}
        >
          {translations.cardMenuItem.edit}
        </button>
        <button
          onClick={onArchive}
          className={`p-2 text-sm w-full ${theme === "dark" ? "hover:bg-gray-500/50 hover:text-green-400" : "hover:bg-gray-200 hover:text-blue-600"} rounded hover:scale-95 transition-transform duration-250 ${isRejected ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isRejected}
        >
          {translations.cardMenuItem.archive}
        </button>
        <button
          onClick={onReject}
          className={`p-2 text-sm w-full ${theme === "dark" ? "hover:bg-gray-500/50 hover:text-green-400" : "hover:bg-gray-200 hover:text-blue-600"} rounded hover:scale-95 transition-transform duration-250 ${isRejected ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isRejected}
        >
          {translations.cardMenuItem.reject}
        </button>
        <button
          onClick={onDelete}
          className={`p-2 text-sm w-full ${theme === "dark" ? "hover:bg-gray-500/50 hover:text-red-500" : "hover:bg-gray-200 hover:text-red-600"} rounded hover:scale-95 transition-transform duration-250`}
        >
          {translations.cardMenuItem.delete}
        </button>
      </div>
    </div>
  );
}
