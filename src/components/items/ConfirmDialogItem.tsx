import { useTheme } from "../../context/ThemeContext";
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
  const { theme } = useTheme();
  return (
    <div
      className={`fixed z-30 inset-0 flex items-center justify-center ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-500/30"}`}
    >
      <div
        className={`bg-amber-100 border border-amber-300 rounded-md px-6 py-4 shadow-lg ${theme === "dark" ? "bg-card border-gray-500" : "bg-amber-100 border-amber-300"}`}
      >
        <h2
          className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          {title}
        </h2>
        <p
          className={`text-sm pt-1 pl-2 pr-4 text-center ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          {message}
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className={` px-4 py-2 rounded-md text-sm font-medium ${theme === "dark" ? "text-gray-300 hover:bg-gray-500/50 hover:text-gray-100" : "text-gray-700 hover:bg-gray-200 focus:text-gray-700"} focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
          >
            {cancelButtonText || "Abbrechen"}
          </button>
          <ColorButton onClick={onConfirm} color="red" isTextOnly={true}>
            {confirmButtonText || "Bestätigen"}
          </ColorButton>
        </div>
      </div>
    </div>
  );
}
