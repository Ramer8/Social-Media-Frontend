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
import {
  calculateProgress,
  calulateAge,
  formatDate,
  formatDateToHumansWay,
} from "../../utils/functions"

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
      {showProfile && (
        <div className="coverPage">
          <div className="headerCoverPage">
            <div className="backgroundHero">
              <img
                className="backgroundHero"
                src="https://shreethemes.in/doctris/layouts/assets/images/bg/bg-profile.jpg"
                width="100"
                alt="backgroundHero"
              ></img>
            </div>
          </div>
          <img
            className="picProfile"
            src="/picporifile.jpeg"
            width=""
            alt="profilePic"
          />
          <div className="name">{showProfile.name}</div>
          <div className="age">
            {`${
              isNaN(calulateAge(showProfile.birthday))
                ? ""
                : calulateAge(showProfile.birthday) + " Years old"
            }`}
          </div>
          <div className="bodyProfile">
            <div className="percentageBlock">
              <div className="titleProfile">
                <div>Complete Your Profile</div>
                <div>{calculateProgress(showProfile)}%</div>
              </div>
              <div className="percentBar">
                <div
                  className="percent"
                  style={{ width: `${calculateProgress(showProfile)}%` }}
                >
                  .
                </div>
                {/* <div className="percent" style={{ width: "89%" }}>
                  .
                </div> */}
              </div>
            </div>
            <div className="dataProfile">
              <div className="row">
                <div className="key">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>{" "}
                  Gender
                </div>
                <div className="gender">{showProfile.gender}</div>
              </div>
              <div className="row">
                <div className="key">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                  </svg>{" "}
                  Birthday
                </div>
                <div className="birthday">
                  {formatDateToHumansWay(showProfile.birthday)}{" "}
                </div>
              </div>
              <div className="row">
                <div className="key">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-book"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                  </svg>{" "}
                  Phone No.
                </div>
                <div className="phone">{showProfile.phone}</div>
              </div>
              <div className="row">
                <div className="key">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"
                    />
                  </svg>{" "}
                  Address
                </div>
                <div className="address">{showProfile.address}</div>
              </div>
            </div>
          </div>
        </div>
      )}
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
