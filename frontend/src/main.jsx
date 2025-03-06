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

<<<<<<< HEAD
//user manager section
import AdminDash from './components/User_Manager/admin_dash.jsx'

=======
>>>>>>> master

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
<<<<<<< HEAD
  },
  //user manager section
  {
    path: 'admin_dashboard',
    element: <AdminDash />
=======
>>>>>>> master
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} /> 
  </StrictMode>,
)
