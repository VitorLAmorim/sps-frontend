import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import Notification from "./components/Notification";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <NotificationProvider>
      <AuthProvider>
        <Notification />
        <RouterProvider router={router} />
      </AuthProvider>
    </NotificationProvider>
  </React.StrictMode>
);
