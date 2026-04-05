import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import KvpView from "./views/KvpView";
import StatsView from "./views/StatsView";
import { useEffect, useState } from "react";
import { useKvpContext } from "./context/KvpContext";
import KvpForm from "./components/kvp/KvpForm";
import { SignupScreen } from "./components/screens/SignupScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { supabase } from "./utils/supabase";
import SessionContext from "./context/SessionContext";
import { ConfirmDialogItem } from "./components/items/ConfirmDialogItem";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { selectedKvp, setSelectedKvp } = useKvpContext();

  const [session, setSession] = useState(null) as any;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={session}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              session ? (
                <KvpView
                  onOpenModal={() => setShowModal(true)}
                  onOpenDialog={() => setShowDialog(true)}
                />
              ) : (
                <LoginScreen />
              )
            }
          />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route
            path="/kvps"
            element={
              session ? (
                <KvpView
                  onOpenModal={() => setShowModal(true)}
                  onOpenDialog={() => setShowDialog(true)}
                />
              ) : (
                <LoginScreen />
              )
            }
          />
          <Route
            path="/stats"
            element={session ? <StatsView /> : <LoginScreen />}
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
        {showDialog && (
          <ConfirmDialogItem
            title="KVP löschen"
            message="Möchten Sie dieses KVP wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
            onConfirm={() => {
              // Handle confirm action
              setShowDialog(false);
            }}
            onCancel={() => setShowDialog(false)}
          />
        )}
      </BrowserRouter>
    </SessionContext.Provider>
  );
}

export default App;
