import { useEffect, useState } from "react"
import "./Register.css"
import { registerMe } from "../../services/apiCalls"
import { CustomInput } from "../../common/CustomInput/CustomInput"
import { useNavigate } from "react-router-dom"
import Spinner from "../../common/Spinner/Spinner"
import { validame } from "../../utils/functions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export const Register = ({
  msgError,
  setMsgError,
  credential,
  setCredential,
}) => {
  const [loadingFlag, setLoadingFlag] = useState(false)
  const [credenciales, setCredenciales] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [credencialesError, setCredencialesError] = useState({
    nameError: "",
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

  const regMe = async () => {
    for (let credencial in credenciales) {
      if (credenciales[credencial] === "") {
        toast.error("No has rellenado todos los campos", { theme: "dark" })
        return
      }
    }

    const fetched = await registerMe(credenciales)

    if (!fetched.success) {
      toast.error(fetched.message, { theme: "dark", position: "top-left" })

      return
    }
    if (fetched.success) {
      toast.success(fetched.message, { theme: "dark" })
    }
    setCredential(credenciales)
    //Login redirected
    setTimeout(() => {
      navigate("/login")
    }, SUCCESS_MSG_TIME)
  }

  useEffect(() => {
    toast.dismiss()
    credencialesError.emailError &&
      toast.warn(credencialesError.emailError, { theme: "dark" })
    credencialesError.passwordError &&
      toast.warn(credencialesError.passwordError, { theme: "dark" })
    credencialesError.nameError &&
      toast.warn(credencialesError.nameError, { theme: "dark" })
    setTimeout(() => {
      if (
        credencialesError.nameError ||
        credencialesError.passwordError ||
        credencialesError.emailError
      ) {
        setCredencialesError({
          nameError: "",
          emailError: "",
          passwordError: "",
        })
      }
    }, ERROR_MSG_TIME)
  }, [credencialesError])

  return (
    <div className="registerDesign">
      {!loadingFlag ? (
        <div>
          {/* <pre>{JSON.stringify(credenciales, null, 2)}</pre> */}
          <CustomInput
            className={`inputDesign ${
              credencialesError.nameError !== "" ? "inputDesignError" : ""
            }`}
            type="text"
            name="name"
            value={credenciales.name || ""}
            placeholder="write your name...."
            functionChange={inputHandler}
            onBlurFunction={(e) => checkError(e)}
          />
          <CustomInput
            className={`inputDesign ${
              credencialesError.emailError !== "" ? "inputDesignError" : ""
            }`}
            type="email"
            name="email"
            value={credenciales.email || ""}
            placeholder="write your email...."
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
            placeholder="write your password...."
            functionChange={inputHandler}
            onBlurFunction={(e) => checkError(e)}
          />
        </div>
      ) : (
        <Spinner />
      )}
      <div className="registerButton" onClick={regMe}></div>
      <ToastContainer />
    </div>
  )
}
