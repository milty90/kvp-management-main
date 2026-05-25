import TopBar from "../components/layout/TopBar";
import ActionBar from "../components/layout/ActionBar";
import KvpBar from "../components/layout/KvpBar";
import KvpCycleBar from "../components/layout/KvpCycleBar";
import { useEffect, useState } from "react";
import { ArchiveBar } from "../components/layout/ArchiveBar";
import { useTranslation } from "../utils/useTranslation";

interface KvpViewProps {
  onOpenModal: () => void;
}

function KvpView({ onOpenModal }: KvpViewProps) {
  const translation = useTranslation();
  const [showArchive, setShowArchive] = useState(false);
  const [activeFilter, setActiveFilter] = useState(
    translation.actionBar.startState,
  );
  const [activePriority, setActivePriority] = useState(
    translation.actionBar.startState,
  );

  useEffect(() => {
    setActivePriority(translation.actionBar.startState);
    setActiveFilter(translation.actionBar.startState);
  }, [translation]);

  return (
    <div className="flex flex-col px-2 pt-0 md:px-8 pb-0 md:pt-8 items-center bg-background gap-3 h-screen">
      <TopBar kvpBar={<KvpCycleBar />} />
      <ActionBar
        isArchiveOpen={showArchive}
        activeFilter={activeFilter}
        activePriority={activePriority}
        onFilter={setActiveFilter}
        onPriority={setActivePriority}
        onOpenModal={() => onOpenModal()}
        onOpenArchive={() => setShowArchive((prev) => !prev)}
      />
      {showArchive ? (
        <ArchiveBar
          activeFilter={activeFilter}
          activePriority={activePriority}
          onOpenModal={() => onOpenModal()}
        />
      ) : (
        <KvpBar
          onOpenModal={() => onOpenModal()}
          activeFilter={activeFilter}
          activePriority={activePriority}
        />
      )}
    </div>
  );
}

export default KvpView;
