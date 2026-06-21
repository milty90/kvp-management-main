import { signInWithGoogle } from "../../features/authDatabase";
import { useTheme } from "../../context/ThemeContext";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { showToast } from "../items/ToastItem";
import { useTranslation } from "../../utils/useTranslation";

export function GoogleButton() {
  const { theme } = useTheme();
  const width = useWindowWidth();
  const translation = useTranslation();

  return (
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
      <img src="/google.svg" alt="Google" className="w-6 mr-1 -ml-1 md:mr-2" />
      Google
    </button>
  );
}
