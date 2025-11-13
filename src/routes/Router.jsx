import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Bills from "../pages/Bills";
import BillDetails from "../pages/BillDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyBills from "../pages/MyBills";
import About from "../pages/Extra/About";
import Help from "../pages/Extra/Help";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "bills", element: <Bills /> },
      {
        path: "bills/:id",
        element: (
          <PrivateRoute>
            <BillDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "my-bills",
        element: (
          <PrivateRoute>
            <MyBills />
          </PrivateRoute>
        ),
      },
      { path: "about", element: <About /> },
      { path: "help", element: <Help /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);

export default router;
