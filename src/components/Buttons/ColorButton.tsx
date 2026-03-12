type ColorButtonProps = {
  color?: "pink" | "blue" | "green" | "red" | "gray";
  height?: string;
  icon?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const colorClasses = {
  pink: "bg-pink-500 hover:bg-pink-600 active:bg-pink-700",
  blue: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  green: "bg-green-500 hover:bg-green-600 active:bg-green-700",
  red: "bg-red-500 hover:bg-red-600 active:bg-red-700",
  gray: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700",
};

export default function ColorButton({
  color = "blue",
  height = "2",
  onClick,
  icon,
  children,
}: ColorButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
          inline-flex items-center gap-2 px-4 py-${height} rounded-lg
          ${colorClasses[color]}
          text-white text-sm font-medium
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
