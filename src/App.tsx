import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddKvp from "./components/kvp/AddKvp";
import KvpView from "./views/KvpView";
import StatsView from "./views/StatsView";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<KvpView onOpenModal={() => setShowModal(true)} />}
        />
        <Route path="/stats" element={<StatsView />} />
      </Routes>

      {showModal && <AddKvp onClose={() => setShowModal(false)} />}
    </BrowserRouter>
  );
}

export default App;
