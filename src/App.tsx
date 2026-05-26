import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import KvpView from "./views/KvpView";
import StatsView from "./views/StatsView";
import LoadingSpinner from "./components/items/LoadingSpinner";
import { useState } from "react";
import { useKvpContext } from "./context/KvpContext";
import KvpForm from "./components/kvp/KvpForm";
import { SignupScreen } from "./components/screens/SignupScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { useSessionContext } from "./context/SessionContext";
import { ForgotPassword } from "./components/screens/ForgotPassword";
import UpdatePassword from "./components/screens/UpdatePassword";

const ProtectedRoute = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: boolean;
}) => {
  return session ? <>{children}</> : <LoginScreen />;
};

function App() {
  const [showModal, setShowModal] = useState(false);
  const { selectedKvp, setSelectedKvp } = useKvpContext();
  const { session, isAuthLoading } = useSessionContext();

  if (isAuthLoading) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/kvps" replace />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route
          path="/kvps"
          element={
            <ProtectedRoute session={!!session}>
              <KvpView onOpenModal={() => setShowModal(true)} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute session={!!session}>
              <StatsView />
            </ProtectedRoute>
          }
        />
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
