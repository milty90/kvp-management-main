import WhiteButton from "../buttons/WhiteButton";
import { useKvpContext } from "../../context/KvpContext";
import { toast } from "react-toastify";
import MenuItem from "../items/MenuItem";
import { useState } from "react";

interface KvpCardProps {
  id: number;
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
  benefit?: string;
  onOpenModal: () => void;
  onOpenMenu: () => void;
}

const priorityColors = {
  High: "border-red-400",
  Medium: "border-orange-400",
  Low: "border-green-400",
};

function KvpCard({
  id,
  title,
  category,
  assignedTo,
  description,
  state,
  priority,
  createdBy,
  createdAt,
  targetDate,
  benefit,
  onOpenModal,
}: KvpCardProps) {
  const { setSelectedKvp, deleteKvp } = useKvpContext();

  const [showMenu, setShowMenu] = useState(false);

  const handleArchive = () => {
    toast.success(`KVP archiviert: ${title}`, {
      position: "top-center",
      className: "mt-6 text-sm font-poppins ",
    });
    setShowMenu(false);
  };

  const handleReject = () => {
    toast.info(`KVP abgelehnt: ${title}`, {
      position: "top-center",
      className: "mt-6 text-sm font-poppins ",
    });
    setShowMenu(false);
  };

  const handleDelete = () => {
    toast.warning(`KVP gelöscht: ${title}`, {
      position: "top-center",
      className: "mt-6 text-sm font-poppins ",
    });
    deleteKvp(id);
    setShowMenu(false);
  };

  const handleEditClick = () => {
    setSelectedKvp({
      id,
      title,
      category,
      assignedTo,
      description,
      state,
      priority,
      createdBy,
      createdAt,
      targetDate,
      benefit,
    });

    onOpenModal();
  };

  return (
    <div className="bg-white p-4 text-left rounded-lg shadow-lg">
      <div className="relative flex items-start justify-between mb-2 gap-1.5">
        <p className="text-sm lg:text-lg font-semibold ">{title}</p>

        <img
          onClick={() => setShowMenu(true)}
          src="/more.svg"
          alt="More"
          className="h-6 w-6 rounded-full object-cover -mr-2 hover:bg-gray-200 hover:scale-110 cursor-pointer"
        />
        <div className={`absolute top-2 right-2  ${showMenu ? "" : "hidden"}`}>
          {showMenu && (
            <MenuItem
              onArchive={handleArchive}
              onReject={handleReject}
              onDelete={handleDelete}
              onClose={() => setShowMenu(false)}
            />
          )}
        </div>
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
        Zugewiesen an: {assignedTo}
      </p>
      <p className="font-normal truncate text-sm mb-3">
        Benefits: {benefit ? benefit : "Keine Benefits angegeben"}
      </p>

      <p className="text-gray-500 text-pretty text-xs mb-4">
        Beschreibung : {description}
      </p>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-4">
        <WhiteButton icon="" height="0.5" onClick={handleEditClick}>
          Edit
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
