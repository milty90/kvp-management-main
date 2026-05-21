import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithGitHub,
  signInWithGoogle,
  signUpWithEmailandPassword,
  signInWithEmail,
} from "../../features/authDatabase";
import { useTheme } from "../../context/ThemeContext";
import { showToast } from "../items/ToastItem";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useTranslation } from "../../utils/useTranslation";
import { useUserContext } from "../../context/UserContext";

export function SignupScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { theme } = useTheme();
  const width = useWindowWidth();
  const translation = useTranslation();
  const { addUser } = useUserContext();

  async function handleDemoLogin() {
    const { data, error } = await signInWithEmail(
      "demo@mail.com",
      "demopassword",
    );

    if (error || !data.session) {
      showToast(
        width,
        theme,
        "error",
        translation.signupScreen.loggedInWithDemo + " " + error?.message,
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

    if (!email || !password) {
      showToast(width, theme, "error", translation.signupScreen.emailPassFail);
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
      return;
    }

    await addUser({
      userId: data.user.id,
      photoUrl: "",
      department: "",
      role: "",
      firstName: "",
      lastName: "",
      userName: email.slice(0, email.indexOf("@")),
      userEmail: email,
      createdAt: new Date().toISOString(),
      lastSignIn: new Date().toISOString(),
    });

    if (data.session) {
      showToast(
        width,
        theme,
        "success",
        translation.signupScreen.signUpSuccess,
      );
      navigate("/login");
      return;
    }

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
              placeholder={translation.signupScreen.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute z-10 text-xs text-gray-500 top-9 right-1 mt-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-4 h-4 ${showPassword ? "hidden" : ""} cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-4 h-4 ${showPassword ? "" : "hidden"} cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </span>
            <span className="text-xs text-text-secondary mb-1">
              {translation.signupScreen.passwordText}
            </span>
          </div>
          <div className="flex px-0.5 md:px-2 items-center justify-between">
            <button
              type="submit"
              className="px-5 py-2.5 bg-button text-white font-semibold rounded-lg shadow-lg hover:bg-button-hover transition-colors duration-150"
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
          <button
            onClick={() =>
              signInWithGitHub().catch((error) =>
                showToast(
                  width,
                  theme,
                  "error",
                  translation.signupScreen.oAuthError + ": " + error.message,
                ),
              )
            }
            className={`flex items-center px-3 py-2 ${theme === "light" ? "bg-gray-900" : "bg-gray-600"} text-white rounded-lg hover:translate-y-0.5 transition-transform duration-150`}
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
