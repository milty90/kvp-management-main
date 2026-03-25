const MenuItem = (
  onArchive: () => void,
  onReject: () => void,
  onDelete: () => void,
) => {
  return (
    <div className="flex flex-col absolute top-full right-0 mt-1 z-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      <button onClick={onArchive} className="p-2 hover:bg-gray-200 rounded">
        Archivieren
      </button>
      <button onClick={onReject} className="p-2 hover:bg-gray-200 rounded">
        Ablehnen
      </button>
      <button onClick={onDelete} className="p-2 hover:bg-gray-200 rounded">
        Löschen
      </button>
    </div>
  );
};

export default MenuItem;
