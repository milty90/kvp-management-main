import ColorButton from "../buttons/ColorButton";

export function ConfirmDialogItem({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700/50">
      <div className="bg-amber-100 border border-amber-300 rounded-md px-8 py-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p>{message}</p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-700"
          >
            Abbrechen
          </button>
          <ColorButton onClick={onConfirm} color="red">
            Bestätigen
          </ColorButton>
        </div>
      </div>
    </div>
  );
}
