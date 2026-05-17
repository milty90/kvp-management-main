import ColorButton from "../buttons/ColorButton";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "../../utils/useTranslation";
import { useLanguage } from "../../context/LanguageContext";
import { showToast } from "./ToastItem";
import { useState } from "react";
import { useWindowWidth } from "../../utils/useWindowWidth";

interface SettingsModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function SettingsModal({ onConfirm, onCancel }: SettingsModalProps) {
  const { theme, toggleTheme } = useTheme();
  const translation = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const width = useWindowWidth();

  const handleNotificationToggle = () => {
    setNotificationsEnabled((prev) => !prev);
    showToast(
      width,
      theme,
      "info",
      translation.settingsModal.settingsNotification.toastMessage,
    );
  };
  return (
    <div className="fixed z-40 inset-0 flex items-center justify-center bg-gray-700/50">
      <div className="bg-surface px-6 pt-8 md:py-5 md:rounded-xl shadow-lg w-full h-full md:h-auto max-w-xl relative">
        <h2 className="text-xl text-text-secondary font-bold pl-1 mb-4">
          {translation.settingsModal.settings}
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
              <p className="text-sm text-text-primary mr-4">
                {translation.settingsModal.settingTheme.title}
              </p>
              <div className="flex items-center">
                <p className="text-xs lg:text-sm tracking-tight text-text-secondary mr-2">
                  {translation.settingsModal.settingTheme.current}
                </p>
                <select
                  value={theme}
                  onChange={toggleTheme}
                  className={`text-xs border text-text-primary border-gray-300 rounded-md px-1  focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} bg-surface`}
                >
                  <option value="light">
                    {translation.settingsModal.settingTheme.light}
                  </option>
                  <option value="dark">
                    {translation.settingsModal.settingTheme.dark}
                  </option>
                </select>
              </div>
            </div>
            <p className="text-xs text-text-secondary">
              {theme === "dark"
                ? translation.settingsModal.settingTheme.descriptionLight
                : translation.settingsModal.settingTheme.descriptionDark}
            </p>
          </div>
          <div
            className={`flex flex-col bg-card p-4 rounded-lg border ${theme === "dark" ? "border-border" : "border-gray-400/80"}`}
          >
            <div className="flex items-start justify-between w-full mb-1">
              <p className="text-sm text-text-primary mr-4">
                {translation.settingsModal.settingLanguage.title}
              </p>

              <div className="flex items-center">
                <p className="text-xs lg:text-sm text-text-secondary mr-2">
                  {translation.settingsModal.settingLanguage.current}
                </p>
                <select
                  value={language}
                  onChange={toggleLanguage}
                  className={`text-xs border text-text-primary border-gray-300 rounded-md px-1 tracking-tight focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} bg-surface`}
                >
                  <option value="de">Deutsch</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
            <p className="text-xs text-text-secondary">
              {translation.settingsModal.settingLanguage.description}
            </p>
          </div>

          <div
            className={`flex flex-col bg-card p-4 rounded-lg border ${theme === "dark" ? "border-border" : "border-gray-400/80"}`}
          >
            <div className="flex items-start justify-between w-full mb-1">
              <p className="text-sm text-text-primary mr-4">
                {translation.settingsModal.settingsNotification.title}
              </p>
              <div className="flex items-center">
                <p className="text-xs lg:text-sm tracking-tight text-text-secondary mr-3">
                  {translation.settingsModal.settingsNotification.current}
                </p>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer lg:mr-1">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      value="theme"
                      checked={notificationsEnabled}
                      onChange={() => {
                        handleNotificationToggle();
                      }}
                    />
                    <div className="group bg-surface rounded-full duration-300 w-8 h-4 ring-2 ring-gray-400 after:duration-300 after:bg-gray-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-2.5 after:w-2.5 after:top-0.75 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-3 peer-hover:after:scale-95"></div>
                  </label>
                </div>
              </div>
            </div>
            <p className="text-xs  text-text-secondary">
              {translation.settingsModal.settingsNotification.description}
            </p>
          </div>
        </div>

        <div className="mt-4 mb-1 flex justify-end gap-3 pr-4">
          <button
            onClick={onCancel}
            className="hover:bg-gray-200 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium text-text-secondary"
          >
            {translation.settingsModal.settingsButton.cancel}
          </button>
          <ColorButton onClick={onConfirm} color="blue" isTextOnly={true}>
            {translation.settingsModal.settingsButton.save}
          </ColorButton>
        </div>
      </div>
    </div>
  );
}
