interface SettingsModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export function SettingsModal({ onConfirm, onClose }: SettingsModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700/30">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Einstellungen</h2>
        {/* Hier können weitere Einstellungselemente hinzugefügt werden */}
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => {
            onConfirm();
          }}
        >
          Speichern
        </button>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            onClose();
          }}
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
