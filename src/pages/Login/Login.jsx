import { useEffect, useState } from "react"
import { decodeToken } from "react-jwt"
import { CustomInput } from "../../common/CustomInput/CustomInput"

import "./Login.css"
import { loginMe } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"
import { validame } from "../../utils/functions"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CustomButton } from "../../common/CustomButton/CustomButton"

import { useDispatch } from "react-redux"
import { login } from "../../app/slices/userSlice"

export const Login = () => {
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  })

  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: "",
  })

  const ERROR_MSG_TIME = 6000
  const SUCCESS_MSG_TIME = 1600

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value)

    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }))
  }

  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const logMe = async () => {
    for (let credencial in credenciales) {
      if (credenciales[credencial] === "") {
        toast.error("No has rellenado todos los campos", {
          theme: "dark",
          position: "top-left",
        })

        return
      }
    }

    const fetched = await loginMe(credenciales)
    if (!fetched.success) {
      toast.error(fetched.message, { theme: "dark", position: "top-left" })

      return
    }
    if (fetched.success) {
      toast.success(fetched.message, { theme: "dark", autoClose: 1500 })
    }

    const decoded = {
      tokenData: decodeToken(fetched.token),
      token: fetched.token,
    }

    dispatch(login({ credentials: decoded }))

    // Go to SuperAdmin Managment
    if (decoded?.tokenData?.roleName === "super_admin") {
      navigate("/managment")
      return
    }

    // Home redirected
    setTimeout(() => {
      navigate("/home")
    }, SUCCESS_MSG_TIME)
  }

  useEffect(() => {
    toast.dismiss() //clear all the messages
    credencialesError.emailError &&
      toast.warn(credencialesError.emailError, { theme: "dark" })
    credencialesError.passwordError &&
      toast.warn(credencialesError.passwordError, { theme: "dark" })
    setTimeout(() => {
      if (credencialesError.passwordError || credencialesError.emailError) {
        setCredencialesError({
          emailError: "",
          passwordError: "",
        })
      }
    }, ERROR_MSG_TIME)
  }, [credencialesError])

  return (
    <div className="loginDesign">
      {/* <pre>{JSON.stringify(credenciales, null, 2)}</pre> */}
      <label>Name:</label>
      <CustomInput
        className={`inputDesign ${
          credencialesError.emailError !== "" ? "inputDesignError" : ""
        }`}
        type="email"
        name="email"
        value={credenciales.email || ""}
        placeholder="email"
        functionChange={inputHandler}
        onBlurFunction={(e) => checkError(e)}
      />
      <label>Password:</label>
      <CustomInput
        className={`inputDesign ${
          credencialesError.passwordError !== "" ? "inputDesignError" : ""
        }`}
        type="password"
        name="password"
        value={credenciales.password || ""}
        placeholder="password"
        functionChange={inputHandler}
        onBlurFunction={(e) => checkError(e)}
      />
      <CustomButton
        className={"primaryButton"}
        title={"Log in"}
        functionEmit={logMe}
      />
      <div className="footerRedirection">
        <div>Don't have an account? </div>
        <div className="linkToRegister" onClick={() => navigate("/register")}>
          Sign Up
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
