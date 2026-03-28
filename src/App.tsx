import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddKvp from "./components/kvp/KvpForm";
import KvpView from "./views/KvpView";
import StatsView from "./views/StatsView";
import { useState } from "react";
import { useKvpContext } from "./context/KvpContext";

function App() {
  const [showModal, setShowModal] = useState(false);
  const { selectedKvp, setSelectedKvp } = useKvpContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<KvpView onOpenModal={() => setShowModal(true)} />}
        />
        <Route path="/stats" element={<StatsView />} />
      </Routes>

      {showModal && (
        <AddKvp
          onClose={() => {
            setShowModal(false);
            setSelectedKvp(null);
          }}
          initialData={selectedKvp ?? undefined}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
