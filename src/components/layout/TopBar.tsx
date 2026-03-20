import { useNavigate } from "react-router-dom";
import { type ReactNode } from "react";
import ColorButton from "../buttons/ColorButton";
import type { ColorButtonType } from "../../types";
import { toast } from "react-toastify";

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

  return (
    <div className="flex flex-col w-full shadow-md rounded-2xl">
      <div className="w-full p-3 rounded-t-2xl bg-white text-white flex items-center justify-between">
        <div className="flex items-center justify-center">
          <img src="/spark.png" alt="Logo" className=" h-12 -ml-1 mt-3 mb-0" />
          <p className="text-gray-700 font-light font-poppins tracking-tight -mb-6 text-sm">
            KVP Management System
          </p>
        </div>
        <div className="flex items-start space-x-4 mr-3 -mb-3">
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
            onClick={() => {
              toast.info("Einstellungsfunktion ist derzeit nicht verfügbar.", {
                position: "top-center",
                className: "mt-6 text-gray-500 text-sm font-poppins ",
              });
            }}
            className="w-8.5 mt-0.5 -mr-0.5 rounded-full object-cover hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-transform duration-300 ease-in hover:rotate-30 cursor-pointer"
          />
        </div>
      </div>
      {kvpBar}
    </div>
  );
}

export default TopBar;
