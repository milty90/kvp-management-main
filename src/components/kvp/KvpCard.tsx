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
import type {
  ActivityAction,
  InsertActivityLog,
  Kvp,
  Priority,
  State,
} from "../../types";

interface KvpCardProps extends Kvp {
  state: State;
  priority: Priority;

  onOpenModal?: () => void;
  isRejected?: boolean;
}

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
  isRejected = false,
}: KvpCardProps) {
  const { setSelectedKvp, deleteKvp, archiveKvp, rejectKvp } = useKvpContext();

  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const { theme } = useTheme();
  const width = useWindowWidth();
  const translation = useTranslation();
  const { session } = useSessionContext();
  const isDemo = isDemoUser(session?.user?.email);

  const menuWrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuWrapperRef, () => setShowMenu(false));

  const priorityMapping = (priority: string): string => {
    const map: Record<string, number> = {
      High: 0,
      Medium: 1,
      Low: 2,
    };
    return translation.pdcaCard.priorities[map[priority]] ?? priority;
  };

  const handleArchive = () => {
    setShowArchiveDialog(true);
    setShowMenu(false);
    logger("ARCHIVED");
  };

  const handleReject = () => {
    setShowRejectDialog(true);
    setShowMenu(false);
    logger("REJECTED");
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
    setShowMenu(false);
    logger("DELETED");
  };

  const handleEditClick = () => {
    setShowEditDialog(true);
    setShowMenu(false);
  };

  const handleDamoClick = () => {
    showToast(width, theme, "warning", translation.demoMode.toastMessage);
  };

  const logger = async (action: ActivityAction) => {
    const log: InsertActivityLog = {
      userId: session?.user.id ?? "unknown",
      userName: session?.user.email ?? "Unknown User",
      action: action,
      entityType: "PDCA",
      entityId: id.toString(),
      details: `User ${action.toLowerCase()} PDCA "${title}".`,
      timestamp: new Date().toISOString(),
    };
    await logActivity(log);
  };

  return (
    <div
      className={`bg-card z-0 p-4 pb-2.5 text-left border-b-3 ${pcdaColors(theme)[state]} rounded-lg shadow-md hover:translate-y-1 hover:shadow-lg transition-transform duration-100 ease-in ${state === "Archived" || state === "Rejected" ? "opacity-80" : ""}`}
    >
      <div
        ref={menuWrapperRef}
        className="relative flex items-start justify-between mb-2 gap-1.5"
      >
        <p className="text-sm lg:text-lg text-text-primary font-semibold ">
          {sliceText(title ?? "Unknown Title", 15)}
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
              isRejected={isRejected}
            />
          ) : (
            <CardMenuItem
              onEdit={handleEditClick}
              onArchive={handleArchive}
              onReject={handleReject}
              onDelete={handleDelete}
              isRejected={isRejected}
            />
          )}
        </div>
      </div>
      <p className="text-text-primary text-sm lg:text-md text-pretty break-all mb-3">
        <span className="font-medium text-text-primary mr-1">
          {translation.pdcaCard.category}:{" "}
        </span>
        {sliceText(category ?? "Unknown Category", 30)}
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

      <div
        className={`border-t border-dashed ${theme === "dark" ? "border-gray-500" : "border-gray-300"} mb-3`}
      />
      <p className="font-normal tracking-tight text-text-secondary overflow-hidden text-clip text-sm mb-3">
        {translation.pdcaCard.assignedTo}:{" "}
        {sliceText(assignedTo ?? "Unknown Assignee", 30)}
      </p>
      <p className="font-normal tracking-tight text-text-secondary text-sm mb-3">
        {translation.pdcaCard.benefit}:{" "}
        {benefit ? sliceText(benefit, 30) : translation.pdcaCard.noBenefits}
      </p>
      <p className="text-text-primary font-semibold overflow-hidden text-pretty text-xs mb-2">
        {translation.pdcaCard.description}:
        <span className="text-xs font-normal text-text-secondary ml-2">
          {sliceText(description ?? "No Description", 200)}
        </span>
      </p>

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
          {translation.pdcaCard.createdBy}: {createdBy ?? "Unknown Creator"}
        </span>
        <span className="text-xs tracking-tight py-0.5 text-text-secondary">
          <img
            src={theme === "dark" ? "/calender-white.svg" : "/calender.svg"}
            alt="Calender"
            className="h-4 w-4 hidden md:inline rounded-full mr-1.5 mb-1"
          />
          {translation.pdcaCard.createdAt}:{" "}
          {formatDate(createdAt ?? "Unknown Date")}
        </span>
        <span className="text-xs tracking-tight py-0.5 text-text-secondary">
          <img
            src={theme === "dark" ? "/target-white.svg" : "/target.svg"}
            alt="Target"
            className="h-4 w-4 hidden md:inline rounded-full mr-1.5 mb-1"
          />
          {translation.pdcaCard.targetDate}:{" "}
          {formatDate(targetDate ?? "Unknown Date")}
        </span>
      </div>
      {showDeleteDialog &&
        createPortal(
          <ConfirmDialogItem
            title={translation.pdcaCard.deletePdca}
            message={translation.pdcaCard.deleteMessage(
              title ?? "Unknown Title",
            )}
            confirmButtonText={translation.pdcaCard.deletePdca}
            cancelButtonText={translation.pdcaCard.cancelButton}
            onConfirm={() => {
              deleteKvp(id);
              showToast(
                width,
                theme,
                "success",
                `${translation.pdcaCard.pdca} " ${title ?? "Unknown Title"} " ${translation.pdcaCard.deleted}.`,
              );
              setShowDeleteDialog(false);
            }}
            onCancel={() => setShowDeleteDialog(false)}
          />,
          document.body,
        )}
      {showArchiveDialog &&
        createPortal(
          <ConfirmDialogItem
            title={translation.pdcaCard.archivePdca}
            message={translation.pdcaCard.archiveMessage(
              title ?? "Unknown Title",
            )}
            confirmButtonText={translation.pdcaCard.archivePdca}
            cancelButtonText={translation.pdcaCard.cancelButton}
            onConfirm={() => {
              archiveKvp(id);
              showToast(
                width,
                theme,
                "success",
                `${translation.pdcaCard.pdca} " ${title ?? "Unknown Title"} " ${translation.pdcaCard.archived}.`,
              );
              setShowArchiveDialog(false);
            }}
            onCancel={() => setShowArchiveDialog(false)}
          />,
          document.body,
        )}
      {showRejectDialog &&
        createPortal(
          <ConfirmDialogItem
            title={translation.pdcaCard.rejectPdca}
            message={translation.pdcaCard.rejectMessage(
              title ?? "Unknown Title",
            )}
            confirmButtonText={translation.pdcaCard.rejectPdca}
            cancelButtonText={translation.pdcaCard.cancelButton}
            onConfirm={() => {
              rejectKvp(id);
              showToast(
                width,
                theme,
                "info",
                `${translation.pdcaCard.pdca} " ${title ?? "Unknown Title"} " ${translation.pdcaCard.rejected}.`,
              );
              setShowRejectDialog(false);
            }}
            onCancel={() => setShowRejectDialog(false)}
          />,
          document.body,
        )}
      {showEditDialog &&
        createPortal(
          <ConfirmDialogItem
            title={translation.pdcaCard.editPdca}
            message={translation.pdcaCard.editMessage(title ?? "Unknown Title")}
            confirmButtonText={translation.pdcaCard.editPdca}
            cancelButtonText={translation.pdcaCard.cancelButton}
            onConfirm={() => {
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
              setShowEditDialog(false);
            }}
            onCancel={() => setShowEditDialog(false)}
          />,
          document.body,
        )}
    </div>
  );
}
