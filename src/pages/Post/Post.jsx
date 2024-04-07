import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { createPost } from "../../services/apiCalls"

import "./Post.css"
import { CustomButton } from "../../common/CustomButton/CustomButton"
import { CustomInputTextArea } from "../../common/CustomInputTextArea/CustomInputTextArea"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Post = () => {
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
      //  setAppointmentChanged(!appointmentChanged)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <>
        <div className="postDesign">
          <label className="labelTextArea">Insert your post</label>

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
          <CustomButton
            className={"primaryButton"}
            title={"Send Post"}
            functionEmit={() => sendNewPost()}
          />
        </div>
      </>
      <ToastContainer />
    </div>
  )
}

export default Post
