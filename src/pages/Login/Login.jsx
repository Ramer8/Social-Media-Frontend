import { useState, useEffect } from "react"
import { decodeToken } from "react-jwt"
import { CustomInput } from "../../common/CustomInput/CustomInput"

import "./Login.css"
import { loginMe } from "../../services/apiCalls"

export const Login = ({ msgError, setMsgError, credential, setCredential }) => {
  // const [msgError, setMsgError] = useState("")

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  })

  const ERROR_MSG_TIME = 4000

  console.log(credential)
  if (credential) {
    credenciales.email = credential.email
  }

  //ya esta el redireccionamiento a login luego de register, poner autocompletar en los campos asi es mas facil logearse.
  // y luego del login ir a home para mostrar el perfil..
  //..poner un if si credential tiene valor setearlo en e.target.value

  // const inputHandlerPostRegister = (e) => {
  //   e.target.value = "caca"

  //   setCredenciales((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }))
  // }

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

    if (!fetched.success) {
      setMsgError(fetched.message)
      setTimeout(() => {
        setMsgError("")
      }, ERROR_MSG_TIME)
      return
    }
    const decodificado = decodeToken(fetched.token)

    sessionStorage.setItem("token", fetched)
    sessionStorage.setItem("user", JSON.stringify(decodificado))

    //redireccion a Home
  }

  return (
    <div className="loginDesign">
      {/* <pre>{JSON.stringify(credenciales, null, 2)}</pre> */}
      <CustomInput
        design="inputDesign"
        type="email"
        //   la clave para que el bindeo funcione es que la propiedad name se llame
        //   exactamente igual que la propiedad homónima en el hook de estado, ejemplo: credenciales.email
        name="email"
        value={credenciales.email || ""}
        placeholder="write your email...."
        functionChange={inputHandler}
      />
      <CustomInput
        design="inputDesign"
        type="password"
        //   la clave para que el bindeo funcione es que la propiedad name se llame
        //   exactamente igual que la propiedad homónima en el hook de estado, ejemplo: credenciales.password
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
