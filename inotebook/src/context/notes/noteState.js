import React, { useState } from "react";
import noteContext from "./NoteContext"
const NoteState = (props) => {
  const host = "http://localhost:4000"
  const notesInitial = []  
  const [notes, setNotes] = useState(notesInitial)
//Get all Notes
const getNotes =async()=> {
  //API call
  const response =await fetch(`${host}/api/notes/fetchallnodes`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmY2I5MmYxYjFmZDk2ZjBkM2Q1YWZlIn0sImlhdCI6MTY5NDI4NDEwMX0.ghvwj4dsR2qupYZ5Y4GW5JsE5MOZzl8wW2I0DlPNP5g"
    },
  });
  const json=await response.json();
  console.log(json)
  setNotes(json)
}
  //Add a Note
  const addNote =async (title, description, tag) => {
    // Todo:API call
    console.log(title,description,tag)
    const response =await fetch(`${host}/api/notes/addnote`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmY2I5MmYxYjFmZDk2ZjBkM2Q1YWZlIn0sImlhdCI6MTY5NDI4NDEwMX0.ghvwj4dsR2qupYZ5Y4GW5JsE5MOZzl8wW2I0DlPNP5g"
      },
      body: JSON.stringify({title,description,tag})
    });
    console.log("adding a new note")
    const note = {
      "_id": "64fcde472458b05ea31178f6",
      "user": "64fcb92f1b1fd96f0d3d5afe",
      "title": title,
      "description": description,
      "tag": tag,
      "timeStamp": "2023-09-09T21:06:15.707Z",
      "__v": 0
    }
     notes.notes.push(note);
     console.log(notes);
     setNotes(notes.notes.concat(note));
  }
  // Delete a Note
  const deleteNote =async(id) => {
    // Todo:API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmY2I5MmYxYjFmZDk2ZjBkM2Q1YWZlIn0sImlhdCI6MTY5NDI4NDEwMX0.ghvwj4dsR2qupYZ5Y4GW5JsE5MOZzl8wW2I0DlPNP5g"
      },
    });
    const json=response.json();
   console.log(json);
    console.log("Note is deleted whose id is " + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmY2I5MmYxYjFmZDk2ZjBkM2Q1YWZlIn0sImlhdCI6MTY5NDI4NDEwMX0.ghvwj4dsR2qupYZ5Y4GW5JsE5MOZzl8wW2I0DlPNP5g"
      },
      body: JSON.stringify({title,description,tag})
    });
    const json=response.json();

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }


  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;