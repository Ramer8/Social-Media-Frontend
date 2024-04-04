import { useState } from "react"
import { decodeToken } from "react-jwt"
import { CustomInput } from "../../common/CustomInput/CustomInput"

import "./Login.css"
import { loginMe } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"
import { validame } from "../../utils/functions"

export const Login = ({
  msgError,
  setMsgError,
  credential,
  setCredential,
  usefullDataToken,
  setUsefullDataToken,
}) => {
  // const [msgError, setMsgError] = useState("")

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  })

  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: "",
  })

  const ERROR_MSG_TIME = 4000

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

  // if (credential) {
  //   credenciales.email = credential.email
  //   credenciales.password = credential.password
  // }
  // const { name, ...newcredential } = credential
  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const logMe = async () => {
    for (let credencial in credenciales) {
      if (credenciales[credencial] === "") {
        setMsgError("No has rellenado todos los campos")
        return
      }
    }

    const fetched = await loginMe(credenciales)

    if (fetched.success) {
      setCredential("")
    }

    if (!fetched.success) {
      setMsgError(fetched.message)

      return
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
    navigate("/")
  }

  return (
    <div className="loginDesign">
      {/* <pre>{JSON.stringify(credenciales, null, 2)}</pre> */}
      <CustomInput
        design="inputDesign"
        type="email"
        name="email"
        value={credenciales.email || ""}
        placeholder="email"
        functionChange={inputHandler}
        onBlurFunction={(e) => checkError(e)}
      />
      <CustomInput
        design="inputDesign"
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

      <div className="footer">
        {credencialesError.emailError && (
          <div className="error">{credencialesError.emailError}</div>
        )}
        {credencialesError.passwordBodyError && (
          <div className="error">{credencialesError.passwordError}</div>
        )}
        {msgError && <div className="error">{msgError}</div>}
      </div>
    </div>
  )
}
