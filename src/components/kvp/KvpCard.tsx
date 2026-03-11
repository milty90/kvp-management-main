import ColorButton from "../buttons/ColorButton";

function KvpCard() {
  return (
    <div className="bg-white p-4 text-left rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold ">Verbesserungstitel</h2>
        <img
          src="/more.svg"
          alt="More"
          className="h-6 w-6 rounded-full object-cover"
        />
      </div>

      <p className="text-gray-500 text-xl mb-3">Kategorie</p>

      <div className=" py-1 text-sm rounded-xl flex items-center gap-3 mb-3">
        <div className="px-3 py-1 text-xs bg-blue-200 text-gray-700 rounded-xl flex items-center gap-2">
          Plan
        </div>
        <div className="px-3 py-1 text-xs bg-red-200 text-gray-700 rounded-xl flex items-center gap-2">
          Hoch
        </div>
      </div>

      <p className="font-normal text-sm mb-3">Zugewiesen: Anne Lang</p>

      <p className="text-gray-500 text-xs mb-4">
        Kurze Beschreibung der Verbesserung. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-gray-500">Status: Plan</span>

        <ColorButton color="green" height="1" icon="">
          Details
        </ColorButton>
      </div>
      <div className="mt-4 items-center border-t border-gray-300 w-full gap-2"></div>
      <div className="flex flex-col items-start justify-between mt-2">
        <span className="text-xs py-0.5 text-gray-500">
          <img
            src="/user.svg"
            alt="User"
            className="h-4 w-4 rounded-full object-cover inline-block mr-1.5 mb-1"
          />
          Max Mustermann
        </span>
        <span className="text-xs py-0.5 text-gray-500">
          <img
            src="/target.svg"
            alt="Target"
            className="h-4 w-4 rounded-full object-cover inline-block mr-1.5 mb-1"
          />
          Zieldatum: 05.01.2024
        </span>
        <span className="text-xs py-0.5 text-gray-500">
          <img
            src="/calender.svg"
            alt="Calender"
            className="h-4 w-4 rounded-full object-cover inline-block mr-1.5 mb-1"
          />
          Erstellt: 01.01.2024
        </span>
      </div>
    </div>
  );
}
export default KvpCard;
