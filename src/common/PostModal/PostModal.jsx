import { useState } from "react"
import Modal from "react-modal"
import "./PostModal.css"
import { CustomButton } from "../CustomButton/CustomButton"
import { CustomInputTextArea } from "../CustomInputTextArea/CustomInputTextArea"
const PostModal = ({
  thePost,
  newPost,
  setNewPost,
  postChanged,
  setPostChanged,
  editMyPost,
  inputHandler,
  modalIsOpen,
  setModalIsOpen,
}) => {
  Modal.setAppElement("#root")

  //   function openModal() {
  //     setModalIsOpen(true)
  //   }

  function closeModal() {
    setModalIsOpen(false)
  }
  console.log(thePost._id)
  return (
    <div className="postModalContainter">
      {/* <CustomButton
        className={" addAppointment"}
        title={"Edit Post"}
        functionEmit={openModal}
      /> */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <CustomButton
          className={"closeModalButton"}
          title={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          }
          functionEmit={closeModal}
        />
        <div className="bodyPostModal">
          <label className="labelTextArea">Edit your post</label>
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
            title={"Edit Post"}
            functionEmit={() => editMyPost(thePost._id)}
          />
        </div>
      </Modal>
    </div>
  )
}

export default PostModal
