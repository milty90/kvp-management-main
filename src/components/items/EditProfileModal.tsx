import { useRef, useState } from "react";

interface EditProfileModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EditProfileModal({
  onConfirm,
  onCancel,
}: EditProfileModalProps) {
  const [preview, setPreview] = useState<string>("/face-id.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-700/50">
      <div className="bg-surface px-6 pt-6 md:py-5 md:rounded-xl shadow-lg w-full h-full md:h-auto max-w-xl relative">
        <h2 className="text-xl font-bold pl-1">Edit Profile</h2>
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
              className="relative w-26 rounded-full border-green-700 border-2 p-1 object-cover"
              src={preview}
              alt="Profile"
            />
            <img
              className="absolute top-18 left-18 bg-green-700 z-10 w-8 h-8 p-1.5 rounded-full object-cover cursor-pointer"
              src="/camera-light.svg"
              alt="Profile"
              onClick={() => fileInputRef.current?.click()}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>
          <div className="flex flex-col bg-card p-3 min-w-90 rounded-lg border border-border">
            <label className="text-sm text-text-primary mb-1">Username</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-surface text-text-primary"
              placeholder="Enter your username"
            />
          </div>
        </div>

        <div className="flex flex-col px-2 py-4 gap-4 ">
          <div className="flex bg-gray-500 px-3  py-2  gap-2 rounded-lg border border-border">
            <div className="flex flex-col w-full mb-1">
              <label className="text-sm text-text-primary mb-1">
                First Name
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-surface text-text-primary"
                placeholder="Enter your first name"
              />{" "}
            </div>
            <div className="flex flex-col w-full mb-1 ">
              <label className="text-sm text-text-primary mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-surface text-text-primary"
                placeholder="Enter your last name"
              />{" "}
            </div>
          </div>

          <div className="flex bg-gray-500 px-3  py-2  gap-2 rounded-lg border border-border">
            <div className="flex flex-col w-full mb-1">
              <label className="text-sm text-text-primary mb-1">
                Department
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-surface text-text-primary"
                placeholder="Enter your department"
              />{" "}
            </div>
            <div className="flex flex-col w-full mb-1 ">
              <label className="text-sm text-text-primary mb-1">Role</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-surface text-text-primary"
                placeholder="Enter your role"
              />{" "}
            </div>
          </div>

          <div className="flex flex-col bg-card p-2.5  rounded-xl border border-border">
            <label className="text-sm text-text-primary pl-1 mb-1 -mt-0.5">
              About Me
            </label>
            <textarea
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-surface text-text-primary"
              placeholder="Tell us about yourself"
              rows={4}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col px-5">
          <button
            onClick={onConfirm}
            className="mt-3  py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="my-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
