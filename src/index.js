import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { NoteProvider } from "./context/NoteContext";
import { AuthProvider } from "./context/AuthContext";
import { FormProvider } from "./context/FormContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <NoteProvider>
      <AuthProvider>
        <FormProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FormProvider>  
      </AuthProvider>
    </NoteProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
