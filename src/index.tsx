import { StrictMode } from "react";
import App from "./App";

// @ts-ignore
import * as ReactDOMClient from "react-dom/client";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

/*
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
*/

root.render(<App />);
