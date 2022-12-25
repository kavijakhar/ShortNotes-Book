import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/NoteContext";

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("YOur note has added successfully",'success')
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (  
        <div>
            <div className="container md-3">
                <h3>Add a Note</h3>
                <form>
                    <div className="form-group"> 
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} />  
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} placeholder="description" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="Tag" value={note.tag} onChange={onChange} />
                    </div>
                   
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit"  className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )

}

export default Addnote;