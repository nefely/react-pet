import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/js/all.min.js';

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
