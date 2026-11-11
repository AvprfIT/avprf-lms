import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import { StudentAuthProvider } from "./context/StudentAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudentAuthProvider>
      <App />
    </StudentAuthProvider>
  </React.StrictMode>
);