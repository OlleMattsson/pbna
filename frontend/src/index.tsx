import { StrictMode } from "react";
import App from "./App";
import * as ReactDOMClient from "react-dom/client";

const rootElement = document.getElementById("root") as Element;
const root = ReactDOMClient.createRoot(rootElement);


root.render(
  <StrictMode>
    <App />
  </StrictMode>
);