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
    className: ` text-sm font-poppins `,
    style: {
      borderRadius: "0.5rem",
      width: width < 768 ? "90vw" : "400px",
      marginTop: width < 768 ? "0rem" : "1.3rem",
      marginBottom: "0.5rem",
      backgroundColor: theme === "dark" ? "#374151" : "#f3f4f6",
      color: theme === "dark" ? "#bfbfbf" : "#1f2937",
    },
  });
};
