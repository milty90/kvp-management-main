import ColorButton from "../buttons/ColorButton";
interface SettingsModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function SettingsModal({ onConfirm, onCancel }: SettingsModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700/30">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Einstellungen</h2>
        <div className="flex items-center justify-center h-30 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-xs text-gray-500"></p>
        </div>
        <div className="flex items-center justify-center h-30 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-xs text-gray-500">Keine Elemente</p>
        </div>
        <div className="flex items-center justify-center h-30 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-xs text-gray-500">Keine Elemente</p>
        </div>
        <div className="flex items-center justify-center h-30 mb-2 rounded-lg border border-dashed border-gray-300">
          <p className="text-xs text-gray-500">Keine Elemente</p>
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
