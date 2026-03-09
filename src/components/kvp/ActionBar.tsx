function ActionBar() {
  return (
    <div className="flex items-center gap-2 w-full bg-white p-4 rounded-lg shadow-lg justify-between">
      <div className="flex bg-gray-200 items-center px-2 py-1.5 gap-4 rounded-2xl">
        <button className="px-3 py-1 text-sm bg-white text-gray-700 rounded-xl flex items-center gap-2">
          Alle
        </button>
        <button className="px-3 py-1 text-sm text-gray-700 rounded-xl flex items-center gap-2">
          Plan
        </button>
        <button className="px-3 py-1 text-sm  text-gray-700 rounded-xl flex items-center gap-2">
          Do
        </button>
        <button className="px-3 py-1 text-sm text-gray-700 rounded-xl flex items-center gap-2">
          Check
        </button>
        <button className="px-3 py-1 text-sm text-gray-700 rounded-xl flex items-center gap-2">
          Act
        </button>
        <button className="px-3 py-1 text-sm text-gray-700 rounded-xl flex items-center gap-2">
          Abgelehnt
        </button>
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
        <img src="/add.svg" alt="Icon" className="h-4 w-4" />
        Neue Verbesserung
      </button>
    </div>
  );
}
export default ActionBar;
