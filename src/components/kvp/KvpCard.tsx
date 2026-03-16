import ColorButton from "../buttons/ColorButton";

type KvpCardProps = {
  title: string;
  category: string;
  colorPriority?: "green" | "orange" | "red" | "gray";
  assignedTo: string;
  description: string;
  state: "Plan" | "Do" | "Check" | "Act";
  priority: "High" | "Medium" | "Low";
  createdBy: string;
  createdAt: string;
  targetDate: string;
};

const priorityColors = {
  High: "border-red-400",
  Medium: "border-orange-400",
  Low: "border-green-400",
};

function KvpCard({
  title,
  category,
  assignedTo,
  description,
  state,
  priority,
  createdBy,
  createdAt,
  targetDate,
}: KvpCardProps) {
  return (
    <div className="bg-white p-4 text-left rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold ">{title}</h2>
        <img
          src="/more.svg"
          alt="More"
          className="h-6 w-6 rounded-full object-cover"
        />
      </div>

      <p className="text-gray-500 text-md mb-3">{category}</p>

      <div className="flex items-center mb-4 gap-2.5 text-gray-500 ">
        <span className="text-sm ">Priorität:</span>
        <span
          className={`px-2.5 py-0.5 text-xs text-gray-600 font-medium rounded-full border-2 shadow ${priorityColors[priority]}`}
        >
          {priority}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-3" />

      <p className="font-normal text-sm mb-3">Zugewiesen: {assignedTo}</p>

      <p className="text-gray-500 text-xs mb-4">{description}</p>

      <div className="flex items-center justify-between gap-2 mb-4">
        <ColorButton color="green" height="1" icon="">
          Details
        </ColorButton>
        <div className="flex items-center gap-1 text-gray-500">
          <span className="text-sm ">Status:</span>
          <span className={`px-2.5 py-0.5 text-sm text-gray-600 font-medium `}>
            {state}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-3" />

      <div className="flex flex-col items-start justify-between mt-2">
        <span className="text-xs py-0.5 text-gray-500">
          <img
            src="/user.svg"
            alt="User"
            className="h-4 w-4 rounded-full object-cover inline-block mr-1.5 mb-1"
          />
          {createdBy}
        </span>
        <span className="text-xs py-0.5 text-gray-500">
          <img
            src="/target.svg"
            alt="Target"
            className="h-4 w-4 rounded-full object-cover inline-block mr-1.5 mb-1"
          />
          Zieldatum: {targetDate}
        </span>
        <span className="text-xs py-0.5 text-gray-500">
          <img
            src="/calender.svg"
            alt="Calender"
            className="h-4 w-4 rounded-full object-cover inline-block mr-1.5 mb-1"
          />
          Erstellt: {createdAt}
        </span>
      </div>
    </div>
  );
}
export default KvpCard;
