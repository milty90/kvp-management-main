import { useNavigate } from "react-router-dom";
import { useRef, useState, type ReactNode } from "react";
import type { ColorButtonType } from "../../types";
import { SettingItem } from "../items/SettingItem";
import { useClickOutside } from "../../utils/clickOutside";
import { signOut } from "../../features/authDatabase";
import { ConfirmDialogItem } from "../items/ConfirmDialogItem";
import { createPortal } from "react-dom";
import { SettingsModal } from "../items/SettingsModal";
import { ProfileModal } from "../items/ProfileModal";
import { useWindowWidth } from "../../utils/useWindowWidth";
import MenuItem from "../items/MenuItem";
import { useTheme } from "../../context/ThemeContext";
import { showToast } from "../items/ToastItem";
import { TopNavButton } from "../buttons/TopNavButton";
import { useTranslation } from "../../utils/useTranslation";
import EditProfileModal from "../items/EditProfileModal";
import { useUserContext } from "../../context/UserContext";
import { LogActivityModal } from "../items/LogActivityModal";

interface TopBarProps {
  kvpBar?: ReactNode;
  kvpButtonColor?: ColorButtonType;
  statButtonColor?: ColorButtonType;
}

export default function TopBar({ kvpBar }: TopBarProps) {
  const navigate = useNavigate();

  const { theme } = useTheme();

  const width = useWindowWidth();
  const translation = useTranslation();

  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { deleteUser, user } = useUserContext();

  const settingsWrapperRef = useRef<HTMLDivElement | null>(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showDeleteProfileDialog, setShowDeleteProfileDialog] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);

  useClickOutside(settingsWrapperRef, () => {
    setShowSettings(false);
    setShowMenu(false);
  });

  const handleTopNavChange = (isKvpSelected: boolean) => {
    navigate(isKvpSelected ? "/kvps" : "/stats");
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
    setShowSettings(false);
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
    setShowSettings(false);
  };

  const handleLogoutClick = () => {
    setShowConfirmDialog(true);
    setShowSettings(false);
  };

  const handleKvpsClick = () => {
    navigate("/kvps");
    setShowMenu(false);
  };

  const handleStatisticsClick = () => {
    navigate("/stats");
    setShowMenu(false);
  };

  const handleDeleteProfileClick = () => {
    deleteUser(user?.id || "");
    console.log("User deleted:", user?.id);
    signOut();
    navigate("/login");
    showToast(
      width,
      theme,
      "success",
      translation.profileModal.deleteButton +
        " " +
        translation.logOutModal.toastMessage,
    );
    setShowDeleteProfileDialog(true);
    setShowProfileModal(false);
  };

  const handleActivityLogClick = () => {
    setShowActivityLog(true);
    setShowSettingsModal(false);
  };
  return (
    <div className="flex flex-col w-full shadow-md rounded-2xl">
      <div className="w-full px-2 py-3 pt-0 md:p-3 md:rounded-t-2xl bg-surface text-text-primary flex items-center justify-between">
        <div className="flex items-center justify-center">
          <img
            src={theme === "dark" ? "/spark-dark.png" : "/spark-light.png"}
            alt="Logo"
            className="h-10 md:h-11 mx-3 mt-3 mb-0"
          />
          <p className="hidden lg:block text-text-primary font-light tracking-tight -mb-6 text-sm">
            {translation.appName}
          </p>
        </div>
        <div
          ref={settingsWrapperRef}
          className={`relative flex items-center -x-3 mr-3 -mb-2.5 ${width < 768 ? "gap-1" : "gap-2.5"}`}
        >
          {width >= 768 ? (
            <TopNavButton theme={theme} onChange={handleTopNavChange} />
          ) : (
            <img
              className={`w-8 mr-2 rounded-full object-cover hover:ring-2 hover:ring-offset-1 ${theme === "dark" ? "hover:ring-green-500" : "hover:ring-blue-500"}  transition-transform duration-600 ease-in hover:rotate-90 cursor-pointer`}
              src={theme === "dark" ? "/menu-light.svg" : "/menu.svg"}
              alt="Menu"
              onClick={() => {
                setShowMenu(!showMenu);
                setShowSettings(false);
              }}
            />
          )}
          <img
            onClick={() => {
              setShowSettings(!showSettings);
              setShowMenu(false);
            }}
            className={`w-8 -mr-0.5 rounded-full object-cover hover:ring-2 hover:ring-offset-1 ${theme === "dark" ? "hover:ring-green-700" : "hover:ring-blue-600"}  transition-transform duration-300 ease-in hover:rotate-30 cursor-pointer`}
            src={theme === "dark" ? "/settings-light.svg" : "/settings.svg"}
            alt="Settings"
          />
          <div
            className={`absolute ${width < 768 ? "-right-3 mt-10" : "right-12 -mt-11"} ${showSettings ? " block" : " hidden"}`}
          >
            {showSettings && (
              <SettingItem
                onSetting={handleSettingsClick}
                onProfile={() => {
                  handleProfileClick();
                }}
                onLogout={handleLogoutClick}
              />
            )}
          </div>
          <div
            className={`absolute -right-3 mt-10 ${showMenu ? " block" : " hidden"}`}
          >
            {showMenu && (
              <MenuItem
                onKvpsClick={handleKvpsClick}
                onStatisticsClick={handleStatisticsClick}
              />
            )}
          </div>
        </div>
      </div>
      {kvpBar}
      {showConfirmDialog &&
        createPortal(
          <ConfirmDialogItem
            confirmButtonText={translation.logOutModal.onConfirm}
            cancelButtonText={translation.logOutModal.onCancel}
            title={translation.logOutModal.title}
            message={translation.logOutModal.message}
            onConfirm={() => {
              signOut();
              navigate("/login");
              showToast(
                width,
                theme,
                "success",
                translation.logOutModal.toastMessage,
              );
              setShowConfirmDialog(false);
            }}
            onCancel={() => setShowConfirmDialog(false)}
          />,
          document.body,
        )}
      {showSettingsModal &&
        createPortal(
          <SettingsModal
            onConfirm={() => setShowSettingsModal(false)}
            onCancel={() => setShowSettingsModal(false)}
            showActivityLog={() => handleActivityLogClick()}
          />,
          document.body,
        )}
      {showProfileModal &&
        createPortal(
          <ProfileModal
            onConfirm={() => setShowProfileModal(false)}
            onCancel={() => setShowProfileModal(false)}
            showEditProfile={() => {
              setShowProfileModal(false);
              setShowEditProfileModal(true);
            }}
            showDeleteProfile={() => {
              setShowProfileModal(false);
              setShowDeleteProfileDialog(true);
            }}
          />,
          document.body,
        )}
      {showEditProfileModal &&
        createPortal(
          <EditProfileModal
            onConfirm={() => setShowEditProfileModal(false)}
            onCancel={() => setShowEditProfileModal(false)}
          />,
          document.body,
        )}
      {showDeleteProfileDialog &&
        createPortal(
          <ConfirmDialogItem
            confirmButtonText={translation.profileModal.deleteButton}
            cancelButtonText={translation.logOutModal.onCancel}
            title={translation.profileModal.deleteButton}
            message={
              "Funktion zum Löschen des Kontos ist noch nicht implementiert."
            }
            onConfirm={() => {
              handleDeleteProfileClick();
            }}
            onCancel={() => setShowDeleteProfileDialog(false)}
          />,
          document.body,
        )}
      {showActivityLog &&
        createPortal(
          <LogActivityModal onClose={() => setShowActivityLog(false)} />,
          document.body,
        )}
    </div>
  );
}
