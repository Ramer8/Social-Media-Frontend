import { useEffect, useState } from "react"
import { fetchMyProfile } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"

import "./Home.css"
// import Card from "../../common/Card/Card"

export const Home = () => {
  const [tokenStorage, setTokenStorage] = useState(
    JSON.parse(localStorage.getItem("decoded"))?.token
  )
  const [showProfile, setShowProfile] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchMyProfile(tokenStorage)
        if (!fetched?.success) {
          //  setMsgError(fetched.message)
          if (!tokenStorage === undefined) {
            throw new Error("Failed to fetch profile data")
          }
          //  throw new Error("Failed to fetch profile data")
        }
        const data = await fetched
        setShowProfile(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetching()
  }, [tokenStorage]) // Execute useEffect whenever the token changes
  console.log(showProfile)

  return (
    <div className="homeDesign">
      <div className="homeBody">
        <h1>Profile</h1>
        <div className="buttonProfile" onClick={() => navigate("/profile")}>
          go to profile
        </div>
        <div className="buttonProfile" onClick={() => navigate("/post")}>
          go to post
        </div>

        {showProfile && (
          <>
            {/* <Card
            name={showProfile?.name}
            email={showProfile.email}
            id={showProfile._id}
            followers={showProfile.followers}
            following={showProfile.following}

            usefullDataToken={usefullDataToken}
            setUsefullDataToken={setUsefullDataToken}
          /> */}
          </>
        )}
        <div>Copyright 2024 Social Site Ltd. </div>
      </div>
    </div>
  )
}
