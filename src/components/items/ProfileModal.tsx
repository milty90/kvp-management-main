import { fetchUser } from "../../features/authDatabase";
import ColorButton from "../buttons/ColorButton";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "../../utils/useTranslation";
import { formatDate } from "../../utils/formatDate";
import { useUserContext } from "../../context/UserContext";
import { useKvpContext } from "../../context/KvpContext";

interface ProfileModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  showEditProfile?: () => void;
  showDeleteProfile?: () => void;
}

export function ProfileModal({
  onConfirm,
  onCancel,
  showEditProfile,
  showDeleteProfile,
}: ProfileModalProps) {
  const [username, setUsername] = useState(
    "... " + useTranslation().profileModal.loadData,
  );
  const [email, setEmail] = useState(
    "... " + useTranslation().profileModal.loadData,
  );
  const { theme } = useTheme();
  const translation = useTranslation();
  const { users } = useUserContext();
  const { kvps } = useKvpContext();

  const userNameFromContext = users?.find(
    (user) => user.userEmail === email,
  )?.userName;
  useEffect(() => {
    if (userNameFromContext) {
      setUsername(userNameFromContext);
    }
  }, [userNameFromContext]);

  const department =
    users?.find((user) => user.userEmail === email)?.department || "N/A";
  const role = users?.find((user) => user.userEmail === email)?.role || "N/A";
  const [lastSignIn, setLastSignIn] = useState(
    "... " + useTranslation().profileModal.loadData,
  );

  const assignedTo =
    kvps?.filter((kvp) => kvp.assignedTo === username && kvp.state !== "Act")
      .length || 0;

  const createdBy =
    kvps?.filter((kvp) => kvp.createdBy === username).length || 0;

  const act =
    kvps?.filter((kvp) => kvp.assignedTo === username && kvp.state === "Act")
      .length || 0;

  const profileUser = users?.find((user) => user.userEmail === email)?.photoUrl;

  useEffect(() => {
    fetchUser(setUsername, setEmail, setLastSignIn);
  }, [users]);

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-700/50">
      <div className="bg-surface px-6 pt-6 md:py-5 md:rounded-xl shadow-lg w-full h-full md:h-auto max-w-xl relative">
        <h2 className="text-xl font-bold pl-1">
          {translation.profileModal.title}
        </h2>
        <button
          type="button"
          className="absolute top-4 right-7 text-3xl text-gray-500 hover:text-text-primary"
          onClick={onCancel}
        >
          &times;
        </button>

        <div className="border-t border-border mt-4 mb-2"></div>

        <div className="flex flex-row items-center justify-between mb-2 py-4 pr-1.5 pl-0 md:p-4 ">
          <div className="flex flex-row items-center justify-center  px-1 ">
            <div className="flex flex-row border-2 rounded-full p-1 w-max h-max">
              <img
                src={profileUser || "/face-id.png"}
                alt="Profilbild"
                className="w-24 h-24 rounded-full object-cover "
              />
            </div>
            <div className="flex flex-col items-start ml-4">
              <p className="text-xl text-text-primary font-semibold">
                {users?.find((user) => user.userEmail === email)?.firstName ||
                  "N/A"}{" "}
                {users?.find((user) => user.userEmail === email)?.lastName ||
                  "N/A"}
              </p>

              <p className=" text-text-secondary text-base font-medium ">
                {email}
              </p>
              <p className="text-sm text-gray-500">
                {users?.find((user) => user.userEmail === email)?.aboutMe}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2.5">
            <ColorButton
              color="gray"
              isTextOnly={false}
              icon="edit.svg"
              onClick={() => {
                if (showEditProfile) {
                  showEditProfile();
                }
              }}
            >
              {translation.profileModal.profileButton}
            </ColorButton>
            <ColorButton
              color="red"
              isTextOnly={false}
              icon="user-delete.svg"
              onClick={() => {
                if (showDeleteProfile) {
                  showDeleteProfile();
                }
              }}
            >
              {translation.profileModal.deleteButton}
            </ColorButton>
          </div>
        </div>
        <div className="flex items-center justify-between  h-20 mb-2 gap-2 ">
          <div
            className={`flex flex-col items-center text-sm w-3/12 lg:w-4/12 ${theme === "dark" ? "bg-card text-gray-500 border border-gray-500" : "bg-gray-100 text-gray-500 border border-border"} rounded-lg px-5 py-3`}
          >
            <p className="text-3xl text-blue-500">{createdBy}</p>
            <p className="text-md text-text-secondary ">
              {translation.profileModal.cardActive}
            </p>
          </div>
          <div
            className={`flex flex-col items-center text-sm w-4/12 lg:w-4/12 ${theme === "dark" ? "bg-card text-gray-500 border border-gray-500" : "bg-gray-100 text-gray-500 border border-border"} rounded-lg px-5 py-3`}
          >
            <p className="text-3xl text-yellow-500">{assignedTo}</p>
            <p className="text-md text-text-secondary ">
              {translation.profileModal.cardAssigned}
            </p>
          </div>
          <div
            className={`flex flex-col items-center text-sm w-5/13 lg:w-4/12 ${theme === "dark" ? "bg-card text-gray-500 border border-gray-500" : "bg-gray-100 text-gray-500 border border-border"} rounded-lg px-5 py-3`}
          >
            <p className="text-3xl text-green-500">{act}</p>
            <p className="text-md text-text-secondary ">
              {translation.profileModal.cardClosed}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start px-6 lg:px-8 py-3 mb-2 mt-4 rounded-lg border-dashed border-2 border-border ">
          <p className="text-sm text-text-secondary my-1">
            {translation.profileModal.name}:{" "}
            <span className="text-text-primary pl-3">
              {userNameFromContext || username}
            </span>
          </p>
          <p className="text-sm text-text-secondary my-1">
            {translation.profileModal.department}:{" "}
            <span className="text-text-primary pl-3">{department}</span>
          </p>
          <p className="text-sm text-text-secondary my-1">
            {translation.profileModal.role}:{" "}
            <span className="text-text-primary pl-3">{role}</span>
          </p>
          <p className="text-sm text-text-secondary my-1">
            {translation.profileModal.lastLogin}:
            <span className="text-text-primary pl-2">
              {formatDate(lastSignIn)}
            </span>
          </p>
        </div>

        <div className="mt-6 pr-2 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-md text-sm font-medium ${theme === "dark" ? " text-text-secondary hover:text-text-primary hover:bg-gray-700/80" : "text-text-secondary hover:text-text-primary hover:bg-gray-300/80"} transition-colors duration-150`}
          >
            {translation.profileModal.closeButton}
          </button>
          <ColorButton onClick={onConfirm} color="blue" isTextOnly={true}>
            {translation.profileModal.saveButton}
          </ColorButton>
        </div>
      </div>
    </div>
  );
}
