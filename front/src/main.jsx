import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import esMessages from "../src/views/components/intl/es.json";
import { UserProvider } from "./UserContext.jsx";
import { IntlProvider } from "react-intl";

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
