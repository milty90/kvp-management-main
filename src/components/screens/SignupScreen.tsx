import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  signUpWithEmailandPassword,
  signInWithEmail,
} from "../../features/authDatabase";
import { useTheme } from "../../context/ThemeContext";
import { showToast } from "../items/ToastItem";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useTranslation } from "../../utils/useTranslation";
import { ShowPasswordEye } from "../buttons/ShowPasswordEye";
import { GithubButton } from "../buttons/GithubButton";

export function SignupScreen() {
  const navigate = useNavigate();

  const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
  const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const width = useWindowWidth();
  const translation = useTranslation();

  async function handleDemoLogin() {
    const { data, error } = await signInWithEmail(demoEmail, demoPassword);

    if (error || !data.session) {
      showToast(
        width,
        theme,
        "error",
        translation.signupScreen.loggedInWithDemo + "  " + error?.message,
      );
      return;
    }

    showToast(
      width,
      theme,
      "success",
      translation.signupScreen.loggedInWithDemo,
    );

    navigate("/kvps");
  }

  async function handleEmailSignUp(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    if (!email || !password) {
      showToast(width, theme, "error", translation.signupScreen.emailPassFail);
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      showToast(
        width,
        theme,
        "error",
        translation.signupScreen.passwordTooShort,
      );
      setLoading(false);
      return;
    }

    const { data, error } = await signUpWithEmailandPassword(email, password);

    if (error || !data.user) {
      showToast(
        width,
        theme,
        "error",
        translation.signupScreen.signUpFailed + error?.message,
      );
      setLoading(false);
      return;
    }

    setLoading(false);

    showToast(width, theme, "success", translation.signupScreen.confirmSignUp);

    navigate("/login");
  }
  return (
    <div className="flex flex-col items-center md:justify-center h-screen bg-background">
      <div className="flex flex-col pt-12 items-center justify-start h-screen md:h-auto  md:justify-center w-full max-w-md shadow-md md:rounded-2xl bg-surface p-8">
        <img
          src={theme === "dark" ? "/spark-dark.png" : "/spark-light.png"}
          alt="Logo"
          className="w-55 mb-4 ml-4"
        />
        <h1 className="text-xl font-semibold mb-1">
          {translation.signupScreen.title}
        </h1>
        <p className="text-sm text-text-secondary mb-8">
          {translation.signupScreen.description}
        </p>
        <form className="w-full max-w-sm" onSubmit={handleEmailSignUp}>
          <div className="mb-5 items-start justify-items-start">
            <label
              className="block text-left text-text-primary text-sm font-semibold mb-2 pl-2"
              htmlFor="email"
            >
              {translation.signupScreen.emailTitle}
            </label>
            <input
              className={`shadow border border-slate-400 rounded w-full py-2 px-3 text-text-primary leading-tight focus:outline-1 ${theme === "dark" ? "focus:outline-green-500" : "focus:outline-blue-500"}`}
              id="email"
              type="email"
              required
              placeholder={translation.signupScreen.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mb-5 items-start justify-items-start">
            <label
              className="block text-left text-text-primary text-sm font-semibold mb-2 pl-2"
              htmlFor="password"
            >
              {translation.signupScreen.passwordTitle}
            </label>

            <input
              className={`shadow border border-slate-400 rounded w-full py-2 px-3 text-text-primary mb-3 leading-tight focus:outline-1 ${theme === "dark" ? "focus:outline-green-500" : "focus:outline-blue-500"}`}
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              placeholder={translation.signupScreen.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ShowPasswordEye
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <span className="text-xs text-text-secondary mb-1">
              {translation.signupScreen.passwordText}
            </span>
          </div>
          <div className="flex px-0.5 md:px-2 items-center justify-between">
            <button
              disabled={loading}
              type="submit"
              className={`px-5 py-2.5 bg-button ${loading ? "opacity-50 cursor-not-allowed" : ""} text-white font-semibold rounded-lg shadow-lg hover:bg-button-hover transition-colors duration-150`}
            >
              {translation.signupScreen.signupButton}
            </button>
            <a
              className="inline-block align-baseline font-semibold text-sm text-button hover:text-button-hover cursor-pointer"
              onClick={() => navigate("/login")}
            >
              {translation.signupScreen.alreadyHaveAccount}
            </a>
          </div>
        </form>
        <p className="text-sm text-text-secondary mt-6">
          <a
            className="font-semibold  text-button hover:text-button-hover cursor-pointer"
            onClick={() => handleDemoLogin()}
          >
            {translation.signupScreen.demoAccount}
          </a>
          <br />
          {translation.signupScreen.orLogInWithSocials}
        </p>
        <div className="flex mt-6 space-x-2 md:space-x-4">
          <button
            onClick={() =>
              signInWithGoogle().catch((error) =>
                showToast(
                  width,
                  theme,
                  "error",
                  translation.signupScreen.oAuthError + ": " + error.message,
                ),
              )
            }
            className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:translate-y-0.5 transition-transform duration-150"
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
