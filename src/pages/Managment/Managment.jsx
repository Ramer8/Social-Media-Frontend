import { useEffect, useState } from "react"
import "./Managment.css"
import { useNavigate } from "react-router-dom"
// import { deleteMoreThanOneUsers, fetchAllUsers } from "../../services/apiCalls"
import { CustomButton } from "../../common/CustomButton/CustomButton"
import { ToastContainer, toast } from "react-toastify"

import { useDispatch, useSelector } from "react-redux"
import { logout, userData } from "../../app/slices/userSlice"
import {
  deleteMoreThanOnePosts,
  deleteMoreThanOneUsers,
  fetchAllUsers,
  getAllUsersPosts,
  updateMyPost,
} from "../../services/apiCalls"
import PostElement from "../../common/PostElement/PostElement"

const Managment = () => {
  const [loadedData, setLoadedData] = useState(false)
  const [users, setUsers] = useState()
  const [posts, setPosts] = useState()
  const [usersToDelete, setUsersToDelete] = useState({})
  const [newPost, setNewPost] = useState({
    content: "",
  })
  const [myPosts, setMyPosts] = useState()

  const [postChanged, setPostChanged] = useState(false)

  const [checkButton, setCheckButton] = useState(false)
  const [checkButtonPost, setCheckButtonPost] = useState(false)

  let arrayToDelete = []
  let arrayToDeletePost = []

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
    const fetchingPost = async () => {
      try {
        const fetched = await getAllUsersPosts(rdxUser.credentials.token)

        if (!fetched?.success) {
          if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED") {
            toast.warn(fetched.message, { theme: "dark" })
            navigate("/login")
          }
          if (!rdxUser.credentials.token === undefined) {
            throw new Error("Failed to fetch profile data")
          }
        }
        setPosts(fetched.data)
      } catch (error) {
        console.error(error)
      }
    }
    if (!loadedData) {
      fetching()
      fetchingPost()
    }
  }, [loadedData])

  const handleCheck = (id) => {
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
  const deleteUsers = async () => {
    const usersToRemove = { usersId: arrayToDelete }

    if (arrayToDelete.length === 0) {
      toast.warn("You must select at least one user to delete", {
        theme: "dark",
      })
      return
    }
    try {
      const fetched = await deleteMoreThanOneUsers(
        usersToRemove,
        rdxUser.credentials.token
      )
      if (!fetched?.success) {
        toast.warn(fetched.message, { theme: "dark" })

        if (!rdxUser.credentials.token === undefined) {
          toast.warn("Failed to fetch users data", { theme: "dark" })
          throw new Error("Failed to fetch users data")
        }
      }
      if (fetched?.success) {
        toast.success(fetched.message, { theme: "dark" })
      }
    } catch (error) {
      console.log(error)
    }

    arrayToDelete = []
    setLoadedData(false)
  }

  const handleCheckPost = (id) => {
    setCheckButtonPost(!checkButtonPost)

    const isInArrayPost = arrayToDeletePost.includes(id)
    if (isInArrayPost) {
      const index = arrayToDeletePost.indexOf(id)
      arrayToDeletePost.splice(index, 1)
    } else {
      arrayToDeletePost.push(id)
    }
    console.log(arrayToDeletePost, "del handle los id a borrar")
    setCheckButtonPost(false)

    // setUsersToDelete({ usersId: arrayToDelete })
  }
  const deletePosts = async () => {
    const postsToRemove = { postsId: arrayToDeletePost }

    if (arrayToDeletePost.length === 0) {
      toast.warn("You must select at least one user to delete", {
        theme: "dark",
      })
      return
    }
    try {
      const fetched = await deleteMoreThanOnePosts(
        postsToRemove,
        rdxUser.credentials.token
      )
      if (!fetched?.success) {
        toast.warn(fetched.message, { theme: "dark" })

        if (!rdxUser.credentials.token === undefined) {
          toast.warn("Failed to fetch posts data", { theme: "dark" })
          throw new Error("Failed to fetch posts data")
        }
      }
      if (fetched?.success) {
        toast.success(fetched.message, { theme: "dark" })
      }
    } catch (error) {
      console.log(error)
    }

    arrayToDeletePost = []
    setLoadedData(!loadedData)
  }

  // const editMyPost = async (id) => {
  //   try {
  //     const fetched = await updateMyPost(id, newPost, rdxUser.credentials.token)
  //     if (!fetched?.success) {
  //       if (!rdxUser.credentials.token === undefined) {
  //         throw new Error("Failed to fetch Appointment data")
  //       }
  //     }
  //     if (fetched?.success) {
  //       toast.warn(fetched.message, { theme: "dark" })
  //     }
  //     setPostChanged(!postChanged)
  //     setNewPost({ content: "" })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
              <div>Role</div>
            </div>
            <div className="body-container">
              <div className="body">
                {users?.map((user) => (
                  <div key={user._id} className="row">
                    <div className="idUser">{user._id}</div>
                    <div>{user.name}</div>
                    <div>{user?.email}</div>
                    <div className={`${user.role === "user" && "colorized"}`}>
                      {user.role}
                    </div>
                    <div>
                      <input
                        id="s1"
                        type="checkbox"
                        className="switch"
                        value={checkButton.state}
                        onChange={() => handleCheck(user._id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="postContainerTable">
        {!posts?.length && "No posts loaded"}
        {posts && (
          <div className="PostsTable">
            <div className="preHeader">
              <div className="leftSide colorized">Post list</div>
              <CustomButton
                className={"deletePosts"}
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
                functionEmit={() => deletePosts()}
              />
            </div>
            <div></div>
            <div className="header">
              <div>ID</div>
              <div>Posts</div>
              <div>Likes</div>
              <div>Created at</div>
              <div>Email</div>
            </div>
            <div className="body-container">
              <div className="body">
                {posts?.map((post) => (
                  <div key={post._id} className="row">
                    <div className="idUser">{post._id}</div>
                    <div>{post.content}</div>
                    <div>{post.likes.length}</div>
                    <div>{new Date(post.createdAt).toDateString()}</div>
                    <div>{post?.userId.email}</div>
                    <div>{post?.userId._id}</div>
                    <div>
                      <input
                        id="s1"
                        type="checkbox"
                        className="switch"
                        value={checkButtonPost.state}
                        onChange={() => handleCheckPost(post._id)}
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
