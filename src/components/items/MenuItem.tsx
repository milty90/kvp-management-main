interface MenuItemProps {
  onEdit: () => void;
  onArchive: () => void;
  onReject: () => void;
  onDelete: () => void;
}

export function MenuItem({
  onEdit,
  onArchive,
  onReject,
  onDelete,
}: MenuItemProps) {
  return (
    <div className="relative z-10 flex flex-col items-start">
      <div className="flex flex-col text-stone-600 absolute top-full bg-stone-50 -right-3 z-2 p-1 border border-gray-300 rounded-md focus:outline-none">
        <button
          onClick={onEdit}
          className="p-2 text-sm w-full hover:bg-gray-200 hover:text-blue-600  rounded hover:scale-95 transition-transform duration-250"
        >
          Bearbeiten
        </button>
        <button
          onClick={onArchive}
          className="p-2 text-sm w-full hover:bg-gray-200 hover:text-blue-600  rounded hover:scale-95 transition-transform duration-250"
        >
          Archivieren
        </button>
        <button
          onClick={onReject}
          className="p-2 text-sm w-full hover:bg-gray-200 hover:text-blue-600 rounded hover:scale-95 transition-transform duration-250"
        >
          Ablehnen
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-sm w-full hover:bg-gray-200 hover:text-red-600 rounded hover:scale-95 transition-transform duration-250"
        >
          Löschen
        </button>
      </div>
    </div>
  );
}

export default MenuItem;
