import React from 'react';
import NoteCard from './NoteCard';

// BUG: unused import
import { useState } from 'react';

function NoteList({ notes, onDelete, onEdit }) {
  // BUG: console.log in component
  console.log("Rendering NoteList with", notes.length, "notes");

  // BUG: unused variable
  const listRef = null;

  if (notes.length === 0) {
    return (
      <div className="note-list">
        <div className="empty-state">
          <h3>📭 No notes yet</h3>
          <p>Create your first note above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="note-list">
      <h2 className="note-list-header">Your Notes ({notes.length})</h2>
      {/* BUG: Missing key prop in list rendering */}
      {notes.map((note) => (
        <NoteCard
          note={note}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default NoteList;
