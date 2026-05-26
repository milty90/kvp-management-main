import { useState, useEffect } from "react";
import { supabase } from "./../../utils/supabase";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import ColorButton from "../buttons/ColorButton";
import LoadingSpinner from "../items/LoadingSpinner";
import { showToast } from "../items/ToastItem";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useTranslation } from "../../utils/useTranslation";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { theme } = useTheme();
  const width = useWindowWidth();
  const navigate = useNavigate();
  const translations = useTranslation();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setSessionReady(true);
      } else if (event === "SIGNED_IN" && session) {
        setSessionReady(true);
      } else if (event === "SIGNED_OUT") {
        navigate("/login");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSessionReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handlePasswordUpdate = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast(
        width,
        theme,
        "error",
        translations.updatePassword.confirmationMismatch,
      );
      return;
    }
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      showToast(
        width,
        theme,
        "error",
        translations.updatePassword.confirmationError(error.message),
      );
    } else {
      showToast(
        width,
        theme,
        "success",
        translations.updatePassword.confirmationMessage,
      );
      navigate("/login");
    }
    setLoading(false);
  };

  if (!sessionReady) {
    return (
      <div className="flex flex-col items-center justify-center  bg-background">
        <LoadingSpinner
          text={translations.updatePassword.validityMessage}
          size="large"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center md:justify-center  h-screen bg-background">
      <div className="flex flex-col pt-12 items-center justify-start h-screen md:h-auto md:justify-center w-full max-w-md shadow-md md:rounded-2xl bg-surface p-8">
        <img
          src={theme === "dark" ? "/spark-dark.png" : "/spark-light.png"}
          alt="Logo"
          className="w-50 mb-2 ml-4"
        />
        <h2 className="text-xl font-bold mb-7">
          {translations.updatePassword.title}
        </h2>
        <form onSubmit={handlePasswordUpdate} className="space-y-4 mb-4">
          <div className="relative mb-1 items-start justify-items-start">
            <label className="block text-sm text-text-primary mb-1 pl-2">
              {translations.updatePassword.passwordTitle}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder={translations.updatePassword.passwordPlaceholder}
              className={`border p-2 rounded w-85 mb-7 ${theme === "dark" ? "border-gray-600 focus:ring-green-600" : "border-gray-300 focus:ring-blue-500"} rounded-lg focus:outline-none focus:ring-2`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="absolute z-10 text-xs text-text-secondary top-8.5 right-1 mt-1 mr-2">
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
          </div>

          <div className="relative mb-5 items-start justify-items-start">
            <label className="block text-sm text-text-primary mb-1 pl-2">
              {translations.updatePassword.confirmPasswordTitle}
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder={
                translations.updatePassword.confirmPasswordPlaceholder
              }
              className={`border p-2 rounded w-85 mb-7 ${theme === "dark" ? "border-gray-600 focus:ring-green-600" : "border-gray-300 focus:ring-blue-500"} rounded-lg focus:outline-none focus:ring-2`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <span className="absolute z-10 text-xs text-text-secondary top-8.5 right-1 mt-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-4 h-4 ${showConfirmPassword ? "hidden" : ""} cursor-pointer`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                className={`w-4 h-4 ${showConfirmPassword ? "" : "hidden"} cursor-pointer`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
          </div>

          <ColorButton
            type="submit"
            disabled={loading}
            isTextOnly={true}
            color={theme === "dark" ? "green" : "blue"}
          >
            {loading
              ? translations.updatePassword.loadingText
              : translations.updatePassword.updateButton}
          </ColorButton>
        </form>
      </div>
    </div>
  );
}
