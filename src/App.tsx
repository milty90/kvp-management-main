import "./App.css";
import KvpView from "./views/KvpView";
import StatsView from "./views/StatsView";
import { useState } from "react";

function App() {
  const [view, setView] = useState("kvp");
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 overflow-hidden p-6">
        {view === "kvp" ? <KvpView /> : <StatsView />}
      </main>
    </div>
  );
}

export default App;
