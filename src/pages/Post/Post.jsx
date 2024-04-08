import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import {
  createPost,
  deletePost,
  getMyPosts,
  putlikes,
  updateMyPost,
} from "../../services/apiCalls"

import "./Post.css"
import { CustomButton } from "../../common/CustomButton/CustomButton"
import { CustomInputTextArea } from "../../common/CustomInputTextArea/CustomInputTextArea"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PostModal from "../../common/PostModal/PostModal"

const Post = () => {
  const [myPosts, setMyPosts] = useState()
  const [postChanged, setPostChanged] = useState(false)
  const [isOpenAddPost, setIsOpenAddPost] = useState(false)

  const [newPost, setNewPost] = useState({
    content: "",
  })

  const navigate = useNavigate()

  const rdxUser = useSelector(userData)

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/")
    }
  }, [rdxUser])

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await getMyPosts(rdxUser.credentials.token)
        console.log(fetched.data)
        if (!fetched?.success) {
          if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED")
            navigate("/login")

          //  setMsgError(fetched.message)
          throw new Error("Failed to fetch Posts data")
        }
        setMyPosts(fetched.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetching()
  }, [postChanged])
  const inputHandler = (e) => {
    console.log(e.target.value)
    setNewPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const sendNewPost = () => {
    console.log(newPost.content)
    console.log("sending")
    myNewPost(newPost)
  }
  const myNewPost = async (newPost) => {
    try {
      const fetched = await createPost(newPost, rdxUser.credentials.token)
      console.log(fetched)
      if (!fetched?.success) {
        toast.error(fetched.message, { theme: "dark" })
      }
      if (fetched?.success) {
        toast.success(fetched.message, { theme: "dark" })
      }
      setNewPost({ content: "" })
      setPostChanged(!postChanged)
    } catch (error) {
      console.log(error)
    }
  }
  const likesPost = async (id) => {
    console.log("likes")
    console.log(id)
    try {
      const fetched = await putlikes(id, rdxUser.credentials.token)
      console.log(fetched)
      if (!fetched?.success) {
        toast.error(fetched.message, { theme: "dark" })
      }
      if (fetched?.success) {
        toast.success(fetched.message, { theme: "dark" })
      }
      setPostChanged(!postChanged)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteMyPost = async (id) => {
    console.log(id)
    console.log(newPost)
    try {
      const fetched = await deletePost(id, rdxUser.credentials.token)
      console.log(fetched)
      if (!fetched?.success) {
        if (!rdxUser.credentials.token === undefined) {
          throw new Error("Failed to fetch Appointment data")
        }
      }
      if (fetched?.success) {
        toast.warn(fetched.message, { theme: "dark" })
      }
      setPostChanged(!postChanged)
    } catch (error) {
      console.log(error)
    }
  }

  const editMyPost = async (id) => {
    console.log(id)
    console.log(newPost)
    try {
      const fetched = await updateMyPost(id, newPost, rdxUser.credentials.token)
      console.log(fetched)
      if (!fetched?.success) {
        if (!rdxUser.credentials.token === undefined) {
          throw new Error("Failed to fetch Appointment data")
        }
      }
      if (fetched?.success) {
        toast.warn(fetched.message, { theme: "dark" })
      }
      setPostChanged(!postChanged)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <>
        <div className="postDesign">
          <div className="myPostContainer">
            {!isOpenAddPost && (
              <div className="titlePostContainer">
                <div className="leftSide">My Posts</div>
                <CustomButton
                  className={"addPost"}
                  title={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-plus-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                  }
                  functionEmit={() => setIsOpenAddPost(!isOpenAddPost)}
                />
              </div>
            )}

            {isOpenAddPost && (
              <div className="newPost">
                <CustomInputTextArea
                  className=" textarea "
                  type={"text"}
                  name={"content"} //must be the key name idem like state newPost
                  disabled={""}
                  value={newPost.content || ""}
                  placeholder="write your post...."
                  functionChange={(e) => inputHandler(e)}
                  // onBlurFunction={(e) => checkError(e)}
                />
                <div className="modalButtons">
                  <CustomButton
                    className={"cancelModalButton"}
                    title={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                      </svg>
                    }
                    functionEmit={() => setIsOpenAddPost(!isOpenAddPost)}
                  />
                  <CustomButton
                    className={"sendModalButton"}
                    title={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-send"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                      </svg>
                    }
                    functionEmit={() => sendNewPost()}
                  />
                </div>
              </div>
            )}
            {myNewPost && (
              <div className="postList">
                {myPosts?.map((element) => (
                  <div className="post" key={element._id}>
                    <div className="date">
                      {new Date(element.createdAt)
                        .toDateString()
                        .replace("2024", " ")}
                      {/* poner algoritmo q diga q si es otro año lo ponga sino vacio */}
                      {/* puedo hacer lo mismo con post de hoy o de ayer */}
                    </div>
                    <div className="postContent">{element.content}</div>
                    <PostModal
                      thePost={element}
                      newPost={newPost}
                      setNewPost={setNewPost}
                      postChanged={postChanged}
                      setPostChanged={setPostChanged}
                      inputHandler={inputHandler}
                      editMyPost={editMyPost}
                    />
                    <div className="iconsInteraction">
                      <div className="likesElements">
                        <CustomButton
                          className="likes"
                          title={
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                fill="currentColor"
                                className="bi bi-heart-fill"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                />
                              </svg>{" "}
                            </>
                          }
                          functionEmit={() => likesPost(element._id)}
                        ></CustomButton>{" "}
                        {element.likes.length}
                      </div>
                      <CustomButton
                        className={"closeModalButton"}
                        title={"Delete Post"}
                        functionEmit={() => deleteMyPost(element._id)}
                      />
                      <div className="comments">
                        <CustomButton
                          className="message"
                          title={
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                fill="currentColor"
                                className="bi bi-chat"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                              </svg>{" "}
                              0
                            </>
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
      <ToastContainer />
    </div>
  )
}

export default Post
