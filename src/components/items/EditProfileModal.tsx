import { useRef, useState } from "react";
import ColorButton from "../buttons/ColorButton";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "../../utils/useTranslation";
import { useUserContext } from "../../context/UserContext";
import type { User } from "../../types";
import { supabase } from "../../utils/supabase";
import { showToast } from "./ToastItem";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { logActivity } from "../../storage/kvpDatabase";

interface EditProfileModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  initialData?: User;
}

export default function EditProfileModal({
  onConfirm,
  onCancel,
  initialData,
}: EditProfileModalProps) {
  const [preview, setPreview] = useState<string>(
    initialData?.photoUrl || "/face-id.png",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const translations = useTranslation();
  const [userName, setUserName] = useState(initialData?.userName || "");
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");
  const [department, setDepartment] = useState(initialData?.department || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [aboutMe, setAboutMe] = useState(initialData?.aboutMe || "");
  const [photoUrl, setPhotoUrl] = useState(initialData?.photoUrl || "");
  const updateUser = useUserContext().updateUser;
  const user = useUserContext().user;
  const width = useWindowWidth();

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    setPreview(URL.createObjectURL(file));

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) {
      console.error("Error uploading avatar:", error);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    setPhotoUrl(data.publicUrl);
  }

  function handleConfirm() {
    updateUser({
      userId: user?.id || "",
      userName: userName,
      firstName,
      lastName,
      department,
      role,
      aboutMe,
      photoUrl,
      userEmail: user?.email || "",
      createdAt: user?.created_at || "",
      lastSignIn: user?.last_sign_in_at || "",
    });
    logActivity({
      id: Date.now().toString(),
      userId: user?.id || "",
      userName: user?.email || "Unknown User",
      action: "UPDATED",
      entityType: "USER",
      entityId: user?.id || "",
      details: `User ${userName} updated their profile.`,
      timestamp: new Date().toISOString(),
    });
    onConfirm();
    showToast(
      width,
      theme,
      "success",
      translations.editProfileModal.toastMessage,
    );
  }

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-700/50">
      <div className="bg-surface px-6 pt-6 md:py-5 md:rounded-xl shadow-lg w-full h-full md:h-auto max-w-xl relative">
        <h2 className="text-xl font-bold pl-1">
          {translations.editProfileModal.title}
        </h2>
        <button
          type="button"
          className="absolute top-4 right-6 text-3xl bg-ground-600/80 text-secondary hover:text-text-primary"
          onClick={onCancel}
        >
          &times;
        </button>
        <div className="border-t border-border my-4"></div>

        <div className="flex items-center justify-between px-2">
          <div className="relative flex  items-center justify-center">
            <img
              className={`relative w-26 rounded-full ${theme === "dark" ? "border-border" : "border-gray-400/80"} border-2 p-1 object-cover`}
              src={preview}
              alt="Profile"
            />
            <img
              className={`absolute top-18 left-18 ${theme === "dark" ? "bg-green-700" : "bg-blue-600"} z-10 w-8 h-8 p-1.5 rounded-full object-cover cursor-pointer`}
              src="/camera-light.svg"
              alt="Profile"
              onClick={() => fileInputRef.current?.click()}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div
            className={`flex flex-col ${theme === "dark" ? "bg-card" : "bg-gray-100"} p-2.5 w-3/5 rounded-lg border border-border`}
          >
            <label className="text-sm text-text-primary pl-1 mb-1 -mt-0.5">
              {translations.editProfileModal.username}
            </label>
            <input
              type="text"
              className={`text-xs md:text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} bg-surface text-text-primary`}
              placeholder={translations.editProfileModal.userNamePlaceholder}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:px-2 py-4 gap-4 ">
          <div
            className={`flex ${theme === "dark" ? "bg-card" : "bg-gray-100"} px-2.5 pt-2 pb-1 gap-3 rounded-lg border border-border`}
          >
            <div className="flex flex-col flex-1 min-w-0 mb-1">
              <label className="text-sm text-text-primary pl-1 mb-1">
                {translations.editProfileModal.firstName}
              </label>
              <input
                type="text"
                className={`text-xs md:text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} bg-surface text-text-primary w-full`}
                placeholder={translations.editProfileModal.firstNamePlaceholder}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0 mb-1">
              <label className="text-sm text-text-primary pl-1 mb-1">
                {translations.editProfileModal.lastName}
              </label>
              <input
                type="text"
                className={`text-xs md:text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} bg-surface text-text-primary w-full`}
                placeholder={translations.editProfileModal.lastNamePlaceholder}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div
            className={`flex ${theme === "dark" ? "bg-card" : "bg-gray-100"} px-2.5 pt-2 pb-1 gap-3 rounded-lg border border-border`}
          >
            <div className="flex flex-col flex-1 min-w-0 mb-1">
              <label className="text-sm text-text-primary pl-1 mb-1">
                {translations.editProfileModal.department}
              </label>
              <input
                type="text"
                className={`text-xs md:text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} bg-surface text-text-primary w-full`}
                placeholder={
                  translations.editProfileModal.departmentPlaceholder
                }
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0 mb-1">
              <label className="text-sm text-text-primary pl-1 mb-1">
                {translations.editProfileModal.role}
              </label>
              <input
                type="text"
                className={`text-xs md:text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} bg-surface text-text-primary w-full`}
                placeholder={translations.editProfileModal.rolePlaceholder}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>

          <div
            className={`flex flex-col ${theme === "dark" ? "bg-card" : "bg-gray-100"} p-2.5  rounded-xl border border-border`}
          >
            <label className="text-sm text-text-primary pl-1 mb-1 -mt-0.5">
              {translations.editProfileModal.aboutMe}
            </label>
            <textarea
              className={`text-xs md:text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} bg-surface text-text-primary`}
              placeholder={translations.editProfileModal.aboutMePlaceholder}
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              rows={4}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-row-reverse px-5 gap-3">
          <ColorButton onClick={handleConfirm} color="blue" isTextOnly={true}>
            {translations.editProfileModal.saveButton}
          </ColorButton>
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-md text-sm font-medium ${theme === "dark" ? " text-text-secondary hover:text-text-primary hover:bg-gray-700/80" : "text-text-secondary hover:text-text-primary hover:bg-gray-300/80"} transition-colors duration-150`}
          >
            {translations.editProfileModal.cancelButton}
          </button>
        </div>
      </div>
    </div>
  );
}
