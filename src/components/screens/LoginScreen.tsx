import { useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithGitHub,
  signInWithEmail,
} from "../../features/authDatabase";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { showToast } from "../items/ToastItem";
import { useTranslation } from "../../utils/useTranslation";
import { ShowPasswordEye } from "../buttons/ShowPasswordEye";

export function LoginScreen() {
  const navigate = useNavigate();
  const width = useWindowWidth();
  const translation = useTranslation();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    if (!email || !password) {
      showToast(
        width,
        theme,
        "error",
        translation.loginScreen.missingFieldsError,
      );
      setLoading(false);
      return;
    }

    const { data, error } = await signInWithEmail(email, password);

    if (error || !data.session) {
      showToast(
        width,
        theme,
        "error",
        translation.loginScreen.loginError + " " + error?.message,
      );
      setLoading(false);
      return;
    }

    showToast(width, theme, "success", translation.loginScreen.loginSuccess);
    setLoading(false);

    navigate("/kvps");
  }

  return (
    <div className="flex flex-col items-center md:justify-center  h-screen bg-background">
      <div className="flex flex-col pt-12 items-center justify-start h-screen md:h-auto md:justify-center w-full max-w-md shadow-md md:rounded-2xl bg-surface p-8">
        <img
          src={theme === "dark" ? "/spark-dark.png" : "/spark-light.png"}
          alt="Logo"
          className="w-55 mb-4 ml-4"
        />
        <h1 className="text-lg font-semibold mb-1">
          {translation.loginScreen.title}
        </h1>
        <p className="text-sm text-text-secondary mb-8">
          {translation.loginScreen.description}
        </p>
        <form className="w-full mb-1 max-w-sm" onSubmit={handleEmailLogin}>
          <div className="mb-4 items-start justify-items-start">
            <label
              className="block text-left text-text-primary text-sm font-semibold mb-2 pl-2"
              htmlFor="email"
            >
              {translation.loginScreen.emailTitle}
            </label>
            <input
              className={`shadow border border-slate-400 rounded w-full py-2 px-3 text-text-primary leading-tight focus:outline-1 ${theme === "dark" ? "focus:outline-green-500" : "focus:outline-blue-500"}`}
              id="email"
              type="email"
              placeholder={translation.loginScreen.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mb-5 items-start justify-items-start">
            <label
              className="block text-left text-text-primary text-sm font-semibold mb-2 pl-2"
              htmlFor="password"
            >
              {translation.loginScreen.passwordTitle}
            </label>
            <input
              className={`shadow border border-slate-400 rounded w-full py-2 px-3 text-text-primary mb-3 leading-tight  focus:outline-1 ${theme === "dark" ? "focus:outline-green-500" : "focus:outline-blue-500"}`}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={translation.loginScreen.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ShowPasswordEye
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
          <div className="flex px-2 items-center justify-between">
            <button
              disabled={loading}
              type="submit"
              className={`px-5 py-2.5 bg-button ${loading ? "opacity-50 cursor-not-allowed" : ""} text-white font-semibold rounded-lg shadow-lg hover:bg-button-hover transition-colors duration-150`}
            >
              {translation.loginScreen.loginButton}
            </button>
            <a
              className="inline-block align-baseline font-semibold text-sm text-button hover:text-button-hover cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              {translation.loginScreen.forgotPassword}
            </a>
          </div>
        </form>
        <p className="text-sm text-text-secondary mt-6">
          {translation.loginScreen.haventGotAccount}
          <a
            onClick={() => navigate("/signup")}
            className="font-semibold pl-2 text-button hover:text-button-hover cursor-pointer"
          >
            {translation.loginScreen.signupButton}
          </a>
          <br />
          {translation.loginScreen.orLogInWithSocials}
        </p>
        <div className="flex mt-6 space-x-2 md:space-x-4">
          <button
            className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:translate-y-0.5 transition-transform duration-150"
            type="button"
            onClick={() => {
              signInWithGoogle().catch((error) =>
                showToast(
                  width,
                  theme,
                  "error",
                  translation.loginScreen.oAuthError + ": " + error.message,
                ),
              );
            }}
          >
            <img
              src="/google.svg"
              alt="Google"
              className="w-6 mr-1 -ml-1 md:mr-2"
            />
            Google
          </button>

          <button
            className={`flex items-center px-3 py-2 ${theme === "light" ? "bg-gray-900" : "bg-gray-600"} text-white rounded-lg hover:translate-y-0.5 transition-transform duration-150`}
            type="button"
            onClick={() => {
              signInWithGitHub().catch((error) =>
                showToast(
                  width,
                  theme,
                  "error",
                  translation.loginScreen.oAuthError + ": " + error.message,
                ),
              );
            }}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              className="octicon octicon-mark-github w-6 mr-2 -ml-1"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
              display="inline-block"
              overflow="visible"
              style={{ verticalAlign: "text-bottom" }}
            >
              <path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943"></path>
            </svg>
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
