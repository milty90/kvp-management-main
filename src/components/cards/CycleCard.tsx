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
      className={`flex w-full items-center justify-between p-4 h-22 gap-12 rounded-xl border-${color}-300/60 border shadow-md ${colorClasses[color]}`}
    >
      <div className={`px-1 py-2 flex flex-col items-start gap-1`}>
        <p className={`text-3xl font-semibold text-${color}-900`}>{quantity}</p>
        <p className={`font-medium text-${color}-700`}>{label}</p>
      </div>
      <div
        className={`px-4 py-2 rounded-3xl ${roundColor[color]} flex flex-row items-end`}
      >
        <p className="text-2xl font-semibold">{letter}</p>
      </div>
    </div>
  );
}
