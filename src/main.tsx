import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { KvpProvider } from "./context/KvpContext.tsx";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { SessionProvider } from "./context/SessionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <ThemeProvider>
        <LanguageProvider>
          <UserProvider>
            <KvpProvider>
              <App />
              <ToastContainer />
            </KvpProvider>
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SessionProvider>
  </StrictMode>,
);
