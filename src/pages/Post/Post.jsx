import { useState } from "react"
import { CustomInput } from "../../common/CustomInput/CustomInput"
import { useDispatch, useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { createPost } from "../../services/apiCalls"

const Post = () => {
  const [post, setPost] = useState({
    content: "",
  })
  const rdxUser = useSelector(userData)

  const inputHandler = (e) => {
    setPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    newPost(post)
  }
  const newPost = async (post) => {
    try {
      const fetched = await createPost(post, rdxUser.credentials.token)
      console.log(fetched)
      if (fetched?.success) {
        //    toast.success(fetched.message, { theme: "dark" })
      }
      //  setPost({ post: "", posts_id: "" })
      //  setAppointmentChanged(!appointmentChanged)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <>
        <div className="postBox">
          <lable>Insert your post</lable>
          <CustomInput
            className="inputPost"
            type="text"
            name="post"
            value={post || ""}
            placeholder="write your post...."
            functionChange={inputHandler}
            // onBlurFunction={(e) => checkError(e)}
          />
        </div>
      </>
    </div>
  )
}

export default Post
