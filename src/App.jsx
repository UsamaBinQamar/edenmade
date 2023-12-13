// App.js

import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import ChangeMeal from "./pages/ChangeMeal";
import LandingPage from "./pages/LandingPage";
import MyMenu from "./pages/MyMenu";
import OrderFlow from "./pages/OrderFlow";
import { AuthProvider } from "./auth/authContext";

const router = createBrowserRouter([
  {
    path: "/",

    children: [
      {
        path: "",
        element: <LandingPage />,
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
