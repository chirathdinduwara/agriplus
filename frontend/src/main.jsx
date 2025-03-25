import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./components/Error/err_404_page.jsx";
import Home from "./components/HomePage/Home.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Store from "./pages/Store.jsx";
import Login from "./pages/LoginPages/Login.jsx";
import AdminLogin from "./pages/LoginPages/AdminLogin.jsx";
import AdminDashboard from "./pages/Dashboards/AdminDashboard.jsx";
import AdminDash from "./components/AdminDashboard/AdminDash.jsx";
import ManageUser from "./components/AdminDashboard/ManageUser.jsx";
import AddUser from "./components/AdminDashboard/AddUser.jsx";
import UpdateUser from "./components/AdminDashboard/UpdateUser.jsx";
import UserSignup from "./pages/SignupPages/user_signup.jsx";
import StaffDash from "./components/StaffDashboard/StaffDash.jsx";
import StaffDashboard from "./pages/Dashboards/StaffDashboard.jsx";
import ManagePrd from "./components/StaffDashboard/ManagePrd.jsx";
import AddPrd from "./components/StaffDashboard/AddPrd.jsx";
import UpdatePrd from "./components/StaffDashboard/UpdatePrd.jsx";
import Product from "./components/HomePage/Product.jsx";
import UserProfile from "./components/User_Manager/UserProfile.jsx";
import UserDashboard from "./components/User_Manager/UserDashboard.jsx";
import SmartFarming from "./components/User_Manager/SmartFarming.jsx";
import Order from "./components/HomePage/Order_process.jsx";
import AddFarmingDetails from "./components/SpecialFunction/AddFarmingDetails.jsx";
import SmartAssist from "./components/SpecialFunction/SmartAssist.jsx";
import Delmanager from "./pages/Delivery_Manager/del_manager_dash.jsx";
import OrderManager from "./pages/Order_Manager/order_manager_dash.jsx";
import EditFarmingDetails from "./components/SpecialFunction/EditFarmingDetails.jsx";
import EditOrder from "./pages/Delivery_Manager/update_table.jsx";
import StaffLogin from "./pages/LoginPages/StaffLogin.jsx";
import AssignDelivery from "./pages/Delivery_Manager/del_persons.jsx";
import DelPerDashboard_main from "./pages/Delivery_Manager/DeliverPerson_Dashboard/DelPerDashboard_main.jsx";
import DelPerDashboard from "./pages/Delivery_Manager/DeliverPerson_Dashboard/DelPerDashboard.jsx";
import MarkProgress from "./pages/Delivery_Manager/DeliverPerson_Dashboard/MarkProgress.jsx";
import Deliveries from "./pages/Delivery_Manager/DeliverPerson_Dashboard/Deliveries.jsx";
import DelPerLogin from "./pages/LoginPages/DelPersonLogin.jsx";
import TrackDels from "./pages/Delivery_Manager/TrackDeliveries.jsx";
import ManageStaff from "./components/AdminDashboard/ManageStaff.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "order/:id",
        element: <Order />,
      },
    ],
  },
  {
    path: "profile",
    element: <UserProfile />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "SmartAssit",
        element: <SmartFarming />,
      },
      {
        path: "addDetails",
        element: <AddFarmingDetails />,
      },
      {
        path: "editDetails/:orderId",
        element: <EditFarmingDetails />,
      },
    ],
  },
  {
    path: "assist/:id",
    element: <SmartAssist />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: <AdminLogin />,
  },
  {
    path: "staff",
    element: <StaffLogin />,
  },
  // user manager section
  {
    path: "admin_dashboard",
    element: <AdminDash />,
  },
  {
    path: "sign_up",
    element: <UserSignup />,
  },
  {
    path: "del_manager",
    element: <Delmanager />,
  },
  {
    path: "assignDelivery",
    element: <AssignDelivery />,
  },
  {
    path: "order_manager",
    element: <OrderManager />,
  },
  {
    path: "maneger_edit_order/:orderId",
    element: <EditOrder />,
  },
  {
    path: "a-dash",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <AdminDash />,
      },
      {
        path: "manUser",
        element: <ManageUser />,
      },
      {
        path: "addUser",
        element: <AddUser />,
      },
      {
        path: "updateUser/:userId",
        element: <UpdateUser />,
      },
      {
        path: "manStaff",
        element: <ManageStaff />
      }
    ],
  },
  {
    path: "s-dash",
    element: <StaffDashboard />,
    children: [
      {
        index: true,
        element: <StaffDash />,
      },
      {
        path: "manPrd",
        element: <ManagePrd />,
      },
      {
        path: "addPrd",
        element: <AddPrd />,
      },
      {
        path: "updateProduct/:prdId",
        element: <UpdatePrd />,
      },
    ],
  },
  {
    path: "delPer-dash",
    element: <DelPerDashboard_main />,
    children: [
      {
        index: true,
        element: <DelPerDashboard />,
      },
      {
        path: "manADeliveries",
        element: <Deliveries />,
      },
      {
        path: "markProgress",
        element: <MarkProgress />,
      },
    ],
  },
  {
    path: "del_person_login",
    element: <DelPerLogin />,
  },
  {
    path: "track_delivery",
    element: <TrackDels />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
