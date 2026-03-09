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
          <button className="flex px-4 py-2 bg-green-500 hover:bg-green-700 rounded-lg gap-2.5">
            <img src="/trending.svg" alt="Icon" className="h-4 w-4 mt-1  " />
            Verbesserungen
          </button>
          <button className="flex ml-auto px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg gap-2.5">
            <img src="/graph.svg" alt="Icon" className="h-4 w-4 mt-1 " />
            Statistik
          </button>
          <img
            src="/settings.svg"
            alt="Settings"
            className="h-9 w-9 mt-0.5 rounded-full object-cover hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 cursor-pointer"
          />
        </div>
      </div>
      {/* <div className="w-full p-4 pt-0 rounded-b-2xl  bg-white text-gray-800 flex items-center justify-between gap-3">
        <div className="flex w-full items-center justify-between p-4 h-22 gap-12 rounded-xl border-[#FEE685] border bg-[#fff7D9]">
          <div className="px-1 py-2 flex flex-col items-start text-[#7B2206] gap-1">
            <p className="text-3xl font-semibold">2</p>
            <p className="font-medium text-[#bb4d00]">Plan</p>
          </div>
          <div className="px-4 py-2 rounded-3xl bg-[#FEE685] text-[#7B2206] flex flex-row items-end">
            <p className="text-2xl font-semibold">P</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between p-4 h-22  gap-12 rounded-xl border-[#B3D4FF] border bg-[#E6F1FF]">
          <div className="px-1 py-2 flex flex-col items-start text-[#0B3B66] gap-1">
            <p className="text-3xl font-semibold">2</p>
            <p className="font-medium text-[#1E5BB0]">Do</p>
          </div>
          <div className="px-4 py-2 rounded-3xl bg-[#B3D4FF] text-[#0B3B66] flex flex-row items-end">
            <p className="text-2xl font-semibold">D</p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between p-4 h-22 gap-12 rounded-xl border-[#E9D4FF] border bg-[#F6EEFF]">
          <div className="px-1 py-2 flex flex-col items-start text-[#7B2206] gap-1">
            <p className="text-3xl font-semibold">2</p>
            <p className="font-medium text-[#7B2206]">Check</p>
          </div>
          <div className="px-4 py-2 rounded-3xl bg-[#E9D4FF] text-[#7B2206] flex flex-row items-end">
            <p className="text-2xl font-semibold">C </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between p-4 h-22 gap-12 rounded-xl border-[#B9F8CF] border bg-[#E6FDEE]">
          <div className="px-1 py-2 flex flex-col items-start text-[#0B3B66] gap-1">
            <p className="text-3xl font-semibold">2</p>
            <p className="font-medium text-[#1E5BB0]">Act</p>
          </div>
          <div className="px-4 py-2 rounded-3xl bg-[#B9F8CF] text-[#0B3B66] flex flex-col items-start">
            <p className="text-2xl font-semibold">A</p>
          </div>
        </div>
      </div> */}
      <div className="w-full p-4 pt-0 rounded-b-2xl  bg-white text-gray-800 flex items-center justify-between gap-3">
        <div className="flex w-full items-center justify-between p-4 h-22 gap-12 rounded-xl border-yellow-300/60 border bg-[#fff7D9]">
          <div className="px-1 py-2 flex flex-col items-start text-yellow-900 gap-1">
            <p className="text-3xl font-semibold">2</p>
            <p className="font-medium text-yellow-700">Plan</p>
          </div>
          <div className="px-4 py-2 rounded-3xl bg-yellow-300/60 text-yellow-900 flex flex-row items-end">
            <p className="text-2xl font-semibold">P</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between p-4 h-22  gap-12 rounded-xl border-blue-300/50 border bg-[#E6F1FF]">
          <div className="px-1 py-2 flex flex-col items-start text-blue-900 gap-1">
            <p className="text-3xl font-semibold">2</p>
            <p className="font-medium text-blue-700">Do</p>
          </div>
          <div className="px-4 py-2 rounded-3xl bg-blue-300/50 text-blue-900 flex flex-row items-end">
            <p className="text-2xl font-semibold">D</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between p-4 h-22 gap-12 rounded-xl border-purple-300/50 border bg-[#F6EEFF]">
          <div className="px-1 py-2 flex flex-col items-start text-purple-900 gap-1">
            <p className="text-3xl font-semibold">2</p>
            <p className="font-medium text-purple-700">Check</p>
          </div>
          <div className="px-4 py-2 rounded-3xl bg-purple-300/50 text-purple-900 flex flex-row items-end">
            <p className="text-2xl font-semibold">C </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between p-4 h-22 gap-12 rounded-xl border-green-300/50 border bg-[#E6FDEE]">
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
