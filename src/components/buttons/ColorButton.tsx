import type { ColorButtonType } from "../../types";

type ColorButtonProps = {
  color?: ColorButtonType;
  isTextOnly?: boolean;
  height?: string;
  width?: string;
  icon?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const colorClasses = {
  color: "bg-color text-white hover:bg-color-hover active:bg-color-active",
  blue: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  green: "bg-green-700/90 hover:bg-green-600 active:bg-green-500",
  red: "bg-red-500 hover:bg-red-600 active:bg-red-700",
  gray: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700",
  yellow: "bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800",
  white:
    "bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300",
};

export default function ColorButton({
  color = "blue",
  height = "2",
  isTextOnly = false,
  width = "auto",
  onClick,
  icon,
  children,
  type = "button",
  disabled = false,
}: ColorButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
          inline-flex w-${width} items-center gap-2 px-4 py-${height} h-9 rounded-lg text-nowrap
          bg-button text-primary hover:bg-button-hover active:bg-button-active
          ${colorClasses[color]}
          ${color === "white" ? "text-gray-700" : "text-white"} text-sm font-medium
          shadow-[0_1px_1px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1)]
          hover:shadow-[0_2px_2px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1)]
          active:scale-[0.98]
          transition-all duration-150 
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        `}
    >
      {icon && <img src={icon} alt="Icon" className="h-4 w-4" />}
      <span className={`${!isTextOnly ? "hidden md:inline" : ""}`}>
        {children}
      </span>
    </button>
  );
}
