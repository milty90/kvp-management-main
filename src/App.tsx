import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import KvpView from "./views/KvpView";
import StatsView from "./views/StatsView";
import { useState } from "react";
import { useKvpContext } from "./context/KvpContext";
import KvpForm from "./components/kvp/KvpForm";
import { SignupScreen } from "./components/screens/SignupScreen";
import { LoginScreen } from "./components/screens/LoginScreen";

function App() {
  const [showModal, setShowModal] = useState(false);
  const { selectedKvp, setSelectedKvp } = useKvpContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route
          path="/kvps"
          element={<KvpView onOpenModal={() => setShowModal(true)} />}
        />
        <Route path="/stats" element={<StatsView />} />
      </Routes>

      {showModal && (
        <KvpForm
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
