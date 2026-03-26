import { useNavigate } from "react-router-dom";
import { useState, type ReactNode } from "react";
import ColorButton from "../buttons/ColorButton";
import type { ColorButtonType } from "../../types";
import { toast } from "react-toastify";
import { SettingItem } from "../items/SettingItem";

interface TopBarProps {
  kvpBar?: ReactNode;
  kvpButtonColor?: ColorButtonType;
  statButtonColor?: ColorButtonType;
}

function TopBar({
  kvpBar,
  kvpButtonColor = "blue",
  statButtonColor = "gray",
}: TopBarProps) {
  const navigate = useNavigate();

  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsClick = () => {
    toast.info("Einstellungen sind derzeit nicht verfügbar.", {
      position: "top-center",
      className: "mt-6 text-sm font-poppins ",
    });
  };

  return (
    <div className="flex flex-col w-full shadow-md rounded-2xl">
      <div className="w-full p-3 rounded-t-2xl bg-white text-white flex items-center justify-between">
        <div className="flex items-center justify-center">
          <img src="/spark.png" alt="Logo" className=" h-12 -ml-1 mt-3 mb-0" />
          <p className="text-gray-700 font-light font-poppins tracking-tight -mb-6 text-sm">
            KVP Management System
          </p>
        </div>
        <div
          className={`${!showSettings ? "" : "mr-14"} flex items-start space-x-3 mr-3 -mb-2.5`}
        >
          <ColorButton
            color={kvpButtonColor}
            icon={
              kvpButtonColor === "white"
                ? "/trending-gray.svg"
                : "/trending.svg"
            }
            onClick={() => navigate("/")}
          >
            Verbesserungen
          </ColorButton>
          <ColorButton
            color={statButtonColor}
            icon="/graph.svg"
            onClick={() => navigate("/stats")}
          >
            Statistik
          </ColorButton>
          <img
            src="/settings.svg"
            alt="Settings"
            onClick={() => setShowSettings(true)}
            className={`${!showSettings ? "" : "hidden"} w-8 mt-0.5 -mr-0.4 rounded-full object-cover hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-transform duration-300 ease-in hover:rotate-30 cursor-pointer`}
          />
          <div
            className={`absolute top-18.5 right-42.5  ${showSettings ? "" : "hidden"}`}
          >
            {showSettings && (
              <SettingItem
                onSetting={handleSettingsClick}
                onProfile={() =>
                  toast.info("Profilfunktion ist derzeit nicht verfügbar.", {
                    position: "top-center",
                    className: "mt-6 text-sm font-poppins ",
                  })
                }
                onLogout={() =>
                  toast.info("Abmeldefunktion ist derzeit nicht verfügbar.", {
                    position: "top-center",
                    className: "mt-6 text-sm font-poppins ",
                  })
                }
                onClose={() => setShowSettings(false)}
              />
            )}
          </div>
        </div>
      </div>
      {kvpBar}
    </div>
  );
}

export default TopBar;
