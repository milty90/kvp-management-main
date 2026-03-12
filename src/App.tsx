import "./App.css";
import AddKvp from "./components/kvp/AddKvp";
import KvpView from "./views/KvpView";
import StatsView from "./views/StatsView";
import { useState } from "react";

function App() {
  const [view, setView] = useState("kvp");
  return (
    <div className="flex h-screen ">
      <main className="flex-1  p-6">
        {view === "kvp" ? <KvpView /> : <StatsView />}
        {/* <AddKvp /> */}
      </main>
    </div>
  );
}

export default App;
