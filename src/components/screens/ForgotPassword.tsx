import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useTheme } from "../../context/ThemeContext";
import { showToast } from "../items/ToastItem";
import { useTranslation } from "../../utils/useTranslation";
import { supabase } from "../../utils/supabase";
export function ForgotPassword() {
  const navigate = useNavigate();
  const width = useWindowWidth();
  const translation = useTranslation();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");

  async function handlePasswordReset(
    event: React.SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!email) {
      showToast(
        width,
        theme,
        "error",
        translation.forgotPasswordScreen.missingEmailError,
      );
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      showToast(
        width,
        theme,
        "error",
        translation.forgotPasswordScreen.resetError + " " + error.message,
      );
      return;
    }

    showToast(
      width,
      theme,
      "success",
      translation.forgotPasswordScreen.resetSuccess,
    );

    navigate("/login");
  }

  return (
    <div className="flex flex-col items-center md:justify-center  h-screen bg-background">
      <div className="flex flex-col pt-12 items-center justify-start h-screen md:h-auto md:justify-center w-full max-w-md shadow-md md:rounded-2xl bg-surface p-8">
        <img
          src={theme === "dark" ? "/spark-dark.png" : "/spark-light.png"}
          alt="Logo"
          className="w-55 mb-4 ml-4"
        />
        <h2 className="text-2xl font-semibold mb-6">
          {translation.forgotPasswordScreen.title}
        </h2>
        <form className="w-full mb-1 max-w-sm" onSubmit={handlePasswordReset}>
          <div className="mb-4 items-start justify-items-start">
            <label className="block text-sm text-text-primary mb-1">
              {translation.forgotPasswordScreen.emailTitle}
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-3 py-2 border ${theme === "dark" ? "border-gray-600" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={translation.forgotPasswordScreen.emailPlaceholder}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 ${theme === "light" ? "bg-gray-900" : "bg-gray-600"} text-white rounded-lg hover:translate-y-0.5 transition-transform duration-150`}
          >
            {translation.forgotPasswordScreen.resetButton}
          </button>
        </form>
      </div>
    </div>
  );
}
