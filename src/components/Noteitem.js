import React,{ useContext } from 'react'
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import noteContext from "../context/notes/NoteContext";

function Noteitem(props) {
  const context = useContext(noteContext);
  const {deletenote} = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title aligen-aitems-center">{note.title}</h5>
          <p className="card-text"> {note.description}</p>
          <p className="card-text"> {note._id}</p>
          <MdDeleteOutline  className="mx-3" onClick={()=>{deletenote(note._id)}}/>
          <AiOutlineEdit className="mx-3"  onClick={()=>{updateNote(note)}} />
        </div>
      </div>
    </div>
  )
}



export default Noteitem