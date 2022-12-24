import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

function NotesState(props) {
  const host = "http://localhost:5000";
  const notesInitial = [];

  // Add a note
  const [notes, setNotes] = useState(notesInitial);

  // get all notes
  const getNotes = async () => {
    // api call
    const response = await fetch(`${host}/api/notes/fatchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5NmE2ZjYyMDZiZGMzNWNkOGY2ODgyIn0sImlhdCI6MTY3MDgxNzUyNn0.Yvqg-hBAqBf9KEMBVSdLclPzoRtJx742z7MNv5UuERU",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // add a new note
  const addNote = async (title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5NmE2ZjYyMDZiZGMzNWNkOGY2ODgyIn0sImlhdCI6MTY3MDgxNzUyNn0.Yvqg-hBAqBf9KEMBVSdLclPzoRtJx742z7MNv5UuERU",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // delete a note
  const deletenote = async (id) => {
    //  api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5NmE2ZjYyMDZiZGMzNWNkOGY2ODgyIn0sImlhdCI6MTY3MDgxNzUyNn0.Yvqg-hBAqBf9KEMBVSdLclPzoRtJx742z7MNv5UuERU",
      },
    });
    const json = await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // edit a note
  const editnote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5NmE2ZjYyMDZiZGMzNWNkOGY2ODgyIn0sImlhdCI6MTY3MDgxNzUyNn0.Yvqg-hBAqBf9KEMBVSdLclPzoRtJx742z7MNv5UuERU",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <div>
      <NoteContext.Provider
        value={{ notes, addNote, deletenote, editnote, getNotes }}
      >
        {props.children}
      </NoteContext.Provider>
    </div>
  );
}

export default NotesState;
