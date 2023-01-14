import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(noteContext);
  const history=useNavigate();
  const { notes, getNotes, editnote } = context;
  useEffect(() => {
 if(localStorage.getItem('token')){
   getNotes();
  }
  else{
    history("/login")
  }
  // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    editnote(note.id, note.etitle, note.edescription, note.etag,)
    props.showAlert("updated successfully",'success')

  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });

  };

  return (
    <>
      <Addnote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-0 px-4">
              <h1 className="modal-title " id="exampleModalLabel">
                Edit Note
              </h1>
              {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>
            <div className="my-3 mx-3" >
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="etitle"
                    placeholder="Enter Title"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="description"
                    className="form-control"
                    id="description"
                    name="edescription"
                    placeholder="description"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="etag"
                    placeholder="eTag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
                <button
                  disabled={note.etitle.length < 5 || note.edescription.length < 5}
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-primary my-3"
                  onClick={handleClick}
                >
                  update now
                </button>
                {/* <button onClick={handleClick}  type="button" className="btn btn-primary">Update Now</button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 mx-1">
        <h4>Your Notes</h4>
        <div >
          {notes.length === 0 && 'No  notes display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
