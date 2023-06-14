import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const DATA = [
  { id: "1", name: "Apple", completed: true },
  { id: "2", name: "Banana", completed: false },
  { id: "3", name: "Melon", completed: false },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
);

///data--tasks adıyla App.js e gönderilir
