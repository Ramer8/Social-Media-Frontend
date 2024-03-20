import { useEffect, useState } from "react"
import { fetchMyProfile } from "../../services/apiCalls"
import "./Home.css"
import Card from "../../common/Card/Card"

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
          if (!usefullDataToken === undefined) {
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
  }, [usefullDataToken]) // Execute useEffect whenever the token changes

  return (
    <div className="homeDesign">
      <div>{msgError}</div>
      {dataToShow && (
        <>
          <Card
            name={dataToShow?.name}
            email={dataToShow.email}
            id={dataToShow._id}
            followers={dataToShow.followers}
            following={dataToShow.following}
            usefullDataToken={usefullDataToken}
            setUsefullDataToken={setUsefullDataToken}
          />
        </>
      )}
    </div>
  )
}
