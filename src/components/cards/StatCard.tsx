interface StatCardProps {
  status: string;
  quantity: string;
  path?: string;
  iconColor?: "blue" | "green" | "red" | "gray" | "violet";
}

const iconColors = {
  blue: "bg-blue-400",
  green: "bg-green-400",
  red: "bg-red-400",
  gray: "bg-gray-400",
  violet: "bg-violet-400",
};

export default function StatCard({
  status,
  quantity,
  path,
  iconColor = "gray",
}: StatCardProps) {
  return (
    <div
      className="flex flex-col items-start gap-1.5 p-3 bg-white rounded-xl shadow-md border border-gray-200 h-20
     w-full"
    >
      <div className="flex items-center ">
        <span className="px-3 py-1 text-xs text-gray-600 font-medium bg-gray-200/50 rounded-md">
          {status}
        </span>
      </div>
      <div className="flex w-full items-center mt-1 justify-between">
        <div className="flex items-center gap-1">
          <span className="text-md px-1 font-semibold text-gray-500">
            Anzahl:
          </span>
          <p className="text-xl font-semibold -mt-1 text-gray-500">
            {quantity}
          </p>
        </div>

        <div
          className={`flex items-center justify-center -mt-6   shadow-gray-400 shadow-sm rounded-md ${iconColors[iconColor]}`}
        >
          <img
            src={path || "/"}
            alt="Status Logo"
            className="w-10 h-10 object-cover p-2"
          />
        </div>
      </div>
    </div>
  );
}
