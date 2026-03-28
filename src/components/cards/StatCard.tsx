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
      className="flex items-center gap-1.5 p-2 bg-white rounded-xl shadow-md border border-gray-200 h-14
     w-full"
    >
      <div className="flex items-center w-full justify-start mr-2">
        <span className="px-1.5 lg:px-3 w-full py-1 text-sm text-gray-600 font-medium bg-gray-200/50 rounded-md">
          {status}
        </span>
      </div>
      <div className="flex w-full items-center  justify-between">
        <div className="flex items-center gap-1">
          <p className="text-xl font-semibold  text-gray-500">{quantity}</p>
        </div>

        <div
          className={`items-center hidden md:inline justify-center  shadow-gray-400 shadow-sm rounded-md ${iconColors[iconColor]}`}
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
