import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  signInWithGoogle,
  signInWithGitHub,
  signInWithSlack,
  signInWithEmail,
} from "../../utils/authDatabase";
import { useState } from "react";
import { supabase } from "../../utils/supabase";

export function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const user = supabase.auth.setSession;

  async function handleEmailLogin(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Bitte geben Sie sowohl E-Mail als auch Passwort ein.", {
        position: "top-center",
        className: "mt-6 text-sm font-poppins ",
      });
      return;
    }

    const { data, error } = await signInWithEmail(email, password);

    if (error || !data.session) {
      toast.error(
        "Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.",
        {
          position: "top-center",
          className: "mt-6 text-sm font-poppins ",
        },
      );
      return;
    }

    toast.success("Erfolgreich angemeldet!", {
      position: "top-center",
      className: "mt-6 text-sm font-poppins ",
    });
    navigate("/kvps");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-md shadow-md rounded-2xl bg-white p-8">
        <img src="/spark.png" alt="Logo" className="w-60 mb-4 ml-4" />
        <h1 className="text-xl font-normal mb-1">
          Willkommen zum KVP Management
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Bitte melden Sie sich an, um fortzufahren.
        </p>
        <form className="w-full mb-1 max-w-sm" onSubmit={handleEmailLogin}>
          <div className="mb-4 items-start justify-items-start">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2 pl-2"
              htmlFor="email"
            >
              E-Mail Adresse
            </label>
            <input
              className="shadow border border-slate-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-blue-500"
              id="email"
              type="email"
              placeholder="E-Mail-Adresse eingeben"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mb-5 items-start justify-items-start">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2 pl-2"
              htmlFor="password"
            >
              Passwort
            </label>
            <input
              className="shadow border border-slate-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight  focus:outline-1 focus:outline-blue-500 "
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Passwort eingeben"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute z-10 text-xs text-gray-500 top-9 right-1 mt-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`w-4 h-4 ${showPassword ? "hidden" : ""} cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`w-4 h-4 ${showPassword ? "" : "hidden"} cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </span>
          </div>
          <div className="flex px-2 items-center justify-between">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-150"
            >
              Anmelden
            </button>
            <a
              className="inline-block align-baseline font-semibold text-sm text-blue-600 hover:text-blue-800"
              onClick={() =>
                toast.info(
                  "Passwort vergessen Funktion ist derzeit nicht verfügbar.",
                  {
                    position: "top-center",
                    className: "mt-6 text-sm font-poppins ",
                  },
                )
              }
            >
              Passwort vergessen?
            </a>
          </div>
        </form>
        <p className="text-sm text-gray-600 mt-6">
          Noch kein Konto?
          <a
            onClick={() => navigate("/signup")}
            className="font-semibold pl-2 text-blue-600 hover:text-blue-800"
          >
            Registrieren
          </a>
          <br />
          oder melden Sie sich mit einem sozialen Konto an.
        </p>
        <div className="flex mt-6 space-x-4">
          <button
            className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:translate-y-0.5 transition-transform duration-150"
            type="button"
            onClick={() => {
              signInWithGoogle();
            }}
          >
            <img src="/google.svg" alt="Google" className="w-6 mr-2 " />
            Google
          </button>

          <button
            className="flex items-center px-3 py-2 bg-gray-900 text-white rounded-lg hover:translate-y-0.5 transition-transform duration-150"
            type="button"
            onClick={() => {
              if (!user) {
                toast.info("GitHub Anmeldung ist derzeit nicht verfügbar.", {
                  position: "top-center",
                  className: "mt-6 text-sm font-poppins ",
                });
                return;
              }
              signInWithGitHub();
            }}
          >
            <img src="/github.svg" alt="GitHub" className="w-6 mr-2 -mt-0.5" />
            GitHub
          </button>

          <button
            className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:translate-y-0.5 transition-transform duration-150"
            type="button"
            onClick={() => {
              signInWithSlack();
            }}
          >
            <img src="/slack.svg" alt="Slack" className="w-6 mr-2" />
            Slack
          </button>
        </div>
      </div>
    </div>
  );
}
