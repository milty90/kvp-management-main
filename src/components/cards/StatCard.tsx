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
    <div className="flex flex-col items-start gap-2 p-4 bg-white rounded-lg shadow-md h-28 w-full">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">Status:</span>
        <span className="px-2 py-0.5 text-xs text-gray-600 font-medium bg-gray-200 rounded-md">
          {status}
        </span>
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <p className="text-3xl font-semibold ml-2 mt-2 text-gray-500">
          {quantity}
        </p>
        <div
          className={`flex items-center justify-center mr-2 shadow-gray-400  shadow-md rounded-md ${iconColors[iconColor]}`}
        >
          <img
            src={path || "/"}
            alt="Status Logo"
            className="w-12 object-cover p-2.5"
          />
        </div>
      </div>
    </div>
  );
}
