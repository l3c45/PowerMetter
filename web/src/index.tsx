import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/dist/darkly/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { StrictMode } from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
