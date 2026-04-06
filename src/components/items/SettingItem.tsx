interface SettingItemProps {
  onSetting: () => void;
  onProfile: () => void;
  onLogout: () => void;
}
export function SettingItem({
  onSetting,
  onProfile,
  onLogout,
}: SettingItemProps) {
  return (
    <div className="relative z-10 flex flex-col items-start">
      <div className="flex flex-col text-stone-600 absolute top-full bg-stone-50 shadow-md -right-3 z-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <button
          onClick={onSetting}
          className="p-2 text-shadow-mauve-50 text-start hover:bg-gray-200 hover:text-blue-600 rounded hover:scale-95 transition-transform duration-150"
        >
          Einstellungen
        </button>
        <button
          onClick={onProfile}
          className="p-2 text-shadow-mauve-50 text-start hover:bg-gray-200 hover:text-blue-600 rounded hover:scale-95 transition-transform duration-150"
        >
          Profile
        </button>
        <button
          onClick={onLogout}
          className="p-2 text-shadow-mauve-50 text-start hover:bg-gray-200 hover:text-red-600 rounded hover:scale-95 transition-transform duration-150"
        >
          Abmelden
        </button>
      </div>
    </div>
  );
}
