import { useState } from "react"
import "./Register.css"
import { registerMe } from "../../services/apiCalls"
import { CustomInput } from "../../common/CustomInput/CustomInput"
import { useNavigate } from "react-router-dom"
export const Register = ({
  msgError,
  setMsgError,
  credential,
  setCredential,
}) => {
  const [credenciales, setCredenciales] = useState({
    name: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const regMe = async () => {
    for (let credencial in credenciales) {
      if (credenciales[credencial] === "") {
        setMsgError("No has rellenado todos los campos")
        return
      }
    }

    const fetched = await registerMe(credenciales)

    if (fetched.success) {
      setCredential(credenciales)
      navigate("/login")
    }

    if (!fetched.success) {
      setMsgError(fetched.message)
      return
    }
  }
  return (
    <div className="registerDesign">
      {/* <pre>{JSON.stringify(credenciales, null, 2)}</pre> */}
      <CustomInput
        design="inputDesign"
        type="text"
        name="name"
        value={credenciales.name || ""}
        placeholder="write your name...."
        functionChange={inputHandler}
      />
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

      <div className="registerButton" onClick={regMe}>
        Register me!
      </div>
      <div>{msgError}</div>
      {/* <nav className=" text-yellow-300 font-montse">
        {" "}
        <Link className="text-xl uppercase hover:text-danger" to="/new">
          Go to New
        </Link>
      </nav> */}
    </div>
  )
}
