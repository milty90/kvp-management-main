interface MenuItemProps {
  onArchive: () => void;
  onReject: () => void;
  onDelete: () => void;
}

export function MenuItem({ onArchive, onReject, onDelete }: MenuItemProps) {
  return (
    <div className="relative z-10 flex flex-col items-start">
      <div className="flex flex-col text-stone-600 absolute top-full bg-stone-50 -right-3 z-2 p-1 border border-gray-300 rounded-md focus:outline-none">
        <button
          onClick={onArchive}
          className="p-2 text-sm hover:bg-gray-200 hover:text-blue-600  rounded"
        >
          Archivieren
        </button>
        <button
          onClick={onReject}
          className="p-2 text-sm hover:bg-gray-200 hover:text-blue-600 rounded"
        >
          Ablehnen
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-sm  hover:bg-gray-200 hover:text-red-600 rounded"
        >
          Löschen
        </button>
      </div>
    </div>
  );
}

export default MenuItem;
