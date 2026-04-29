import ColorButton from "../buttons/ColorButton";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
interface SettingsModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function SettingsModal({ onConfirm, onCancel }: SettingsModalProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
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
        <div className="flex flex-col px-2 py-4 gap-4 ">
          <div
            className={`flex flex-col bg-card p-4 rounded-lg border ${theme === "dark" ? "border-border" : "border-gray-400/80"}`}
          >
            <div className="flex items-start justify-between w-full mb-1">
              <p className="text-sm text-text-primary mr-4">Dunkelmodus</p>
              <div className="flex items-center">
                <p className="text-xs lg:text-sm  text-text-secondary mr-4">
                  Aktuell: {theme === "dark" ? "Dunkel" : "Hell"}
                </p>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer lg:mr-1">
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
            </div>
            <p className="text-xs lg:text-sm text-text-secondary">
              Wechseln Sie zum {theme === "dark" ? "Hellmodus" : "Dunkelmodus"}
            </p>
          </div>
          <div
            className={`flex flex-col bg-card p-4 rounded-lg border ${theme === "dark" ? "border-border" : "border-gray-400/80"}`}
          >
            <div className="flex items-start justify-between w-full mb-1">
              <p className="text-sm text-text-primary mr-4">Sprache wechseln</p>
              <div className="flex items-center">
                <p className="text-xs lg:text-sm text-text-secondary mr-4">
                  Aktuell: Deutsch
                </p>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer lg:mr-1">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      value="language"
                      checked={language === "en"}
                      onChange={toggleLanguage}
                    />
                    <div className="group bg-surface rounded-full duration-300 w-10 h-5 ring-2 ring-blue-500 after:duration-300 after:bg-blue-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-3 after:w-3 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-4.5 peer-hover:after:scale-95"></div>
                  </label>
                </div>
              </div>
            </div>
            <p className="text-xs lg:text-sm text-text-secondary">
              Wechseln Sie zu {language === "de" ? "English" : "Deutsch"}
            </p>
          </div>

          <div
            className={`flex flex-col bg-card p-4 rounded-lg border ${theme === "dark" ? "border-border" : "border-gray-400/80"}`}
          >
            <div className="flex items-start justify-between w-full mb-1">
              <p className="text-sm text-text-primary mr-4">Benachrichtigung</p>
              <div className="flex items-center">
                <p className="text-xs lg:text-sm  text-text-secondary mr-4">
                  Aktuell: An
                </p>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer lg:mr-1">
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
            </div>
            <p className="text-xs lg:text-sm text-text-secondary">
              Schalten Sie die Benachrichtigungen aus
            </p>
          </div>
        </div>

        <div className="mt-4 mb-1 flex justify-end gap-3 pr-4">
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
