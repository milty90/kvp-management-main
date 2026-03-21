import { toast } from "react-toastify";
import WhiteButton from "../buttons/WhiteButton";
import { useKvpContext } from "../../context/KvpContext";

interface KvpCardProps {
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
  onOpenModal: () => void;
}

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
  onOpenModal,
}: KvpCardProps) {
  const kvpContent = useKvpContext();
  return (
    <div className="bg-white p-4 text-left rounded-lg shadow-lg">
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-sm lg:text-lg font-semibold text-pretty break-all">
          {title}
        </h2>
        <img
          onClick={onOpenModal}
          src="/more.svg"
          alt="More"
          className="h-6 w-6 rounded-full object-cover"
        />
      </div>

      <p className="text-gray-500 text-sm lg:text-md text-pretty break-all mb-3">
        {category}
      </p>

      <div className="flex items-center mb-4 gap-2.5 text-gray-500 ">
        <span className="text-xs lg:text-sm ">Priorität:</span>
        <span
          className={`px-2.5 py-0.5 text-xs text-gray-600 font-medium rounded-full border-2 shadow ${priorityColors[priority]}`}
        >
          {priority}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-3" />

      <p className="font-normal text-wrap break-all text-sm mb-3">
        Zugewiesen: {assignedTo}
      </p>

      <p className="text-gray-500 text-wrap break-all text-xs mb-4">
        {description}
      </p>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-4">
        <WhiteButton
          icon=""
          onClick={() =>
            toast.info("Details anzeigen ist derzeit nicht verfügbar.", {
              position: "top-center",
              className: "mt-6 text-gray-500 text-sm font-poppins ",
            })
          }
        >
          Details
        </WhiteButton>

        <div className="flex items-center gap-1 md:ml-1 text-gray-500">
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
            className="h-4 w-4 hidden md:inline rounded-full mr-1.5 mb-1"
          />
          {createdBy}
        </span>
        <span className="text-xs py-0.5 text-gray-500">
          <img
            src="/calender.svg"
            alt="Calender"
            className="h-4 w-4 hidden md:inline rounded-full mr-1.5 mb-1"
          />
          Erstellt: {createdAt.slice(2, 10)}
        </span>
        <span className="text-xs py-0.5 text-gray-500">
          <img
            src="/target.svg"
            alt="Target"
            className="h-4 w-4 hidden md:inline rounded-full mr-1.5 mb-1"
          />
          Zieldatum: {targetDate.slice(2, 10)}
        </span>
      </div>
    </div>
  );
}
export default KvpCard;
