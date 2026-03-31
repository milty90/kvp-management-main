import { useNavigate } from "react-router-dom";
export function SignupScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-md shadow-md rounded-2xl bg-white p-8">
        <img src="/spark.png" alt="Logo" className="w-60 mb-5" />
        <h1 className="text-xl font-semibold mb-3">Erstellen Sie Ihr Konto</h1>
        <p className="text-sm text-gray-600 mb-8">
          Bitte füllen Sie die folgenden Informationen aus, um ein neues Konto
          zu erstellen.
        </p>
        <form className="w-full max-w-sm">
          <div className="mb-5 items-start justify-items-start">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2 pl-2"
              htmlFor="username"
            >
              Benutzername
            </label>
            <input
              className="shadow border border-slate-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:outline-blue-500"
              id="username"
              type="text"
              placeholder="Benutzername eingeben"
            />
          </div>
          <div className="mb-5 items-start justify-items-start">
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
            />
          </div>
          <div className="mb-5 items-start justify-items-start">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2 pl-2"
              htmlFor="password"
            >
              Passwort
            </label>
            <input
              className="shadow border border-slate-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-1 focus:outline-blue-500"
              id="password"
              type="password"
              placeholder="Passwort eingeben"
            />
          </div>
          <div className="flex px-2 items-center justify-between">
            <button
              className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-150"
              type="submit"
            >
              Konto erstellen
            </button>
            <a
              className="inline-block align-baseline font-semibold text-sm text-blue-600 hover:text-blue-800"
              onClick={() => navigate("/")}
            >
              Bereits ein Konto?
            </a>
          </div>
        </form>
        <p className="text-sm text-gray-600 mt-6">
          <a
            className="font-semibold  text-blue-600 hover:text-blue-800"
            onClick={() => navigate("/kvps")}
          >
            Demo account nutzen
          </a>
          <br />
          oder melden Sie sich mit einem sozialen Konto an.
        </p>
        <div className="flex mt-6 space-x-4">
          <button className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:translate-y-0.5 transition-transform duration-150">
            <img src="/google.svg" alt="Google" className="w-6 mr-2 " />
            Google
          </button>
          <button className="flex items-center px-3 py-2 bg-gray-900 text-white rounded-lg hover:translate-y-0.5 transition-transform duration-150">
            <img src="/github.svg" alt="GitHub" className="w-6 mr-2 -mt-0.5" />
            GitHub
          </button>
          <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:translate-y-0.5 transition-transform duration-150">
            <img src="/slack.svg" alt="Slack" className="w-6 mr-2" />
            Slack
          </button>
        </div>
      </div>
    </div>
  );
}
