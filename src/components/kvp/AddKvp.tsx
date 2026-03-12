import ColorButton from "../buttons/ColorButton";

export default function AddKvp() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-120">
      <h2 className="text-xl text-gray-700 font-semibold mb-2">
        Neuen KVP hinzufügen
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        Bitte füllen Sie alle Pflichtfelder aus.
      </p>
      <form className="flex flex-col items-start gap-4">
        <span className="text-sm -mb-3 text-gray-500">Titel *</span>
        <input
          type="text"
          placeholder="Titel"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-sm -mb-3 text-gray-500">Beschreibung *</span>
        <textarea
          placeholder="Beschreibung"
          className="w-full border border-gray-300 h-30 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="grid grid-cols-2 items-center gap-4 w-full">
          <div className="flex flex-col items-start gap-4">
            <span className="text-sm -mb-3 text-gray-500">Kategorie</span>
            <input
              type="text"
              placeholder="Kategorie"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm -mb-3 text-gray-500">PCDA-Phase *</span>
            <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">PCDA-Phase</option>
              <option value="Plan">Plan</option>
              <option value="Do">Do</option>
              <option value="Check">Check</option>
              <option value="Act">Act</option>
            </select>
            <span className="text-sm -mb-3 text-gray-500">Zugewiesen an</span>
            <input
              type="text"
              placeholder="Zugewiesen an"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <span className="text-sm -mb-3 text-gray-500">Zieldatum</span>
            <input
              type="date"
              placeholder="Zieldatum"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm -mb-3 text-gray-500">Priorität *</span>
            <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Priorität</option>
              <option value="Hoch">Hoch</option>
              <option value="Mittel">Mittel</option>
              <option value="Niedrig">Niedrig</option>
            </select>
            <span className="text-sm -mb-3 text-gray-500">
              Erwarteter Nutzen
            </span>
            <input
              type="text"
              placeholder="z.B 30% Zeitersparnis"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="border-t border-gray-200 w-full" />
        <div className="flex w-full items-center justify-end gap-2  my-2">
          <ColorButton color="gray" icon="">
            Abbrechen
          </ColorButton>
          <ColorButton color="green" icon="/add.svg">
            KVP hinzufügen
          </ColorButton>
        </div>
      </form>
    </div>
  );
}
