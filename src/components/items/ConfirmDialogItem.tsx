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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-amber-100 border border-amber-300 rounded-md p-4 shadow-lg">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="buttons">
          <button onClick={onConfirm} className="confirm-button">
            Bestätigen
          </button>
          <button onClick={onCancel} className="cancel-button">
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
}
