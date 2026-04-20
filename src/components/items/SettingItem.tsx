import { useTheme } from "../../context/ThemeContext";

interface SettingItemProps {
  onSetting: () => void;
  onProfile: () => void;
  onLogout: () => void;
}
export function SettingItem({
  onSetting,
  onProfile,
  onLogout,
}: SettingItemProps) {
  const { theme } = useTheme();
  return (
    <div className="relative z-50 flex flex-col items-start">
      <div
        className={`flex flex-col text-stone-600 absolute top-full shadow-md -right-2 z-50 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark" ? "bg-card text-white border-gray-500" : "bg-stone-50 text-stone-600 border-gray-300"}`}
      >
        <button
          onClick={onSetting}
          className={`text-sm p-2  text-start  hover:text-blue-600 rounded hover:scale-95 transition-transform duration-150 ${theme === "dark" ? "hover:text-green-500 hover:bg-gray-500/50" : "hover:text-blue-600 hover:bg-gray-200"}`}
        >
          Einstellungen
        </button>
        <button
          onClick={onProfile}
          className={`text-sm p-2  text-start    hover:text-blue-600 rounded hover:scale-95 transition-transform duration-150 ${theme === "dark" ? "hover:bg-gray-500/50 hover:text-green-500" : "hover:bg-gray-200 hover:text-blue-600"}`}
        >
          Profile
        </button>
        <button
          onClick={onLogout}
          className={`text-sm p-2  text-start hover:bg-gray-200 hover:text-red-600 rounded hover:scale-95 transition-transform duration-150 ${theme === "dark" ? "hover:bg-gray-500/50 hover:text-red-500" : "hover:bg-gray-200 hover:text-red-600"}`}
        >
          Abmelden
        </button>
      </div>
    </div>
  );
}
