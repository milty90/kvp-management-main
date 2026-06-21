import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signInWithEmail } from "../../features/authDatabase";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { showToast } from "../items/ToastItem";
import { useTranslation } from "../../utils/useTranslation";
import { ShowPasswordEye } from "../buttons/ShowPasswordEye";
import { GithubButton } from "../buttons/GithubButton";

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
          <GithubButton />
        </div>
      </div>
    </div>
  );
}
