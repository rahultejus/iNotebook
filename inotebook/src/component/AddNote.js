import React ,{useContext, useState}from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const { notes,addNote} = context;
   const[note,setNote]=useState({title: "",description: "",tag: "default"})
    const handleClick=(e)=>{
        e.preventDefault();
         addNote(note.title, note.description, note.tag);
    }
    const onChange=(e)=>{
            setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="container my-3">
            <h3>Add a Note</h3>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" class="form-label">title</label>
                    <input type="text" class="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label htmlFor="description" class="form-label">Description</label>
                    <input type="text" class="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
            </div>
  )
}

export default AddNote