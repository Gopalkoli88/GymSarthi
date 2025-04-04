 

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Replace with your actual Google Client ID
const clientId = "904448913509-jng79u6cad83a7ij4cseejn7s92t334i.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
