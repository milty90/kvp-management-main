interface MenuItemProps {
  onArchive: () => void;
  onReject: () => void;
  onDelete: () => void;
}

export function MenuItem({ onArchive, onReject, onDelete }: MenuItemProps) {
  return (
    <div className="relative z-10 flex flex-col items-start">
      <div className="flex flex-col absolute top-full bg-amber-50 -right-3 z-2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <button
          onClick={onArchive}
          className="p-2 text-sm hover:bg-gray-200 hover:text-amber-800  rounded"
        >
          Archivieren
        </button>
        <button
          onClick={onReject}
          className="p-2 text-sm hover:bg-gray-200 hover:text-amber-800 rounded"
        >
          Ablehnen
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-sm  text-red-600 hover:bg-gray-200 hover:text-red-700 rounded"
        >
          Löschen
        </button>
      </div>
    </div>
  );
}

export default MenuItem;
