import { useEffect, useState } from "react"
import { fetchMyProfile } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"

import "./Home.css"
// import Card from "../../common/Card/Card"

export const Home = ({
  // usefullDataToken,
  // setUsefullDataToken,
  msgError,
  setMsgError,
}) => {
  const [tokenStorage, setTokenStorage] = useState(
    JSON.parse(localStorage.getItem("decoded"))?.token
  )
  const [dataToShow, setDataToShow] = useState()

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
        setDataToShow(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetching()
  }, [tokenStorage]) // Execute useEffect whenever the token changes
  console.log(dataToShow)

  const goProfile = () => {
    navigate("/profile")
  }
  return (
    <div className="homeDesign">
      <div className="homeBody">
        <h1>Profile</h1>
        <div className="buttonProfile" onClick={goProfile}>
          go to profile
        </div>
        <div>{msgError}</div>
        {dataToShow && (
          <>
            {/* <Card
            name={dataToShow?.name}
            email={dataToShow.email}
            id={dataToShow._id}
            followers={dataToShow.followers}
            following={dataToShow.following}
            usefullDataToken={usefullDataToken}
            setUsefullDataToken={setUsefullDataToken}
          /> */}
          </>
        )}
        <div>Copyright 2024 Social Net Ltd. </div>
      </div>
    </div>
  )
}
