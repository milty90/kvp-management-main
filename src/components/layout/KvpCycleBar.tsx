import CycleCard from "../cards/CycleCard";

import { useKvpContext } from "../../context/KvpContext";

export default function KvpCycleBar() {
  const { kvps } = useKvpContext();
  const planQuantity = kvps.filter((k) => k.state === "Plan").length;
  const doQuantity = kvps.filter((k) => k.state === "Do").length;
  const checkQuantity = kvps.filter((k) => k.state === "Check").length;
  const actQuantity = kvps.filter((k) => k.state === "Act").length;

  return (
    <div className="w-full p-2.5 pt-0 rounded-b-2xl bg-surface text-text-primary flex items-center justify-between gap-3">
      <CycleCard color="blue" label="Plan" letter="P" quantity={planQuantity} />
      <CycleCard color="violet" label="Do" letter="D" quantity={doQuantity} />
      <CycleCard
        color="yellow"
        label="Check"
        letter="C"
        quantity={checkQuantity}
      />
      <CycleCard color="green" label="Act" letter="A" quantity={actQuantity} />
    </div>
  );
}
