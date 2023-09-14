import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h3>Your Notes</h3>
        {notes.notes !== undefined && (
          <ul>
            {notes.notes.map((note) => (
              <Noteitem key={note._id} note={note} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Notes;
