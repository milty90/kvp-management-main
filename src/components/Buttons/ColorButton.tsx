import type { ColorButtonType } from "../../types";

type ColorButtonProps = {
  color?: ColorButtonType;
  height?: string;
  icon?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const colorClasses = {
  blue: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  green: "bg-green-500 hover:bg-green-600 active:bg-green-700",
  red: "bg-red-500 hover:bg-red-600 active:bg-red-700",
  gray: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700",
  violet: "bg-violet-500 hover:bg-violet-600 active:bg-violet-700",
  white:
    "bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_3px_8px_rgba(0,0,0,0.08)]",
};

export default function ColorButton({
  color = "blue",
  height = "2",
  onClick,
  icon,
  children,
  type = "button",
}: ColorButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
          inline-flex items-center gap-2 px-4 py-${height} rounded-lg
          ${colorClasses[color]}
          ${color === "white" ? "text-gray-700" : "text-white"} text-sm font-medium
          shadow-[0_1px_2px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.12)]
          hover:shadow-[0_2px_4px_rgba(0,0,0,0.25),0_4px_12px_rgba(0,0,0,0.15)]
          active:scale-[0.98] active:bg-${color}-700
          transition-all duration-150
        `}
    >
      {icon ? (
        <img src={icon ? icon : "/done.svg"} alt="Icon" className="h-4 w-4 " />
      ) : null}
      {children}
    </button>
  );
}
