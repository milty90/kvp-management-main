import KvpCard from "../kvp/KvpCard";

type KvpBarProps = {
  array: any[];
  states: string[];
};

export default function KvpBar({ array, states }: KvpBarProps) {
  return (
    <div className="grid grid-cols-4 w-full p-4 rounded-lg bg-white text-gray-800 gap-3 overflow-y-auto flex-1 scrollbar-none">
      {states.map((state) => {
        const filtered = array.filter((k) => k.state === state);

        return (
          <div key={state} className="flex flex-col gap-3">
            <div className="flex gap-2 px-2 py-1.5 rounded-lg text-sm font-medium  bg-gray-200/50">
              <span className="text-sm ml-2 font-semibold text-gray-600">
                {state}
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="flex items-center justify-center h-32 rounded-lg border border-dashed border-gray-300">
                <p className="text-xs text-gray-500">Keine Elemente</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((kvp) => (
                  <KvpCard key={kvp.id} {...kvp} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
