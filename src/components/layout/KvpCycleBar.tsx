import CycleCard from "../cards/CycleCard";

interface KvpCycleBarProps {
  planQuantity: number;
  doQuantity: number;
  checkQuantity: number;
  actQuantity: number;
}

export default function KvpCycleBar({
  planQuantity,
  doQuantity,
  checkQuantity,
  actQuantity,
}: KvpCycleBarProps) {
  return (
    <div className="w-full p-4 pt-0 rounded-b-2xl  bg-white text-gray-800 flex items-center justify-between gap-3">
      <CycleCard
        color="yellow"
        label="Plan"
        letter="P"
        quantity={planQuantity}
      />
      <CycleCard color="blue" label="Do" letter="D" quantity={doQuantity} />
      <CycleCard
        color="violet"
        label="Check"
        letter="C"
        quantity={checkQuantity}
      />
      <CycleCard color="green" label="Act" letter="A" quantity={actQuantity} />
    </div>
  );
}
