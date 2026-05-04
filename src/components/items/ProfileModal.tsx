import { fetchUser } from "../../utils/authDatabase";
import ColorButton from "../buttons/ColorButton";

import { useEffect, useState } from "react";
import { showToast } from "./ToastItem";
import { useTheme } from "../../context/ThemeContext";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useTranslation } from "../../utils/useTranslation";
import { addUser, deleteUser, updateUser } from "../../features/userActions";
import type { User } from "../../types";

interface ProfileModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ProfileModal({ onConfirm, onCancel }: ProfileModalProps) {
  const [username, setUsername] = useState(
    "... " + useTranslation().profileModal.loadData,
  );
  const [email, setEmail] = useState(
    "... " + useTranslation().profileModal.loadData,
  );
  const { theme } = useTheme();
  const width = useWindowWidth();
  const translation = useTranslation();

  const department = "lorem ipsum";
  const role = "lorem ipsum";

  useEffect(() => {
    fetchUser(setUsername, setEmail);
  }, []);

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

        <div className="border-t border-border my-4"></div>

        <div className="flex flex-col items-start justify-start mb-2 p-5 rounded-lg border border-gray-500">
          <div className="flex flex-row w-full justify-between items-center px-1">
            <img
              src="/face-id.png"
              alt="Profilbild"
              className="w-24 h-24 rounded-md object-cover"
            />
            <ColorButton
              color="gray"
              isTextOnly={true}
              onClick={() =>
                addUser(() => {}, {
                  id: 0,
                  photoUrl: "/face-id.png",
                  department: "lorem ipsum",
                  role: "lorem ipsum",
                  firstName: "John",
                  lastName: "Doe",
                  userName: "johndoe",
                  userEmail: "johndoe@example.com",
                  createdAt: new Date().toISOString(),
                  lastSignIn: new Date().toISOString(),
                } as User)
              }
            >
              {translation.profileModal.profileButton}
            </ColorButton>
          </div>
          <div className="flex flex-col items-start justify-start mt-3 px-1 gap-1">
            <p className=" text-text-primary text-xl font-semibold">
              {translation.profileModal.name}: {username}
            </p>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between  h-20 mb-2 gap-2 ">
          <div className="flex flex-col items-center text-sm w-3/12 lg:w-4/12 text-gray-500 border border-gray-500 rounded-lg px-5 py-3">
            <p className="text-3xl text-blue-500">12</p>
            <p className="text-md text-text-secondary ">
              {translation.profileModal.cardActive}
            </p>
          </div>
          <div className="flex flex-col items-center text-sm w-4/12 lg:w-4/12 text-gray-500 border border-gray-500 rounded-lg px-5 py-3">
            <p className="text-3xl text-yellow-500">5</p>
            <p className="text-md text-text-secondary ">
              {translation.profileModal.cardAssigned}
            </p>
          </div>
          <div className="flex flex-col items-center text-sm w-5/13 lg:w-4/12 text-gray-500 border border-gray-500 rounded-lg px-5 py-3">
            <p className="text-3xl text-green-500">1</p>
            <p className="text-md text-text-secondary ">
              {translation.profileModal.cardClosed}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center px-6 lg:px-8 py-3 mb-2 rounded-lg border border-gray-500">
          <p className="text-sm text-text-secondary my-1">
            {translation.profileModal.email}:{" "}
            <span className="text-text-primary pl-3">{email}</span>
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
            <span className="text-text-primary pl-3">23.03.2026</span>
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
