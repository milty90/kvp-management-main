type CycleCardProps = {
  color: "yellow" | "blue" | "violet" | "green";
  label?: string;
  letter?: string;
  quantity?: number;
};

const colorClasses = {
  yellow: "bg-yellow-100/70 border-yellow-300/60 text-yellow-700",
  blue: "bg-blue-100/70 border-blue-300/50 text-blue-700",
  violet: "bg-violet-100/70 border-violet-300/50 text-violet-700",
  green: "bg-green-100/70 border-green-300/50 text-green-700",
};

const roundColor = {
  yellow: "bg-yellow-300/60 text-yellow-900",
  blue: "bg-blue-300/50 text-blue-900",
  violet: "bg-violet-300/50 text-violet-900",
  green: "bg-green-300/50 text-green-900",
};

export default function CycleCard({
  color,
  label,
  letter,
  quantity,
}: CycleCardProps) {
  return (
    <div
      className={`flex min-w-20  w-full items-center justify-around md:justify-between h-12 md:px-3  md:h-14 lg:gap-12 rounded-xl border-${color}-300/60 border shadow-md ${colorClasses[color]}`}
    >
      <div className={`px-1 py-1 flex items-start gap-3`}>
        <p className={`text-xl md:text-3xl font-semibold text-${color}-900`}>
          {quantity}
        </p>
        <p className={`hidden md:inline font-medium mt-2 text-${color}-700`}>
          {label}
        </p>
      </div>
      <div
        className={`px-3 py-1 rounded-3xl ${roundColor[color]} flex flex-row items-end `}
      >
        <p className="text-xl font-semibold">{letter}</p>
      </div>
    </div>
  );
}
