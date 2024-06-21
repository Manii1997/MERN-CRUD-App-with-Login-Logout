import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { MdClose } from "react-icons/md";

const AddEditNote = ({
  noteData,
  getAllNotes,
  type,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [error, setError] = useState(null);

  // add
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // update

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">
            {type === "edit" ? "Update Note" : "Add Note"}
          </h1>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() =>
              setOpenEditModal({ isShow: false, type: "add", data: null })
            }
          >
            <MdClose className="text-[24px]" />
          </button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success mt-3 text-white">
          {type === "edit" ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddEditNote;
