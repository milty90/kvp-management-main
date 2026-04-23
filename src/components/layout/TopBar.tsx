import { useNavigate } from "react-router-dom";
import { useRef, useState, type ReactNode } from "react";
import ColorButton from "../buttons/ColorButton";
import type { ColorButtonType } from "../../types";
import { SettingItem } from "../items/SettingItem";
import { useClickOutside } from "../../utils/clickOutside";
import { signOut } from "../../utils/authDatabase";
import { ConfirmDialogItem } from "../items/ConfirmDialogItem";
import { createPortal } from "react-dom";
import { SettingsModal } from "../items/SettingsModal";
import { ProfileModal } from "../items/ProfileModal";
import { useWindowWidth } from "../../utils/useWindowWidth";
import MenuItem from "../items/MenuItem";
import { useTheme } from "../../context/ThemeContext";
import { showToast } from "../items/ToastItem";
import { TopNavButton } from "../buttons/TopNavButton";

interface TopBarProps {
  kvpBar?: ReactNode;
  kvpButtonColor?: ColorButtonType;
  statButtonColor?: ColorButtonType;
}

export default function TopBar({
  kvpBar,
  kvpButtonColor = "blue",
  statButtonColor = "gray",
}: TopBarProps) {
  const navigate = useNavigate();

  const { theme } = useTheme();

  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const settingsWrapperRef = useRef<HTMLDivElement | null>(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useClickOutside(settingsWrapperRef, () => {
    setShowSettings(false);
    setShowMenu(false);
  });

  const width = useWindowWidth();

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
  return (
    <div className="flex flex-col w-full shadow-md rounded-2xl">
      <div className="w-full px-2 py-3 pt-0 md:p-3 md:rounded-t-2xl bg-surface text-text-primary flex items-center justify-between">
        <div className="flex items-center justify-center">
          <img
            src={theme === "dark" ? "/spark-dark.png" : "/spark-light.png"}
            alt="Logo"
            className="h-10 md:h-11 mx-3 mt-3 mb-0"
          />
          <p className="hidden md:block text-text-primary font-light font-poppins tracking-tight -mb-6 text-sm">
            KVP Management System
          </p>
        </div>
        <div
          ref={settingsWrapperRef}
          className={`relative flex items-start space-x-3 mr-3 -mb-2.5`}
        >
          {width >= 768 ? (
            <>
              <TopNavButton
                icon={<img src="/settings.svg" alt="Settings" />}
                onClick={() => {
                  setShowSettingsModal(true);
                }}
                theme={theme}
              />
              <ColorButton
                color={kvpButtonColor}
                icon={"/trending.svg"}
                onClick={() => {
                  handleKvpsClick();
                }}
              >
                Verbesserungen
              </ColorButton>

              <ColorButton
                color={statButtonColor}
                icon="/graph.svg"
                onClick={() => {
                  handleStatisticsClick();
                }}
              >
                Statistik
              </ColorButton>
            </>
          ) : (
            <svg
              onClick={() => {
                setShowMenu(!showMenu);
                setShowSettings(false);
              }}
              viewBox="-0.5 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-8 mt-0.5 mr-2 rounded-full object-cover hover:ring-2 hover:ring-offset-1 ${theme === "dark" ? "hover:ring-green-500" : "hover:ring-blue-500"}  transition-transform duration-600 ease-in hover:rotate-90 cursor-pointer`}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M19 3.32001H16C14.8954 3.32001 14 4.21544 14 5.32001V8.32001C14 9.42458 14.8954 10.32 16 10.32H19C20.1046 10.32 21 9.42458 21 8.32001V5.32001C21 4.21544 20.1046 3.32001 19 3.32001Z"
                  stroke={`${theme === "dark" ? "#f3f4f6" : "#373643"}`}
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M8 3.32001H5C3.89543 3.32001 3 4.21544 3 5.32001V8.32001C3 9.42458 3.89543 10.32 5 10.32H8C9.10457 10.32 10 9.42458 10 8.32001V5.32001C10 4.21544 9.10457 3.32001 8 3.32001Z"
                  stroke={`${theme === "dark" ? "#f3f4f6" : "#373643"}`}
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M19 14.32H16C14.8954 14.32 14 15.2154 14 16.32V19.32C14 20.4246 14.8954 21.32 16 21.32H19C20.1046 21.32 21 20.4246 21 19.32V16.32C21 15.2154 20.1046 14.32 19 14.32Z"
                  stroke={`${theme === "dark" ? "#f3f4f6" : "#373643"}`}
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M8 14.32H5C3.89543 14.32 3 15.2154 3 16.32V19.32C3 20.4246 3.89543 21.32 5 21.32H8C9.10457 21.32 10 20.4246 10 19.32V16.32C10 15.2154 9.10457 14.32 8 14.32Z"
                  stroke={`${theme === "dark" ? "#f3f4f6" : "#373643"}`}
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          )}
          <svg
            onClick={() => {
              setShowSettings(!showSettings);
              setShowMenu(false);
            }}
            viewBox="0 0 192 192"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className={`w-8 mt-0.5 -mr-0.5  rounded-full object-cover hover:ring-2 hover:ring-offset-1 ${theme === "dark" ? "hover:ring-green-500" : "hover:ring-blue-500"}  transition-transform duration-300 ease-in hover:rotate-30 cursor-pointer`}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill={`${theme === "dark" ? "#f3f4f6" : "#373643"}`}
                d="m80.16 29.054-5.958-.709 5.958.71Zm31.68 0-5.958.71 5.958-.71Zm34.217 19.756-2.365-5.515 2.365 5.514Zm10.081 3.352 5.196-3-5.196 3Zm7.896 13.676 5.196-3-5.196 3Zm-2.137 10.407-3.594-4.805 3.594 4.805Zm0 39.51 3.593-4.805-3.593 4.805Zm2.137 10.407 5.196 3-5.196-3Zm-7.896 13.676-5.196-3 5.196 3Zm-10.081 3.353 2.364-5.515-2.364 5.515Zm-34.217 19.755 5.958.709-5.958-.709Zm-31.68 0-5.958.709 5.958-.709Zm-34.217-19.755-2.364-5.515 2.364 5.515Zm-10.08-3.353-5.197 3 5.196-3Zm-7.897-13.676 5.196-3-5.196 3Zm2.137-10.407 3.594 4.805-3.594-4.805Zm0-39.51L26.51 81.05l3.593-4.805Zm-2.137-10.407 5.196 3-5.196-3Zm7.896-13.676-5.196-3 5.196 3Zm10.081-3.352-2.364 5.514 2.364-5.514Zm7.85 3.365-2.365 5.515 2.364-5.515Zm0 87.65 2.364 5.514-2.365-5.514ZM36.235 111.17l-3.594-4.805 3.594 4.805Zm76.823 41.535 5.958.71-5.958-.71Zm39.854-69.742-3.593-4.805 3.593 4.805Zm-16.369-30.074 2.364 5.514-2.364-5.514Zm-23.485-13.594-5.958.709 5.958-.71ZM88.104 16a14 14 0 0 0-13.902 12.345l11.916 1.419A2 2 0 0 1 88.104 28V16Zm15.792 0H88.104v12h15.792V16Zm13.902 12.345A14 14 0 0 0 103.896 16v12a2 2 0 0 1 1.986 1.764l11.916-1.419Zm1.219 10.24-1.219-10.24-11.916 1.419 1.219 10.24 11.916-1.419Zm24.675 4.71-9.513 4.08 4.729 11.028 9.513-4.08-4.729-11.028Zm17.642 5.867a14 14 0 0 0-17.642-5.867l4.729 11.029a2 2 0 0 1 2.521.838l10.392-6Zm7.896 13.676-7.896-13.676-10.392 6 7.896 13.676 10.392-6Zm-3.74 18.212a14 14 0 0 0 3.74-18.212l-10.392 6a2 2 0 0 1-.535 2.602l7.187 9.61Zm-8.984 6.718 8.984-6.718-7.187-9.61-8.983 6.718 7.186 9.61Zm8.984 23.182-8.984-6.718-7.186 9.61 8.983 6.718 7.187-9.61Zm3.74 18.212a14 14 0 0 0-3.74-18.212l-7.187 9.61a2 2 0 0 1 .535 2.602l10.392 6Zm-7.896 13.676 7.896-13.676-10.392-6-7.896 13.676 10.392 6Zm-17.642 5.867a14 14 0 0 0 17.642-5.867l-10.392-6a2.001 2.001 0 0 1-2.521.838l-4.729 11.029Zm-9.513-4.08 9.513 4.08 4.729-11.029-9.512-4.079-4.73 11.028Zm-16.381 19.03 1.219-10.24-11.916-1.419-1.219 10.24 11.916 1.419ZM103.896 176a14 14 0 0 0 13.902-12.345l-11.916-1.419a2 2 0 0 1-1.986 1.764v12Zm-15.792 0h15.792v-12H88.104v12Zm-13.902-12.345A14 14 0 0 0 88.104 176v-12a2 2 0 0 1-1.986-1.764l-11.916 1.419Zm-1.012-8.504 1.012 8.504 11.916-1.419-1.012-8.504-11.916 1.419ZM51.428 134.31l-7.85 3.366 4.73 11.029 7.849-3.366-4.73-11.029Zm-7.85 3.366a2 2 0 0 1-2.52-.838l-10.392 6a14 14 0 0 0 17.642 5.867l-4.73-11.029Zm-2.52-.838-7.896-13.676-10.392 6 7.896 13.676 10.392-6Zm-7.896-13.676a2 2 0 0 1 .535-2.602l-7.187-9.61a14 14 0 0 0-3.74 18.212l10.392-6Zm.535-2.602 6.132-4.585-7.187-9.61-6.132 4.585 7.187 9.61ZM26.51 81.05l6.132 4.586 7.187-9.61-6.132-4.586-7.187 9.61Zm-3.74-18.212a14 14 0 0 0 3.74 18.212l7.187-9.61a2 2 0 0 1-.535-2.602l-10.392-6Zm7.896-13.676L22.77 62.838l10.392 6 7.896-13.676-10.392-6Zm17.642-5.867a14 14 0 0 0-17.642 5.867l10.392 6a2 2 0 0 1 2.52-.838l4.73-11.029Zm7.849 3.366-7.85-3.366-4.729 11.029 7.85 3.366 4.729-11.029Zm18.045-18.316-1.012 8.504 11.916 1.419 1.012-8.504-11.916-1.419Zm-1.754 27.552c6.078-3.426 11.69-9.502 12.658-17.63L73.19 36.85c-.382 3.209-2.769 6.415-6.635 8.595l5.893 10.453Zm-21.02 1.793c7.284 3.124 15.055 1.57 21.02-1.793l-5.893-10.453c-3.704 2.088-7.481 2.468-10.398 1.217l-4.73 11.029ZM49 96c0-7.1-2.548-15.022-9.171-19.975l-7.187 9.61C35.36 87.668 37 91.438 37 96h12Zm23.448 40.103c-5.965-3.363-13.736-4.917-21.02-1.793l4.729 11.029c2.917-1.251 6.694-.871 10.398 1.218l5.893-10.454Zm-32.62-20.128C46.452 111.022 49 103.1 49 96H37c0 4.563-1.64 8.333-4.358 10.365l7.187 9.61Zm78.679 19.575c-5.536 3.298-10.517 8.982-11.406 16.446l11.916 1.419c.329-2.765 2.318-5.582 5.632-7.557l-6.142-10.308Zm20.402-1.953c-7.094-3.042-14.669-1.463-20.402 1.953l6.142 10.308c3.382-2.015 6.872-2.372 9.53-1.233l4.73-11.028Zm-53.803 20.135c-.968-8.127-6.58-14.202-12.658-17.629l-5.893 10.454c3.866 2.179 6.253 5.385 6.635 8.594l11.916-1.419ZM141 96c0 6.389 2.398 13.414 8.32 17.842l7.186-9.61C154.374 102.638 153 99.668 153 96h-12Zm8.32-17.842C143.398 82.586 141 89.61 141 96h12c0-3.668 1.374-6.638 3.506-8.232l-7.186-9.61ZM118.507 56.45c5.733 3.416 13.308 4.995 20.401 1.953l-4.729-11.029c-2.658 1.14-6.148.782-9.53-1.233l-6.142 10.31Zm-11.406-16.446c.889 7.464 5.87 13.148 11.406 16.446l6.142-10.309c-3.314-1.974-5.303-4.79-5.632-7.556l-11.916 1.419Z"
              ></path>
              <path
                stroke={theme === "dark" ? "#f3f4f6" : "#373643"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="12"
                d="M96 120c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24Z"
              ></path>
            </g>
          </svg>
          <div
            className={`absolute ${width < 768 ? "-right-6 mt-10" : "right-10 -mt-2"} ${showSettings ? " block" : " hidden"}`}
          >
            {showSettings && (
              <SettingItem
                onSetting={handleSettingsClick}
                onProfile={handleProfileClick}
                onLogout={handleLogoutClick}
              />
            )}
          </div>
          <div
            className={`absolute -right-3 mt-10${showMenu ? " block" : " hidden"}`}
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
            title="Abmelden"
            message="Möchten Sie sich wirklich abmelden?"
            onConfirm={() => {
              signOut();
              navigate("/login");
              showToast(width, theme, "success", "Erfolgreich abgemeldet.");
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
          />,
          document.body,
        )}
      {showProfileModal &&
        createPortal(
          <ProfileModal
            onConfirm={() => setShowProfileModal(false)}
            onCancel={() => setShowProfileModal(false)}
          />,
          document.body,
        )}
    </div>
  );
}
