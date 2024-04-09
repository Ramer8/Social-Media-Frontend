import { useEffect, useState } from "react"
import "./Managment.css"
import { useNavigate } from "react-router-dom"
// import { deleteMoreThanOneUsers, fetchAllUsers } from "../../services/apiCalls"
import { CustomButton } from "../../common/CustomButton/CustomButton"
import { ToastContainer, toast } from "react-toastify"

import { useDispatch, useSelector } from "react-redux"
import { logout, userData } from "../../app/slices/userSlice"
import { fetchAllUsers } from "../../services/apiCalls"

const Managment = () => {
  const [loadedData, setLoadedData] = useState(false)
  const [users, setUsers] = useState()
  const [usersToDelete, setUsersToDelete] = useState({})

  const [checkButton, setCheckButton] = useState(false)

  let arrayToDelete = []

  const rdxUser = useSelector(userData)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/")
    }
  }, [rdxUser])

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchAllUsers(rdxUser.credentials.token)

        if (!fetched?.success) {
          if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED") {
            toast.warn(fetched.message, { theme: "dark" })
            localStorage.removeItem("decoded")
            navigate("/login")
          }
          if (!rdxUser.credentials.token === undefined) {
            throw new Error("Failed to fetch profile data")
          }
        }
        setLoadedData(true)
        setUsers(fetched.data)
      } catch (error) {
        console.error(error)
      }
    }
    if (!loadedData) {
      fetching()
    }
  }, [loadedData])

  const handleCheck = (e, id) => {
    setCheckButton(!checkButton)

    const isInArray = arrayToDelete.includes(id)
    if (isInArray) {
      const index = arrayToDelete.indexOf(id)
      arrayToDelete.splice(index, 1)
    } else {
      arrayToDelete.push(id)
    }
    setCheckButton(false)

    // setUsersToDelete({ usersId: arrayToDelete })
  }
  // localhost:4000/api/users
  //   const deleteUsers = async () => {
  //     const usersToRemove = { usersId: arrayToDelete }
  //     if (usersToRemove.length === 0) {
  //       toast.warn("You must select at least one user to delete", {
  //         theme: "dark",
  //       })
  //       return
  //     }
  //     try {
  //       const fetched = await deleteMoreThanOneUsers(
  //         usersToRemove,
  //         rdxUser.credentials.token
  //       )
  //       if (!fetched?.success) {
  //         toast.warn(fetched.message, { theme: "dark" })

  //         if (!tokenStorage === undefined) {
  //           toast.warn("Failed to fetch Appointment data", { theme: "dark" })
  //           throw new Error("Failed to fetch Appointment data")
  //         }
  //       }
  //       if (fetched?.success) {
  //         toast.success(fetched.message, { theme: "dark" })
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }

  //     arrayToDelete = [""]
  //     setLoadedData(false)
  //   }
  return (
    <div className="managmentDesign">
      <div className="userContainer">
        {!users?.length && "No users loaded"}
        {users && (
          <div className="table">
            <div className="preHeader">
              <div className="leftSide">
                User list
                {/* {arrayToDelete.length == !0 && `Selected ${arrayToDelete.length}`} */}
              </div>
              <CustomButton
                className={"deleteUsers"}
                title={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
                }
                functionEmit={() => deleteUsers()}
              />
            </div>
            <div className="header">
              <div>ID</div>
              <div>Name</div>
              <div>Email</div>
            </div>
            <div className="body-container">
              <div className="body">
                {users?.map((user) => (
                  <div key={user._id} className="row">
                    <div>{user._id}</div>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                    <div>
                      <input
                        id="s1"
                        type="checkbox"
                        className="switch"
                        value={checkButton.state}
                        onChange={(e) => handleCheck(e, user._id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Managment
