import { useNavigate } from "react-router-dom";
import { useRef, useState, type ReactNode } from "react";
import ColorButton from "../buttons/ColorButton";
import type { ColorButtonType } from "../../types";
import { toast } from "react-toastify";
import { SettingItem } from "../items/SettingItem";
import { useClickOutside } from "../../utils/clickOutside";
import { signOut } from "../../utils/authDatabase";

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

  const settingsWrapperRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(settingsWrapperRef, () => setShowSettings(false));

  const handleSettingsClick = () => {
    toast.info("Einstellungen sind derzeit nicht verfügbar.", {
      position: "top-center",
      className: "mt-6 text-sm font-poppins ",
    });
    setShowSettings(false);
  };

  const handleProfileClick = () => {
    toast.info("Profilfunktion ist derzeit nicht verfügbar.", {
      position: "top-center",
      className: "mt-6 text-sm font-poppins ",
    });
    setShowSettings(false);
  };

  const handleLogoutClick = () => {
    signOut();
    navigate("/login");

    setShowSettings(false);
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
          ref={settingsWrapperRef}
          className={`relative flex items-start space-x-3 mr-3 -mb-2.5`}
        >
          <ColorButton
            color={kvpButtonColor}
            icon={
              kvpButtonColor === "white"
                ? "/trending-gray.svg"
                : "/trending.svg"
            }
            onClick={() => navigate("/kvps")}
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
            onClick={() => setShowSettings(!showSettings)}
            className={`w-8 mt-0.5 -mr-0.5 rounded-full object-cover hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-transform duration-300 ease-in hover:rotate-30 cursor-pointer`}
          />
          <div className={`absolute right-13 -mt-2 `}>
            {showSettings && (
              <SettingItem
                onSetting={handleSettingsClick}
                onProfile={handleProfileClick}
                onLogout={handleLogoutClick}
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
