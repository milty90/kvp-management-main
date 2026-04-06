import ColorButton from "../buttons/ColorButton";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialogItem({
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700/30">
      <div className="bg-amber-100 border border-amber-300 min-w-md rounded-md px-6 py-4 shadow-lg">
        <h2 className="text-lg text-gray-700 font-semibold mb-2">{title}</h2>
        <p className=" text-gray-600 text-center pt-1 text-sm">{message}</p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-700"
          >
            {cancelButtonText || "Abbrechen"}
          </button>
          <ColorButton onClick={onConfirm} color="red">
            {confirmButtonText || "Bestätigen"}
          </ColorButton>
        </div>
      </div>
    </div>
  );
}
