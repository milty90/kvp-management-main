interface SettingItemProps {
  onSetting: () => void;
  onProfile: () => void;
  onLogout: () => void;
  onClose: () => void;
}
export function SettingItem({
  onSetting,
  onProfile,
  onLogout,
  onClose,
}: SettingItemProps) {
  return (
    <div className="relative z-10 flex flex-col items-start">
      <div className="flex flex-col text-gray-500 absolute top-full bg-amber-50 -right-3 z-2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <button
          onClick={onSetting}
          className="p-2 text-shadow-mauve-50 hover:bg-gray-200 hover:text-amber-800  rounded"
        >
          Settings
        </button>
        <button
          onClick={onProfile}
          className="p-2 text-shadow-mauve-50 hover:bg-gray-200 hover:text-amber-800 rounded"
        >
          Profil
        </button>
        <button
          onClick={onLogout}
          className="p-2 text-shadow-mauve-50 text-red-600 hover:bg-gray-200 hover:text-red-700 rounded"
        >
          Abmelden
        </button>
      </div>
      <div className="absolute m-0 -top-3 -right-5 p-4 justify-center items-center bg-blue-500 transform rounded-full z-3 hover:scale-110 transition-transform">
        <button
          type="button"
          className="absolute z-4 top-1.5 right-1.5 text-3xl text-white "
          onClick={onClose}
        >
          <img
            src="/add.svg"
            alt="Close"
            className="h-5 w-5 object-cover rotate-45"
          />
        </button>
      </div>
    </div>
  );
}
