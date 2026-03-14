interface StatusCardProps {
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

export default function StatusCard({
  status,
  quantity,
  path,
  iconColor = "gray",
}: StatusCardProps) {
  return (
    <div className="flex flex-col items-start gap-1.5 p-3 bg-white rounded-lg shadow-md h-22 w-full">
      <div className="flex items-center ">
        <span className="px-3 py-1 text-xs text-gray-600 font-medium bg-gray-200/50 rounded-md">
          {status}
        </span>
      </div>
      <div className="flex w-full items-center mt-1.5 justify-between">
        <div className="flex items-center gap-1">
          <span className="text-md px-1.5  font-semibold text-gray-500">
            Anzahl:
          </span>
          <p className="text-2xl font-semibold -mt-0.5 text-gray-500">
            {quantity}
          </p>
        </div>

        <div
          className={`flex items-center justify-center -mt-4   shadow-gray-400 shadow-sm rounded-md ${iconColors[iconColor]}`}
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
