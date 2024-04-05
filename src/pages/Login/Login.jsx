import { useEffect, useState } from "react"
import { decodeToken } from "react-jwt"
import { CustomInput } from "../../common/CustomInput/CustomInput"

import "./Login.css"
import { loginMe } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"
import { validame } from "../../utils/functions"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const Login = ({
  msgError,
  setMsgError,
  credential,
  setCredential,
  usefullDataToken,
  setUsefullDataToken,
}) => {
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  })

  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: "",
  })

  const ERROR_MSG_TIME = 6000
  const SUCCESS_MSG_TIME = 3000

  const navigate = useNavigate()

  setTimeout(() => {
    setMsgError("")
  }, ERROR_MSG_TIME)

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

    if (fetched.success) {
      setCredential("")
    }

    if (!fetched.success) {
      toast.error(fetched.message, { theme: "dark", position: "top-left" })

      return
    }
    if (fetched.success) {
      toast.success(fetched.message, { theme: "dark" })
    }

    const decodificado = decodeToken(fetched.token)
    console.log(decodificado)

    //ahora si funciona esta forma de guardar en localstorage
    localStorage.setItem("decodificado", JSON.stringify(decodificado))
    let a = JSON.parse(localStorage.getItem("decodificado"))

    console.log(a)

    sessionStorage.setItem("token", fetched)
    sessionStorage.setItem("user", JSON.stringify(decodificado))

    setUsefullDataToken({
      tokenData: decodeToken(fetched.token),
      token: fetched.token,
    })

    //Home redirected
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

      <div className="loginButton" onClick={logMe}>
        Log me!
      </div>
      <ToastContainer />
    </div>
  )
}
