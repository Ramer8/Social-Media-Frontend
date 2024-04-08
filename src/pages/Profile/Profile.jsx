import { useNavigate } from "react-router-dom"
import "./Profile.css"
import { fetchMyProfile, updateProfile } from "../../services/apiCalls"
import { useEffect, useState } from "react"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { CustomInput } from "../../common/CustomInput/CustomInput"

import { useDispatch, useSelector } from "react-redux"
import { logout, userData } from "../../app/slices/userSlice"
import { validame } from "../../utils/functions"
import { CustomButton } from "../../common/CustomButton/CustomButton"

const Profile = () => {
  const [write, setWrite] = useState("disabled")

  const [loadedData, setLoadedData] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState("")

  const [user, setUser] = useState({
    name: "",
  })

  const [userError, setUserError] = useState({
    nameError: "",
  })

  const rdxUser = useSelector(userData)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const ERROR_MSG_TIME = 6000
  const SUCCESS_MSG_TIME = 3000

  console.log("the credentials ", rdxUser?.credentials)
  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/")
    }
  }, [rdxUser])

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value)

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }))
  }

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/")
    }
  }, [rdxUser])

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchMyProfile(rdxUser.credentials.token)

        if (!fetched?.success) {
          if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED") {
            dispatch(logout({ credentials: "" }))
            toast.error(fetched.message, {
              theme: "dark",
              position: "top-left",
            })
            navigate("/login")
          }
          if (!rdxUser.credentials.token === undefined) {
            throw new Error("Failed to fetch profile data")
          }
          toast.error(fetched.message, {
            theme: "dark",
            position: "top-left",
          })
          throw new Error("Failed to fetch profile data")
        }
        setLoadedData(true)
        console.log(fetched.data.name)
        setUser({
          name: fetched.data.name,
        })
      } catch (error) {
        console.error(error)
      }
    }
    if (!loadedData) {
      fetching()
    }
  }, [rdxUser.credentials.token]) // Execute useEffect whenever the user changes

  const updateData = async () => {
    console.log("antes del if", userError.name)
    if (!userError.name) {
      console.log("no hya error", userError.name)
      try {
        const fetched = await updateProfile(user, rdxUser.credentials.token)
        setUser({
          name: fetched.data.name,
        })
        setWrite("disabled")
        console.log(fetched)
        toast.success(fetched.message, { theme: "dark" })
      } catch (error) {
        console.log(error)
      }

      return
    }
  }
  useEffect(() => {
    toast.dismiss()
    userError.nameError && toast.warn(userError.nameError, { theme: "dark" })
    // setTimeout(() => {
    //   if (userError.nameError) {
    //     setUserError({
    //       nameError: "",
    //     })
    //   }
    // }, ERROR_MSG_TIME)
  }, [userError])
  console.log(userError.nameError !== "")
  console.log(userError.nameError.length !== 0)
  return (
    <>
      <div className="profileDesign">
        {!loadedData ? (
          <div>CARGANDO</div>
        ) : (
          <div className="boxProfile">
            <div className="rowName">
              <label>Name:</label>
              <CustomInput
                className={
                  `inputDesign ${
                    userError.nameError.length !== 0 ? "inputDesignError" : ""
                  }` && ` inputDesign ${write === "" ? "" : "inputBlock"}`
                }
                type={"text"}
                placeholder={""}
                name={"name"}
                disabled={write}
                value={user.name || ""}
                functionChange={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
              />
            </div>
            <CustomButton
              className={
                write === ""
                  ? "primaryButton updateData"
                  : "primaryButton editButton"
              }
              title={write === "" ? "Save" : "Edit"}
              functionEmit={write === "" ? updateData : () => setWrite("")}
            />
          </div>
        )}
      </div>
      <ToastContainer />
      {/* <div className="footer">
        {msgSuccess && <div className="error success">{msgSuccess}</div>}
        {userError.emailError && (
          <div className="error">{userError.emailError}</div>
        )}
        {userError.passwordBodyError && (
          <div className="error">{userError.passwordBodyError}</div>
        )}
      </div> */}
    </>
  )
}

export default Profile
