import ColorButton from "../Buttons/ColorButton";

function TopBar() {
  return (
    <div className="flex flex-col w-full shadow-lg rounded-2xl">
      <div className="w-full p-4 rounded-t-2xl bg-white text-white flex items-center justify-between">
        <div className="flex flex-col items-center justify-center  ml-2">
          <img src="/spark.png" alt="Logo" className=" h-12  mt-3 mb-0" />
          <p className="text-black font-extralight font-poppins tracking-tight text-lg">
            KVP Management System
          </p>
        </div>
        <div className="flex items-start space-x-4 mr-4 mb-2">
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
        <div className="flex w-full items-center justify-between p-4 h-22 gap-12 rounded-xl border-yellow-300/60 border shadow-md bg-[#fff7D9]">
          <div className="px-1 py-2 flex flex-col items-start text-yellow-900 gap-1">
            <p className="text-3xl font-semibold">2</p>
            <p className="font-medium text-yellow-700">Plan</p>
          </div>
          <div className="px-4 py-2 rounded-3xl bg-yellow-300/60 text-yellow-900 flex flex-row items-end">
            <p className="text-2xl font-semibold">P</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between p-4 h-22  gap-12 rounded-xl border-blue-300/50 border shadow-md bg-[#E6F1FF]">
          <div className="px-1 py-2 flex flex-col items-start text-blue-900 gap-1">
            <p className="text-3xl font-semibold">2</p>
            <p className="font-medium text-blue-700">Do</p>
          </div>
          <div className="px-4 py-2 rounded-3xl bg-blue-300/50 text-blue-900 flex flex-row items-end">
            <p className="text-2xl font-semibold">D</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between p-4 h-22 gap-12 rounded-xl border-purple-300/50 border shadow-md bg-[#F6EEFF]">
          <div className="px-1 py-2 flex flex-col items-start text-purple-900 gap-1">
            <p className="text-3xl font-semibold">2</p>
            <p className="font-medium text-purple-700">Check</p>
          </div>
          <div className="px-4 py-2 rounded-3xl bg-purple-300/50 text-purple-900 flex flex-row items-end">
            <p className="text-2xl font-semibold">C </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between p-4 h-22 gap-12 rounded-xl border-green-300/50 border shadow-md bg-[#E6FDEE]">
          <div className="px-1 py-2 flex flex-col items-start text-green-900 gap-1">
            <p className="text-3xl font-semibold">2</p>
            <p className="font-medium text-green-700">Act</p>
          </div>
          <div className="px-4 py-2 rounded-3xl bg-green-300/50  text-green-900 flex flex-col items-start">
            <p className="text-2xl font-semibold">A</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
