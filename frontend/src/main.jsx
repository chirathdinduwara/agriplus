<<<<<<< HEAD
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'

import Error from './components/Error/err_404_page.jsx'
import Home from './components/HomePage/Home.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Store from './pages/Store.jsx'
import Login from './pages/LoginPages/Login.jsx'
import AdminLogin from './pages/LoginPages/AdminLogin.jsx'
import AdminDashboard from './pages/Dashboards/AdminDashboard.jsx'
import AdminDash from './components/AdminDashboard/AdminDash.jsx'
import ManageUser from './components/AdminDashboard/ManageUser.jsx'
import AddUser from './components/AdminDashboard/AddUser.jsx'
import UpdateUser from './components/AdminDashboard/UpdateUser.jsx'
import UserSignup from './pages/SignupPages/user_signup.jsx'
import StaffDash from './components/StaffDashboard/StaffDash.jsx'
import StaffDashboard from './pages/Dashboards/StaffDashboard.jsx'
import ManagePrd from './components/StaffDashboard/ManagePrd.jsx'
import AddPrd from './components/StaffDashboard/AddPrd.jsx'
import UpdatePrd from './components/StaffDashboard/UpdatePrd.jsx'
import Product from './components/HomePage/Product.jsx'
import UserProfile from './components/User_Manager/UserProfile.jsx'
import UserDashboard from './components/User_Manager/UserDashboard.jsx'
import SmartFarming from './components/User_Manager/SmartFarming.jsx'
>>>>>>> a0270134f34657724a3dde765fa38c425de7d34c

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
import Order from "./components/HomePage/Order_process.jsx";

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
<<<<<<< HEAD
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "order/:id",
        element: <Order />,
      },
    ],
=======
        path:"/product/:id",
        element: <Product />
      }
    ]
  },
  {
    path: 'profile',
    element: <UserProfile />,
    children: [
      {
        index: true,
        element: <UserDashboard />
      },
      {
        path: 'SmartAssit',
        element: <SmartFarming />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
>>>>>>> a0270134f34657724a3dde765fa38c425de7d34c
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: <AdminLogin />,
  },
  //user manager section
  {
    path: "admin_dashboard",
    element: <AdminDash />,
  },
  {
    path: "sign_up",
    element: <UserSignup />,
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
