import TopBar from "../components/layout/TopBar";
import ActionBar from "../components/kvp/ActionBar";
import KvpCard from "../components/kvp/KvpCard";

function KvpView() {
  return (
    <div className="flex flex-col items-center bg-gray-100 gap-4 h-full overflow-hidden">
      <TopBar />
      <ActionBar />
      <div className="grid grid-cols-4 w-full p-4 rounded-lg bg-white text-gray-800 gap-3 overflow-y-auto flex-1 scrollbar-none">
        <KvpCard />
        <KvpCard />
        <KvpCard />
        <KvpCard />
        <KvpCard />
        <KvpCard />
        <KvpCard />
        <KvpCard />
      </div>
    </div>
  );
}

export default KvpView;
