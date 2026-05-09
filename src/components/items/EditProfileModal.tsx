interface EditProfileModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EditProfileModal({
  onConfirm,
  onCancel,
}: EditProfileModalProps) {
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

        <div className="flex flex-col  w-fit p-2 gap-4 ">
          <img
            className=" w-26 rounded-full border-amber-200 border-2 p-1 object-cover"
            src="/face-id.png"
            alt="Profile"
          />
          <img
            className="absolute w-8 left-25 top-41 rounded-full bg-green-700 border-2 p-2 object-cover"
            src="/camera-light.svg"
            alt="Profile"
          />
        </div>

        <div className="flex flex-col px-2 py-4 gap-4 ">
          <div className="flex flex-col bg-card p-3 rounded-lg border border-border">
            <label className="text-sm text-text-primary mb-1">Username</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-surface text-text-primary"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex bg-yellow-500 px-3  py-2  gap-2 rounded-lg border border-border">
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

          <div className="flex flex-col bg-card p-3  rounded-lg border border-border">
            <label className="text-sm text-text-primary mb-1">About Me</label>
            <textarea
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-surface text-text-primary"
              placeholder="Tell us about yourself"
              rows={4}
            ></textarea>
          </div>
          <div className="flex flex-col bg-card p-3 rounded-lg border border-border">
            <label className="text-sm text-text-primary mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-surface text-text-primary"
            />
          </div>
        </div>
        <button
          onClick={onConfirm}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        {/* Add form fields for editing profile here */}
      </div>
    </div>
  );
}
