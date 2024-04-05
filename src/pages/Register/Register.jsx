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
  const ERROR_MSG_TIME = 3000

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
    console.log(credencialesError)
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
        toast.warn("No has rellenado todos los campos")
        setMsgError("No has rellenado todos los campos")
        return
      }
    }

    const fetched = await registerMe(credenciales)

    // if (fetched.success) {
    //   // setTimeout(() => {
    //   // setLoadingFlag(true)
    //   //   navigate("/login")
    //   // }, ERROR_MSG_TIME)
    // }

    if (!fetched.success) {
      setMsgError(fetched.message)
      return
    }
    setCredential(credenciales)
    //Login redirected
    navigate("/login")
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
    }, 6000)
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
      <div
        className="registerButton"
        onClick={
          regMe
          //   ,
          // () => {
          //   setLoadingFlag(true)
          // }
        }
      >
        {loadingFlag ? "Register succesfully" : "Register me!"}
      </div>
      <div className="footer">
        {msgError && <div className="error">{msgError}</div>}
      </div>
      <ToastContainer />
    </div>
  )
}
