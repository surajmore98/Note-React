import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NoteProvider } from "./context/NoteContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
      <AuthProvider>
          <NoteProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </NoteProvider>
      </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
