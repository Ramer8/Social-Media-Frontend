import Modal from "react-modal"
import "./PostModal.css"
import { CustomButton } from "../CustomButton/CustomButton"
import { CustomInputTextArea } from "../CustomInputTextArea/CustomInputTextArea"
const PostModal = ({
  thePost,
  newPost,
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
  const preEditMyPost = (id) => {
    editMyPost(id)
    closeModal()
  }
  return (
    <div className="postModalContainter">
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
            className="textareaNewPost textareaEditPost"
            type={"text"}
            name={"content"} //must be the key name idem like state newPost
            disabled={""}
            value={newPost.content || thePost.content || ""}
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
              functionEmit={closeModal}
            />
            <CustomButton
              className={"sendModalButton"}
              title={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-upload"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                </svg>
              }
              functionEmit={() => preEditMyPost(thePost._id)}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PostModal
