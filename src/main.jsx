import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"

import { Header } from "./common/Header/Header.jsx"
import { Home } from "./pages/Home/Home.jsx"
import { Register } from "./pages/Register/Register.jsx"
import { Login } from "./pages/Login/Login.jsx"
import Profile from "./pages/Profile/Profile.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} replace />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      // {
      //   path: "/post",
      //   element: <Services />,
      // },
      // {
      //   path: "/managment",
      //   element: <Managment />,
      // },
    ],
  }, // we can add the route that we need
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
