import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { KvpProvider } from "./context/KvpContext.tsx";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <KvpProvider>
          <App />
          <ToastContainer />
        </KvpProvider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
);
