import { sliceText } from "../../utils/sliceText";
import { useWindowWidth } from "../../utils/useWindowWidth";
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
  const width = useWindowWidth();
  const maxLength = width <= 769 ? 10 : width < 950 ? 10 : 20;
  const label = sliceText(status, maxLength);

  return (
    <div
      className="flex items-center gap-1.5 p-2 bg-white rounded-xl shadow-md border border-gray-200 h-14
     w-full"
    >
      <div className="flex w-full items-center justify-start mr-2">
        <p className="px-1.5 overflow-auto whitespace-nowrap lg:px-3  py-1 text-sm text-gray-600 font-medium bg-gray-200/50 rounded-md">
          {label}
        </p>
      </div>
      <div className="flex w-full items-center justify-end gap-1">
        <div className="flex items-center gap-1">
          <p className="text-xl font-semibold mr-2  text-gray-500">
            {quantity}
          </p>
        </div>

        <div
          className={`items-center ${width < 900 ? "hidden" : "md:inline"} justify-center  shadow-gray-400 shadow-sm rounded-md ${iconColors[iconColor]}`}
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
