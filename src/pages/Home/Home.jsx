import { useEffect, useState } from "react"
import { fetchMyProfile, searchUsers } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

import "./Home.css"
import Profile from "../Profile/Profile"
import Post from "../Post/Post"
import { searchUserData } from "../../app/slices/searchUserSlice"
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"

export const Home = () => {
  const [activeMenu, setActiveMenu] = useState(false)
  const [showProfile, setShowProfile] = useState()

  const navigate = useNavigate()

  const rdxUser = useSelector(userData)

  const searchCriteria = useSelector(searchUserData)
  // console.log(searchCriteria)  if not use this I can delete it!
  // when arrive to home view load the value from magament by redux

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchMyProfile(rdxUser.credentials.token)
        if (!fetched?.success) {
          if (!rdxUser.credentials.token === undefined) {
            toast.warn(fetched.message, { theme: "dark" })
            throw new Error("Failed to fetch profile data")
          }
        }
        const data = await fetched
        setShowProfile(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetching()
  }, [rdxUser.credentials.token]) // Execute useEffect whenever the token changes

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/login")
    }
  }, [rdxUser])

  const changeBackground = () => {
    setActiveMenu(!activeMenu)
  }

  return (
    <div className="homeDesign">
      <div className="boxContainer">
        <div className="headerContainer">
          <div
            className={`title ${activeMenu ? "active" : ""}`}
            id="Profile"
            onClick={() => changeBackground()}
          >
            Profile{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
          </div>
          <div
            className={`title ${!activeMenu ? "active " : ""}`}
            id="ProfileSetting"
            onClick={() => changeBackground()}
          >
            Profile Setting{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-gear"
              viewBox="0 0 16 16"
            >
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
            </svg>
          </div>
        </div>
        {activeMenu && (
          <div className="bodyProfile">
            <Post />
          </div>
        )}
        {!activeMenu && (
          <div className="bodyProfileSetting">
            <Profile />
          </div>
        )}
      </div>

      <div className="homefooter">
        <div>Copyright 2024 Social Site Ltd. All Right Reserved. </div>
      </div>
      <ToastContainer />
    </div>
  )
}
