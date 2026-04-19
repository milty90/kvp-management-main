import { useTheme } from "../../context/ThemeContext";

type CycleCardProps = {
  color: "yellow" | "blue" | "violet" | "green";
  label?: string;
  letter?: string;
  quantity?: number;
};

const colorClassesLight = {
  yellow: "bg-yellow-100/70 border-yellow-300/60 text-yellow-700",
  blue: "bg-blue-100/70 border-blue-300/50 text-blue-700",
  violet: "bg-violet-100/70 border-violet-300/50 text-violet-700",
  green: "bg-green-100/70 border-green-300/50 text-green-700",
};

const colorClassesDark = {
  yellow: "bg-yellow-200/90 border-yellow-600/70 text-yellow-950",
  blue: "bg-blue-200/90 border-blue-600/70 text-blue-950",
  violet: "bg-violet-200/90 border-violet-600/70 text-violet-950",
  green: "bg-green-200/90 border-green-600/70 text-green-950",
};

const roundColorLight = {
  yellow: "bg-yellow-300/60 text-yellow-900",
  blue: "bg-blue-300/50 text-blue-900",
  violet: "bg-violet-300/50 text-violet-900",
  green: "bg-green-300/50 text-green-900",
};

const roundColorDark = {
  yellow: "bg-yellow-600/60 text-yellow-50",
  blue: "bg-blue-500/80 text-blue-50",
  violet: "bg-violet-500/80 text-violet-50",
  green: "bg-green-600/60 text-green-50",
};

export default function CycleCard({
  color,
  label,
  letter,
  quantity,
}: CycleCardProps) {
  const { theme } = useTheme();
  const colorClasses = theme === "dark" ? colorClassesDark : colorClassesLight;
  const roundColor = theme === "dark" ? roundColorDark : roundColorLight;
  return (
    <div
      className={`flex min-w-20 w-full items-center justify-around md:justify-between h-12 md:px-3  md:h-14 lg:gap-12 rounded-xl border-${color}-300/60 border shadow-md ${colorClasses[color]}`}
    >
      <div className={`px-1 py-1 flex items-start gap-3`}>
        <p className={`text-xl md:text-3xl font-semibold text-${color}`}>
          {quantity}
        </p>
        <p className={`hidden md:inline font-medium mt-2 text-${color}`}>
          {label}
        </p>
      </div>
      <div
        className={`hidden md:inline px-3 py-1 rounded-3xl ${roundColor[color]} flex flex-row items-end `}
      >
        <p className="text-xl font-semibold">{letter}</p>
      </div>
    </div>
  );
}
