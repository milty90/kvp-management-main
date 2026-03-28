import TopBar from "../components/layout/TopBar";
import ActionBar from "../components/layout/ActionBar";
import KvpBar from "../components/layout/KvpBar";
import KvpCycleBar from "../components/layout/KvpCycleBar";
import { useState } from "react";
import { ArchiveBar } from "../components/layout/ArchiveBar";

interface KvpViewProps {
  onOpenModal: () => void;
}

function KvpView({ onOpenModal }: KvpViewProps) {
  const [showArchive, setShowArchive] = useState(false);

  return (
    <div className="flex flex-col px-8 pb-0 pt-8 items-center bg-gray-100 gap-3 h-screen">
      <TopBar
        kvpButtonColor="blue"
        statButtonColor="gray"
        kvpBar={<KvpCycleBar />}
      />
      <ActionBar
        onOpenModal={() => onOpenModal()}
        onOpenArchive={() => setShowArchive((prev) => !prev)}
      />
      {showArchive ? (
        <ArchiveBar />
      ) : (
        <KvpBar onOpenModal={() => onOpenModal()} />
      )}
    </div>
  );
}

export default KvpView;
