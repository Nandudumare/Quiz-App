import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProContextProvider } from "./context/ProContext";
import { ChakraProvider } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ProContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
