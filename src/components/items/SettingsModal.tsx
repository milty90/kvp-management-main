import ColorButton from "../buttons/ColorButton";
import { useTheme } from "../../context/ThemeContext";
interface SettingsModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function SettingsModal({ onConfirm, onCancel }: SettingsModalProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="fixed z-40 inset-0 flex items-center justify-center bg-gray-700/50">
      <div className="bg-surface px-6 pt-8 md:py-5 md:rounded-xl shadow-lg w-full h-full md:h-auto max-w-xl relative">
        <h2 className="text-xl text-text-secondary font-bold pl-1 mb-4">
          Einstellungen
        </h2>
        <button
          type="button"
          className="absolute top-4 right-6 text-3xl bg-ground-600/80 text-secondary hover:text-text-primary"
          onClick={onCancel}
        >
          &times;
        </button>
        <div className="border-t border-border my-4"></div>
        <div className="flex items-center justify-between pl-8 h-15 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-sm text-text-primary mr-4">App Theme</p>
          <div className="flex items-center">
            <p className="text-sm text-text-secondary mr-4">
              {theme === "dark" ? "Hell" : "Dunkel"}
            </p>
            <label className="relative inline-flex items-center cursor-pointer mr-7">
              <input
                type="checkbox"
                className="sr-only peer"
                value="theme"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <div className="group bg-surface rounded-full duration-300 w-10 h-5 ring-2 ring-blue-500 after:duration-300 after:bg-blue-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-3 after:w-3 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-4.5 peer-hover:after:scale-95"></div>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-start pl-8 h-30 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-sm text-text-secondary">Weitere Einstellungen</p>
        </div>
        <div className="flex items-center justify-start pl-8 h-30 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-sm text-text-secondary">Weitere Einstellungen</p>
        </div>
        <div className="flex items-center justify-start pl-8 h-30 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-sm text-text-secondary">Weitere Einstellungen</p>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="hover:bg-gray-200 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium text-text-secondary"
          >
            Abbrechen
          </button>
          <ColorButton onClick={onConfirm} color="blue" isTextOnly={true}>
            Speichern
          </ColorButton>
        </div>
      </div>
    </div>
  );
}
