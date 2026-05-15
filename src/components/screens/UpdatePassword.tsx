import { useState, useEffect } from "react";
import { supabase } from "./../../utils/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";
import ColorButton from "../buttons/ColorButton";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setSessionReady(true);
      }
    });
  }, []);

  const handlePasswordUpdate = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Die Passwörter stimmen nicht überein.");
      return;
    }
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      toast.error("Fehler beim Aktualisieren des Passworts: " + error.message);
    } else {
      toast.success("Passwort wurde erfolgreich aktualisiert!");
      navigate("/login");
    }
    setLoading(false);
  };

  if (!sessionReady) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <p className="text-text-primary">Validierung läuft...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center md:justify-center  h-screen bg-background">
      <div className="flex flex-col pt-12 items-center justify-start h-screen md:h-auto md:justify-center w-full max-w-md shadow-md md:rounded-2xl bg-surface p-8">
        <img
          src={theme === "dark" ? "/spark-dark.png" : "/spark-light.png"}
          alt="Logo"
          className="w-50 mb-4 ml-4"
        />
        <h2 className="text-2xl font-bold mb-4">Neues Passwort</h2>
        <form onSubmit={handlePasswordUpdate} className="space-y-4 mb-6">
          <label className="block text-sm text-text-primary mb-1 pl-2">
            Neues Passwort
          </label>
          <input
            type="password"
            placeholder="Geben Sie das neue Passwort ein"
            className="border p-2 rounded w-75"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="block text-sm text-text-primary mb-1 pl-2">
            Neues Passwort bestätigen
          </label>
          <input
            type="password"
            placeholder="Bestätigen Sie das neue Passwort"
            className="border p-2 rounded w-75"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </form>
        <ColorButton type="submit" disabled={loading}>
          {loading ? "Speichern..." : "Passwort aktualisieren"}
        </ColorButton>
      </div>
    </div>
  );
}
