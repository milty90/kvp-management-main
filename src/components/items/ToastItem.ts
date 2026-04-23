import { toast } from "react-toastify";
import type { ToastContent } from "react-toastify";

type ToastType = "info" | "warning" | "success" | "error";

export const showToast = (
  width: number,
  theme: string,
  type: ToastType,
  content: ToastContent,
) => {
  toast[type](content, {
    position: width < 768 ? "bottom-center" : "top-center",
    style: {
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.875rem",
      color:
        theme === "dark"
          ? "var(--color-text-primary)"
          : "var(--color-text-secondary)",
      width: width < 768 ? "90vw" : "350px",
      marginTop: width < 768 ? "0rem" : "1.5rem",
      marginBottom: "0.5rem",
      backgroundColor: "var(--color-bg-card)",
    },
  });
};
