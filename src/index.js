import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import BarProvider from "./contexts/AppBarContext";
import SearchProvider from "./contexts/SearchValue";
// import 'semantic-ui-css/semantic.min.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <BarProvider>
        <App />
      </BarProvider>
    </SearchProvider>
  </AuthProvider>
);
