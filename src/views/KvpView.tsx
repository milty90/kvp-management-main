import TopBar from "../components/layout/TopBar";
import ActionBar from "../components/layout/ActionBar";
import KvpBar from "../components/layout/KvpBar";
import KvpCycleBar from "../components/layout/KvpCycleBar";

import type { Kvp } from "../types";
import type { State } from "../types";

const STATES: State[] = ["Plan", "Do", "Check", "Act"];

interface KvpViewProps {
  kvps?: Kvp[];
  onOpenModal: () => void;
}

function KvpView({ kvps = [], onOpenModal }: KvpViewProps) {
  return (
    <div className="flex flex-col px-8 pb-0 pt-8 items-center bg-gray-100 gap-4 h-screen">
      <TopBar
        kvpButtonColor="blue"
        statButtonColor="gray"
        kvpBar={
          <KvpCycleBar
            planQuantity={kvps.filter((k) => k.state === "Plan").length}
            doQuantity={kvps.filter((k) => k.state === "Do").length}
            checkQuantity={kvps.filter((k) => k.state === "Check").length}
            actQuantity={kvps.filter((k) => k.state === "Act").length}
          />
        }
      />
      <ActionBar onOpenModal={onOpenModal} />
      <KvpBar array={kvps} states={STATES} />
    </div>
  );
}

export default KvpView;
