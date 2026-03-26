interface MenuItemProps {
  onArchive: () => void;
  onReject: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export function MenuItem({
  onArchive,
  onReject,
  onDelete,
  onClose,
}: MenuItemProps) {
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
      <div className="absolute m-0 -top-2 -right- p-3 justify-center items-center bg-blue-500 transform rounded-full z-3 hover:scale-110 transition-transform">
        <button
          type="button"
          className="absolute z-4 top-1 right-1 text-2xl text-white "
          onClick={onClose}
        >
          <img
            src="/add.svg"
            alt="Close"
            className="h-4 w-4 object-cover rotate-45"
          />
        </button>
      </div>
    </div>
  );
}

export default MenuItem;
