import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./UserContext.jsx";
import { LangProvider } from "./LangContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LangProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LangProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
