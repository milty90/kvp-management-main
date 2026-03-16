import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { KvpProvider } from "./context/KvpContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KvpProvider>
      <App />
    </KvpProvider>
  </StrictMode>,
);
