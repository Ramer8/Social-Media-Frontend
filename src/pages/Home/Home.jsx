import { useEffect, useState } from "react"
import { fetchMyProfile } from "../../services/apiCalls"
import "./Home.css"

export const Home = ({
  usefullDataToken,
  setUsefullDataToken,
  msgError,
  setMsgError,
}) => {
  const [dataToShow, setDataToShow] = useState()

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchMyProfile(usefullDataToken?.token)
        if (!fetched?.success) {
          //  setMsgError(fetched.message)

          throw new Error("Failed to fetch profile data")
        }
        const data = await fetched
        setDataToShow(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetching()
  }, [usefullDataToken]) // Execute useEffect whenever the token changes

  return (
    <div className="homeDesign">
      <div>{msgError}</div>
      {dataToShow && (
        <div>
          <p>Name: {dataToShow.name}</p>
          <p>Email: {dataToShow.email}</p>
          <p>id: {dataToShow._id}</p>
          <p>followers: {dataToShow.followers}</p>
          <p>following: {dataToShow.following}</p>
        </div>
      )}
    </div>
  )
}
