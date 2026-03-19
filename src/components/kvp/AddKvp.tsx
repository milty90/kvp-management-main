import ColorButton from "../buttons/ColorButton";

interface AddKvpProps {
  onClose: () => void;
}

export default function AddKvp({ onClose }: AddKvpProps) {
  return (
    <div className="fixed inset-0 z-50 bg-gray-700/80 shadow-md flex items-center justify-center">
      <div className="px-6 py-4 bg-white rounded-lg shadow-md w-120 relative">
        <button
          className="absolute top-3 right-4 text-3xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl text-gray-700 font-semibold  mt-4">
          Neuen KVP hinzufügen
          <img
            src="/spark-logo.png"
            alt="Add"
            className="inline-block h-6 w-6 mb-3 object-cover"
          />
        </h2>

        <p className="text-xs text-gray-500 mb-4">
          Bitte füllen Sie alle Pflichtfelder aus.
        </p>
        <form className="flex flex-col items-start gap-4">
          <span className="text-sm pl-1 -mb-3 text-gray-500">Titel *</span>
          <input
            type="text"
            placeholder="Titel"
            className="w-full border text-sm border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm pl-1 -mb-3 text-gray-500">
            Beschreibung *
          </span>
          <textarea
            placeholder="Beschreibung"
            className="w-full border text-sm border-gray-300 h-30 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 items-center mt-3 gap-4 w-full">
            <div className="flex flex-col items-start gap-4">
              <span className="text-xs pl-1 -mb-3 text-gray-500">
                Kategorie *
              </span>
              <input
                type="text"
                placeholder="Kategorie"
                className="text-xs w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              />
              <span className="text-xs pl-1 -mb-3 text-gray-500">
                PCDA-Phase *
              </span>
              <select className="text-xs w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400">
                <option value="">PCDA-Phase</option>
                <option value="Plan">Plan</option>
                <option value="Do">Do</option>
                <option value="Check">Check</option>
                <option value="Act">Act</option>
              </select>
              <span className="text-xs pl-1 -mb-3 text-gray-500">
                Zugewiesen an
              </span>
              <input
                type="text"
                placeholder="Zugewiesen an"
                className="text-xs w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <span className="text-xs pl-1 -mb-3 text-gray-500">
                Zieldatum
              </span>
              <input
                type="date"
                placeholder="Zieldatum"
                className="text-xs w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              />
              <span className="text-xs pl-1 -mb-3 text-gray-500">
                Priorität *
              </span>
              <select className="text-xs w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400">
                <option className="placeholder:text-gray-400" value="">
                  Priorität
                </option>
                <option value="High">Hoch</option>
                <option value="Medium">Mittel</option>
                <option value="Low">Niedrig</option>
              </select>
              <span className="text-xs pl-1 -mb-3 text-gray-500">
                Erwarteter Nutzen
              </span>
              <input
                type="text"
                placeholder="z.B 30% Zeitersparnis"
                className="text-xs w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="border-t border-gray-200 w-full mt-3" />
          <div className="flex w-full items-center justify-end gap-2  my-2">
            <ColorButton color="gray" icon="" onClick={onClose}>
              Abbrechen
            </ColorButton>
            <ColorButton color="blue" icon="/add.svg">
              KVP hinzufügen
            </ColorButton>
          </div>
        </form>
      </div>
    </div>
  );
}
