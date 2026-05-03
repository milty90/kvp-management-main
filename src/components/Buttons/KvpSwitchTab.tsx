import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "../../utils/useTranslation";

interface KvpSwitchTabProps {
  isArchiveOpen: boolean;
  onChange?: (state: boolean) => void;
}

export function KvpSwitchTab({ isArchiveOpen, onChange }: KvpSwitchTabProps) {
  const { theme } = useTheme();
  const translation = useTranslation();
  const tabs = translation.actionBar.actionButton;
  const selected = isArchiveOpen
    ? translation.actionBar.actionButton[1]
    : translation.actionBar.actionButton[0];

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl ${theme === "dark" ? "bg-gray-500/50" : "bg-gray-200/80"}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            onChange?.(tab === translation.actionBar.actionButton[0]);
          }}
          className={`px-3 md:px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
              ${
                selected === tab
                  ? `${theme === "dark" ? "text-text-primary bg-gray-500" : "text-gray-900 bg-white"} shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)]`
                  : `${theme === "dark" ? "text-gray-300 hover:text-text-primary" : "text-gray-600 hover:text-text-primary"}`
              }
            `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
