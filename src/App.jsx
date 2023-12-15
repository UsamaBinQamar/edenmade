// App.js

import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import ChangeMeal from "./pages/ChangeMeal";
import LandingPage from "./pages/LandingPage";
import MyMenu from "./pages/MyMenu";
import OrderFlow from "./pages/OrderFlow";
import { AuthProvider, useAuth } from "./auth/authContext";
import { useNavigate } from "react-router-dom";
import SecurePage from "./auth/Secure";

const router = createBrowserRouter([
  {
    path: "/",

    children: [
      {
        path: "",
        element: <SecurePage Comment={LandingPage} />,
      },
      {
        path: "order-flow",
        element: <OrderFlow />,
      },
      {
        path: "my-menu",
        element: <MyMenu />,
      },
      {
        path: "selected-meals-cart",
        element: <Cart />,
      },
      {
        path: "change-meal",
        element: <ChangeMeal />,
      },
      Cart,
    ],
  },
]);

function App({ routes }) {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
