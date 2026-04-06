import ColorButton from "../buttons/ColorButton";
interface SettingsModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function SettingsModal({ onConfirm, onCancel }: SettingsModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700/50">
      <div className="bg-white px-6 py-5 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-bold pl-1 mb-4">Einstellungen</h2>
        <div className="flex items-center justify-start pl-8 h-30 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-sm text-gray-500">Dark Mode</p>
        </div>
        <div className="flex items-center justify-start pl-8 h-30 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-sm text-gray-500">Weitere Einstellungen</p>
        </div>
        <div className="flex items-center justify-start pl-8 h-30 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-sm text-gray-500">Weitere Einstellungen</p>
        </div>
        <div className="flex items-center justify-start pl-8 h-30 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-sm text-gray-500">Weitere Einstellungen</p>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-700"
          >
            Abbrechen
          </button>
          <ColorButton onClick={onConfirm} color="blue">
            Speichern
          </ColorButton>
        </div>
      </div>
    </div>
  );
}
