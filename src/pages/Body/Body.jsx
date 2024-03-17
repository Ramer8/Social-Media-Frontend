import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from "../Home/Home"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"

export const Body = () => {
  const [msgError, setMsgError] = useState("")
  const [usefullDataToken, setUsefullDataToken] = useState()

  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  })

  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/"} replace />} />
      <Route
        path="/"
        element={
          <Home
            usefullDataToken={usefullDataToken}
            setUsefullDataToken={setUsefullDataToken}
          />
        }
      />
      <Route
        path="/login"
        element={
          <Login
            msgError={msgError}
            setMsgError={setMsgError}
            credential={credential}
            setCredential={setCredential}
            usefullDataToken={usefullDataToken}
            setUsefullDataToken={setUsefullDataToken}
          />
        }
      />
      <Route
        path="/register"
        element={
          <Register
            msgError={msgError}
            setMsgError={setMsgError}
            credential={credential}
            setCredential={setCredential}
          />
        }
      />
    </Routes>
  )
}
