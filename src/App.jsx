// import "./App.css";

// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import ChangeMeal from "./pages/ChangeMeal";
// import EditDeliveryPopup from "./components/popups/EditDeliveryPopup";
// import Cart from "./pages/Cart";
// import MyMenu from "./pages/MyMenu";
// import ChangeBoxSizePopup from "./components/popups/ChangeBoxSizePopup";
// import PlanSettingPopup from "./components/popups/PlanSettingPopup";
// import CancelSubscriptionPopup from "./components/popups/CancelSubscriptionPopup";
// import OrderFlow from "./pages/OrderFlow";
// import LandingPage from "./pages/LandingPage";

// function App() {
//   return (
//     <>
//       {/* <Header /> */}
//       <LandingPage />
//       {/* <Footer /> */}
//       {/* <OrderFlow />
// <MyMenu />
// <Cart />
// <ChangeMeal />
//       <Footer />
//       <EditDeliveryPopup />
//       <ChangeBoxSizePopup />
//       <PlanSettingPopup />
//       <CancelSubscriptionPopup /> */}
//     </>
//   );
// }

// export default App;
import "./App.css";
import React from "react";
import LandingPage from "./pages/LandingPage";
import OrderFlow from "./pages/OrderFlow";
import MyMenu from "./pages/MyMenu";
import Cart from "./pages/Cart";
import ChangeMeal from "./pages/ChangeMeal";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
