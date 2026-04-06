import { useKvpContext } from "../../context/KvpContext";
import { toast } from "react-toastify";

import MenuItem from "../items/MenuItem";
import { useRef, useState } from "react";
import { useClickOutside } from "../../utils/clickOutside";
import { ConfirmDialogItem } from "../items/ConfirmDialogItem";
import { createPortal } from "react-dom";

interface KvpCardProps {
  id: number;
  title: string;
  category: string;
  colorPriority?: "green" | "orange" | "red" | "gray";
  assignedTo: string;
  description: string;
  state: "Plan" | "Do" | "Check" | "Act" | "Rejected" | "Archived";
  priority: "High" | "Medium" | "Low";
  createdBy: string;
  createdAt: string;
  targetDate: string;
  benefit?: string;
  onOpenModal?: () => void;
}

const priorityColors = {
  High: "border-red-400",
  Medium: "border-orange-400",
  Low: "border-green-400",
};

export default function KvpCard({
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
  const { setSelectedKvp, deleteKvp, archiveKvp, rejectKvp } = useKvpContext();

  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const menuWrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuWrapperRef, () => setShowMenu(false));

  // function customNotification({ closeToast }: ToastContentProps) {
  //   return (
  //     <div>
  //       <p className="text-sm min-w-80 text-gray-700 font-poppins mb-2">
  //         Möchten Sie dieses KVP wirklich löschen?
  //       </p>
  //       <button
  //         className="text-sm text-blue-500 font-poppins"
  //         onClick={() => closeToast("ignore")}
  //       >
  //         Nein, behalten!
  //       </button>
  //     </div>
  //   );
  // }

  const handleArchive = () => {
    archiveKvp(id);
    toast.info(`KVP ${title} wurde archiviert.`, {
      position: "top-center",
      className: "mt-6 text-sm font-poppins ",
    });
    setShowMenu(false);
  };

  const handleReject = () => {
    rejectKvp(id);
    toast.info(`KVP ${title} wurde abgelehnt.`, {
      position: "top-center",
      className: "mt-6 text-sm font-poppins ",
    });
    setShowMenu(false);
  };

  const handleDelete = () => {
    setShowDialog(true);
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

    if (onOpenModal) {
      onOpenModal();
    }
  };
  return (
    <div
      className={`bg-white  p-4 text-left rounded-lg shadow-md hover:translate-y-1 hover:shadow-lg transition-transform duration-100 ease-in cursor-pointer ${state === "Archived" || state === "Rejected" ? "opacity-80" : ""}`}
    >
      <div
        ref={menuWrapperRef}
        className="relative flex items-start justify-between mb-2 gap-1.5"
      >
        <p className="text-sm lg:text-lg font-semibold ">{title}</p>

        <img
          onClick={() => setShowMenu(!showMenu)}
          src="/more.svg"
          alt="More"
          className="h-6 w-6 rounded-full object-cover -mr-2 hover:bg-gray-200 hover:scale-110 cursor-pointer"
        />

        <div
          className={`absolute ${showMenu ? "block" : "hidden"} right-8.5 -mt-1.5 `}
        >
          <MenuItem
            onEdit={handleEditClick}
            onArchive={handleArchive}
            onReject={handleReject}
            onDelete={handleDelete}
          />
        </div>
      </div>
      <p className="text-gray-500 text-sm lg:text-md text-pretty break-all mb-3">
        {category}
      </p>
      <div className="flex items-center mb-2.5 gap-2.5 text-gray-500 ">
        <span className="text-xs lg:text-sm ">Priorität:</span>
        <span
          className={`px-2.5 py-0.5 text-xs text-gray-600 font-medium rounded-full border-2 shadow ${priorityColors[priority]}`}
        >
          {priority}
        </span>
      </div>
      <div className="flex items-center mb-2.5 text-gray-500">
        <span className="text-sm ">Status:</span>
        <span
          className={`px-2.5 py-0.5 text-sm text-gray-600 ${state === "Archived" ? "text-slate-900" : state === "Rejected" ? "text-red-700" : ""} font-medium `}
        >
          {state === "Archived"
            ? "Archiviert"
            : state === "Rejected"
              ? "Abgelehnt"
              : state}
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
      <p className="text-gray-500 text-pretty text-xs mb-2">
        Beschreibung : {description}
      </p>
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
      {showDialog &&
        createPortal(
          <ConfirmDialogItem
            title="KVP löschen"
            message={`Möchten Sie das KVP "${title}" wirklich löschen?`}
            onConfirm={() => {
              deleteKvp(id);
              toast.success(`KVP ${title} wurde gelöscht.`, {
                position: "top-center",
                className: "mt-6 text-sm font-poppins",
              });
              setShowDialog(false);
            }}
            onCancel={() => setShowDialog(false)}
          />,
          document.body,
        )}
    </div>
  );
}
