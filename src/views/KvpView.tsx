import TopBar from "../components/layout/TopBar";
import ActionBar from "../components/layout/ActionBar";
import KvpBar from "../components/layout/KvpBar";
import KvpCycleBar from "../components/layout/KvpCycleBar";
import { useState } from "react";
import { ArchiveBar } from "../components/layout/ArchiveBar";
import { useTheme } from "../context/ThemeContext";

interface KvpViewProps {
  onOpenModal: () => void;
}

function KvpView({ onOpenModal }: KvpViewProps) {
  const [showArchive, setShowArchive] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [activePriority, setActivePriority] = useState("Alle");
  const { theme } = useTheme();

  return (
    <div className="flex flex-col px-2 pt-0 md:px-8 pb-0 md:pt-8 items-center bg-background gap-3 h-screen">
      <TopBar
        kvpButtonColor={theme === "dark" ? "green" : "blue"}
        statButtonColor="gray"
        kvpBar={<KvpCycleBar />}
      />
      <ActionBar
        isArchiveOpen={showArchive}
        onFilter={setActiveFilter}
        onPriority={setActivePriority}
        onOpenModal={() => onOpenModal()}
        onOpenArchive={() => setShowArchive((prev) => !prev)}
      />
      {showArchive ? (
        <ArchiveBar />
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
