import { useNavigate } from "react-router-dom"
import "./Profile.css"
import { fetchMyProfile } from "../../services/apiCalls"
import { useEffect, useState } from "react"
// import { CustomButton } from "../../common/CustomButton/CustomButton"
import { CustomInput } from "../../common/CustomInput/CustomInput"

const Profile = ({ usefullDataToken }) => {
  const [write, setWrite] = useState("disabled")
  const [tokenStorage, setTokenStorage] = useState(
    JSON.parse(localStorage.getItem("decoded"))?.token
  )
  const [loadedData, setLoadedData] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState("")

  const [user, setUser] = useState({
    name: "",
    email: "",
  })

  const [userError, setUserError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
  })

  const navigate = useNavigate()

  const SUCCESS_MSG_TIME = 8000

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const checkError = (e) => {
    //a gusto del consumidor....
  }

  useEffect(() => {
    if (!tokenStorage) {
      navigate("/")
    }
  }, [tokenStorage])

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchMyProfile(tokenStorage)

        if (!fetched?.success) {
          //  setMsgError(fetched.message)
          if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED") {
            console.log("token expired")
            setTokenStorage("")
            localStorage.removeItem("decoded")
            navigate("/login")
          }
          if (!usefullDataToken === undefined) {
            throw new Error("Failed to fetch profile data")
          }
          //  throw new Error("Failed to fetch profile data")
        }
        setLoadedData(true)
        console.log(fetched.data.email)
        setUser({
          name: fetched.data.name,
          email: fetched.data.email,
        })
      } catch (error) {
        console.error(error)
      }
    }
    if (!loadedData) {
      fetching()
    }
  }, [tokenStorage]) // Execute useEffect whenever the user changes

  // const updateData = async () => {
  //   try {
  //     const fetched = await updateProfile(user, tokenStorage)
  //     setUser({
  //       firstName: fetched.firstNameUpdated,
  //       lastName: fetched.lastNameUpdated,
  //       email: fetched.emailUpdated,
  //     })
  //     setWrite("disabled")

  //     setMsgSuccess("Profile Udated")

  //     setTimeout(() => {
  //       setMsgSuccess("")
  //     }, SUCCESS_MSG_TIME)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <>
      <div className="profileDesign">
        <div className="title">Profile Page</div>

        {!loadedData ? (
          <div>CARGANDO</div>
        ) : (
          <div className="boxProfile">
            <div className="rowName">
              <label>Name:</label>
              <CustomInput
                className={
                  `inputDesign ${
                    userError.emailError !== "" ? "inputDesignError" : ""
                  }` && ` inputDesign ${write === "" ? "" : "inputBlock"}`
                }
                type={"text"}
                placeholder={""}
                name={"firstName"}
                disabled={write}
                value={user.firstName || ""}
                functionChange={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
              />
            </div>

            <div className="rowEmail">
              <label htmlFor="email">Email:</label>
              <CustomInput
                id="email"
                className={
                  `inputDesign inputEmail ${
                    userError.emailError !== "" ? "inputDesignError" : ""
                  }` && ` inputDesign ${write === "" ? "" : "inputBlock"}`
                }
                type={"email"}
                placeholder={""}
                name={"email"}
                disabled={write}
                value={user.email || ""}
                functionChange={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
              />
            </div>

            {/* <CustomButton
              className={
                write === ""
                  ? "loginButton updateData"
                  : "loginButton editButton"
              }
              title={write === "" ? "Save" : "Edit"}
              functionEmit={write === "" ? updateData : () => setWrite("")}
            /> */}
          </div>
        )}
      </div>
      <div className="footer">
        {msgSuccess && <div className="error success">{msgSuccess}</div>}
        {userError.emailError && (
          <div className="error">{userError.emailError}</div>
        )}
        {userError.passwordBodyError && (
          <div className="error">{userError.passwordBodyError}</div>
        )}
        {/* {msgError && <div className="error">{msgError}</div>} */}
      </div>
    </>
  )
}

export default Profile
