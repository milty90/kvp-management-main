import ColorButton from "../buttons/ColorButton";
import CycleCard from "../cards/CycleCard";

function TopBar() {
  return (
    <div className="flex flex-col w-full shadow-lg rounded-2xl">
      <div className="w-full p-4 rounded-t-2xl bg-white text-white flex items-center justify-between">
        <div className="flex flex-col items-center justify-center  ml-2">
          <img src="/spark.png" alt="Logo" className=" h-12  mt-3 mb-0" />
          <p className="text-gray-700 font-light font-poppins tracking-tight text-md">
            KVP Management System
          </p>
        </div>
        <div className="flex items-start space-x-4 mr-4">
          <ColorButton color="green" icon="/trending.svg">
            Verbesserungen
          </ColorButton>
          <ColorButton color="gray" icon="/graph.svg">
            Statistik
          </ColorButton>

          <img
            src="/settings.svg"
            alt="Settings"
            className="h-9 w-9 mt-0.5 rounded-full object-cover hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-transform duration-400 ease-in hover:rotate-45 cursor-pointer"
          />
        </div>
      </div>

      <div className="w-full p-4 pt-0 rounded-b-2xl  bg-white text-gray-800 flex items-center justify-between gap-3">
        <CycleCard color="yellow" label="Plan" letter="P" quantity={2} />
        <CycleCard color="blue" label="Do" letter="D" quantity={3} />
        <CycleCard color="violet" label="Check" letter="C" quantity={4} />
        <CycleCard color="green" label="Act" letter="A" quantity={5} />
      </div>
    </div>
  );
}

export default TopBar;
