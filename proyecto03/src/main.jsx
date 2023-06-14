import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./UserContext";
import { IntlProvider } from "react-intl";
import esMessages from "./components/intl/es.json";
import App from "./App.jsx";
import "./index.css";

const messages = {
  es: esMessages,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <IntlProvider locale="es" messages={messages.es}>
        <App />
      </IntlProvider>
    </UserProvider>
  </React.StrictMode>
);
