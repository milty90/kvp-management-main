import { fetchUser } from "../../utils/authDatabase";
import ColorButton from "../buttons/ColorButton";

import { useEffect, useState } from "react";
import { showToast } from "./ToastItem";
import { useTheme } from "../../context/ThemeContext";
import { useWindowWidth } from "../../utils/useWindowWidth";

interface ProfileModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ProfileModal({ onConfirm, onCancel }: ProfileModalProps) {
  const [username, setUsername] = useState("... Lade Benutzerdaten");
  const [email, setEmail] = useState("... Lade Benutzerdaten");
  const { theme } = useTheme();
  const width = useWindowWidth();

  useEffect(() => {
    fetchUser(setUsername, setEmail);
  }, []);

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-700/50">
      <div className="bg-surface px-6 pt-8 md:py-5 md:rounded-xl shadow-lg w-full h-full md:h-auto max-w-xl relative">
        <h2 className="text-xl font-bold pl-1 mb-4">Profil</h2>
        <button
          type="button"
          className="absolute top-4 right-7 text-3xl text-gray-500 hover:text-text-primary"
          onClick={onCancel}
        >
          &times;
        </button>

        <div className="border-t border-border my-4"></div>

        <div className="flex flex-col items-start justify-start mb-2 p-5 rounded-lg border border-gray-500">
          <div className="flex flex-row w-full justify-between items-center px-3">
            <img
              src="/face-id.png"
              alt="Profilbild"
              className="w-24 h-24 rounded-md object-cover pl-1"
            />
            <ColorButton
              color="gray"
              isTextOnly={true}
              onClick={() =>
                showToast(
                  width,
                  theme,
                  "info",
                  "Profilbild ändern ist derzeit nicht verfügbar.",
                )
              }
            >
              Profil ändern
            </ColorButton>
          </div>
          <div className="flex flex-col items-start justify-start mt-3 px-4 gap-1">
            <p className=" text-text-primary text-xl font-semibold">
              Benutzername: {username}
            </p>
            <p className="text-sm text-gray-500">Weitere Informationen</p>
          </div>
        </div>
        <div className="flex items-center justify-around p-5 h-30 mb-2 rounded-lg border border-dashed border-gray-300">
          <div className="text-sm text-gray-500">
            <p className="text-2xl">12</p>
            <p>Aktiv</p>
          </div>
          <div className="text-sm text-gray-500">
            <p className="text-2xl">12</p>
            <p>Zugewiesen</p>
          </div>
          <div className="text-sm text-gray-500">
            <p className="text-2xl">12</p>
            <p>Done</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center px-8 py-6 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-md text-gray-500 my-1.5">E-Mail: {email}</p>
          <div className="border-t border-0 border-border w-full mb-2 px-2"></div>
          <p className="text-md text-gray-500 my-1.5">Abteilung: </p>
          <div className="border-t border-0 border-border w-full mb-2 px-2"></div>
          <p className="text-md text-gray-500 my-1.5">Rolle: </p>
          <div className="border-t border-0 border-border w-full mb-2 px-2"></div>
          <p className="text-md text-gray-500 my-1.5">Weitere Informationen</p>
        </div>
        <div className="flex flex-col items-start justify-center px-8 py-6 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-md text-gray-500 my-1.5">Weitere Informationen</p>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-md text-sm font-medium ${theme === "dark" ? " text-text-secondary hover:text-text-primary hover:bg-gray-700/80" : "text-text-secondary hover:text-text-primary hover:bg-gray-300/80"} transition-colors duration-150`}
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
