import { useKvpContext } from "../../context/KvpContext";
import CardMenuItem from "../items/CardMenuItem";
import { useRef, useState } from "react";
import { useClickOutside } from "../../utils/clickOutside";
import { ConfirmDialogItem } from "../items/ConfirmDialogItem";
import { createPortal } from "react-dom";
import { useTheme } from "../../context/ThemeContext";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { showToast } from "../items/ToastItem";
import { sliceText } from "../../utils/sliceText";
import { useTranslation } from "../../utils/useTranslation";
import { formatDate } from "../../utils/formatDate";
import { useSessionContext } from "../../context/SessionContext";
import { isDemoUser } from "../../features/authDatabase";
import { logActivity } from "../../storage/kvpDatabase";
import type { ActivityLog } from "../../types";

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

const priorityMap: Record<string, string> = {
  High: "High",
  Medium: "Medium",
  Low: "Low",
  Hoch: "High",
  Mittel: "Medium",
  Niedrig: "Low",
};

const priorityColorsLight = {
  High: "border-red-400",
  Medium: "border-orange-400",
  Low: "border-green-400",
};

const priorityColorsDark = {
  High: "border-red-400/40",
  Medium: "border-orange-400/40",
  Low: "border-green-400/40",
};

const pcdaColorsLight = {
  Plan: "border-blue-300/70",
  Do: "border-purple-300/70",
  Check: "border-yellow-300/70",
  Act: "border-green-300/70",
  Rejected: "border-red-400/70",
  Archived: "border-gray-400/70",
};

const pcdaColorsDark = {
  Plan: "border-blue-400/40",
  Do: "border-purple-400/40",
  Check: "border-yellow-400/40",
  Act: "border-green-400/40",
  Rejected: "border-red-400/40",
  Archived: "border-gray-400/40",
};

const pcdaColors = (theme: string) =>
  theme === "dark" ? pcdaColorsDark : pcdaColorsLight;

const priorityColors = (theme: string) =>
  theme === "dark" ? priorityColorsDark : priorityColorsLight;

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
  const { theme } = useTheme();
  const width = useWindowWidth();
  const translation = useTranslation();
  const { session } = useSessionContext();
  const isDemo = isDemoUser(session?.user?.email);

  const menuWrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuWrapperRef, () => setShowMenu(false));

  const priorityMapping = (priority: string) => {
    return priorityMap[translation.pdcaCard.priorities[0]] === priority
      ? translation.pdcaCard.priorities[0]
      : priorityMap[translation.pdcaCard.priorities[1]] === priority
        ? translation.pdcaCard.priorities[1]
        : translation.pdcaCard.priorities[2];
  };

  const handleArchive = () => {
    archiveKvp(id);
    showToast(
      width,
      theme,
      "success",
      `${translation.pdcaCard.pdca} " ${title} " ${translation.pdcaCard.archived}.`,
    );
    logger("ARCHIVED");
    setShowMenu(false);
  };

  const handleReject = () => {
    rejectKvp(id);
    showToast(
      width,
      theme,
      "info",
      `${translation.pdcaCard.pdca} " ${title} " ${translation.pdcaCard.rejected}.`,
    );
    logger("REJECTED");
    setShowMenu(false);
  };

  const handleDelete = () => {
    setShowDialog(true);
    setShowMenu(false);
    logger("DELETED");
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

  const handleDamoClick = () => {
    showToast(width, theme, "warning", translation.demoMode.toastMessage);
  };

  const logger = async (action: ActivityLog["action"]) => {
    await logActivity({
      id: Date.now().toString(),
      userId: session?.user.id || "unknown",
      userName: session?.user.email || "Unknown User",
      action: action,
      entityType: "PDCA",
      entityId: id.toString(),
      details: `${title}`,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div
      className={`bg-card z-0 p-4 pb-2.5 text-left border-b-3 ${pcdaColors(theme)[state]} rounded-lg shadow-md hover:translate-y-1 hover:shadow-lg transition-transform duration-100 ease-in cursor-pointer ${state === "Archived" || state === "Rejected" ? "opacity-80" : ""}`}
    >
      <div
        ref={menuWrapperRef}
        className="relative flex items-start justify-between mb-2 gap-1.5"
      >
        <p className="text-sm lg:text-lg text-text-primary font-semibold ">
          {sliceText(title, 15)}
        </p>
        <img
          onClick={() => setShowMenu(!showMenu)}
          src={theme === "dark" ? "/more-white.svg" : "/more.svg"}
          alt="More"
          className={`h-6 w-6 rounded-full object-cover -mr-2 ${theme === "dark" ? "hover:bg-gray-500/50" : "hover:bg-gray-200"} hover:scale-110 cursor-pointer`}
        />
        <div
          className={`absolute ${showMenu ? "block" : "hidden"} right-8.5 -mt-1.5 `}
        >
          {" "}
          {isDemo ? (
            <CardMenuItem
              onEdit={handleEditClick}
              onArchive={handleDamoClick}
              onReject={handleDamoClick}
              onDelete={handleDamoClick}
            />
          ) : (
            <CardMenuItem
              onEdit={handleEditClick}
              onArchive={handleArchive}
              onReject={handleReject}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
      <p className="text-text-primary text-sm lg:text-md text-pretty break-all mb-3">
        <span className="font-medium text-text-primary mr-1">
          {translation.pdcaCard.category}:{" "}
        </span>
        {sliceText(category, 30)}
      </p>

      <div className="flex items-center mb-4 gap-2.5 text-gray-500 ">
        <span className="text-x text-text-secondary tracking-tight lg:text-sm ">
          {translation.pdcaCard.priority}:
        </span>
        <span
          className={`px-2.5 py-0.5 text-xs text-text-primary font-body font-medium rounded-full border-2 shadow ${priorityColors(theme)[priority]}`}
        >
          {priorityMapping(priority)}
        </span>
      </div>
      {/* Divider */}
      <div
        className={`border-t border-dashed ${theme === "dark" ? "border-gray-500" : "border-gray-300"} mb-3`}
      />
      <p className="font-normal tracking-tight text-text-secondary text-wrap break-all text-sm mb-3">
        {translation.pdcaCard.assignedTo}: {assignedTo}
      </p>
      <p className="font-normal tracking-tight text-text-secondary truncate text-sm mb-3">
        {translation.pdcaCard.benefit}:{" "}
        {benefit ? benefit : translation.pdcaCard.noBenefits}
      </p>
      <p className="text-text-primary font-semibold text-pretty text-xs mb-2">
        {translation.pdcaCard.description}:
        <span className="text-xs font-normal text-text-secondary ml-2">
          {sliceText(description, 200)}
        </span>
      </p>
      {/* Divider */}
      <div
        className={`border-t border-dashed ${theme === "dark" ? "border-gray-500" : "border-gray-300"} my-3`}
      />
      <div className="flex flex-col items-start justify-between mt-2">
        <span className="text-xs tracking-tight py-0.5 text-text-secondary">
          <img
            src={theme === "dark" ? "/user-white.svg" : "/user.svg"}
            alt="User"
            className="h-4 w-4 hidden md:inline rounded-full mr-1.5 mb-1"
          />
          {translation.pdcaCard.createdBy}: {createdBy}
        </span>
        <span className="text-xs tracking-tight py-0.5 text-text-secondary">
          <img
            src={theme === "dark" ? "/calender-white.svg" : "/calender.svg"}
            alt="Calender"
            className="h-4 w-4 hidden md:inline rounded-full mr-1.5 mb-1"
          />
          {translation.pdcaCard.createdAt}: {formatDate(createdAt)}
        </span>
        <span className="text-xs tracking-tight py-0.5 text-text-secondary">
          <img
            src={theme === "dark" ? "/target-white.svg" : "/target.svg"}
            alt="Target"
            className="h-4 w-4 hidden md:inline rounded-full mr-1.5 mb-1"
          />
          {translation.pdcaCard.targetDate}: {formatDate(targetDate)}
        </span>
      </div>
      {showDialog &&
        createPortal(
          <ConfirmDialogItem
            title={translation.pdcaCard.deletePdca}
            message={translation.pdcaCard.deleteMessage(title)}
            confirmButtonText={translation.pdcaCard.confirmButton}
            cancelButtonText={translation.pdcaCard.cancelButton}
            onConfirm={() => {
              deleteKvp(id);
              showToast(
                width,
                theme,
                "success",
                `${translation.pdcaCard.pdca} " ${title} " ${translation.pdcaCard.deleted}.`,
              );
              setShowDialog(false);
            }}
            onCancel={() => setShowDialog(false)}
          />,
          document.body,
        )}
    </div>
  );
}
