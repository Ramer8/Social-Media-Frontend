import { useState, useEffect } from "react"
import { decodeToken } from "react-jwt"
import { CustomInput } from "../../common/CustomInput/CustomInput"

import "./Login.css"
import { loginMe } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"

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

  const navigate = useNavigate()

  // const ERROR_MSG_TIME = 4000

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
  //Asignación dinámica
  //Es ilegal modificar el estado en React directamente
  //Primero creamos una variable placeholder llamada prevState
  //prevState preserva el estado original, es una copia del original.
  //aqui preservamos el estado mediante spread rest
  //si escribo en email, e.target.name valdrá.... email
  //si escribo en password, e.target.name valdrá.... password
  //al usar los corchetes, estamos entrando en la propiedad del objeto

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
        placeholder="write your email...."
        functionChange={inputHandler}
      />
      <CustomInput
        design="inputDesign"
        type="password"
        name="password"
        value={credenciales.password || ""}
        placeholder="write your password...."
        functionChange={inputHandler}
      />
      <div className="loginButton" onClick={logMe}>
        Log me!
      </div>
      <div>{msgError}</div>
    </div>
  )
}
