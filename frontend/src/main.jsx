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
import StaffDash from './components/StaffDashboard/StaffDash.jsx'
import StaffDashboard from './pages/Dashboards/StaffDashboard.jsx'
import ManagePrd from './components/StaffDashboard/ManagePrd.jsx'
import AddPrd from './components/StaffDashboard/AddPrd.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'store',
        element: <Store />
      }
    ]
  }, 
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'admin',
    element: <AdminLogin />
  },
  //user manager section
  {
    path: 'admin_dashboard',
    element: <AdminDash />
  },
  {
    path: 'a-dash',
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <AdminDash />
      },
      {
        path: 'manUser',
        element: <ManageUser />
      },
      {
        path: 'addUser',
        element: <AddUser />
      },
      {
        path: 'updateUser/:userId',
        element: <UpdateUser />
      }
    ]
  },
  {
    path: 's-dash',
    element: <StaffDashboard />,
    children: [
      {
        index: true,
        element: <StaffDash />
      },
      {
        path: 'manPrd',
        element: <ManagePrd />
      },
      {
        path: 'addPrd',
        element: <AddPrd />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} /> 
  </StrictMode>,
)
