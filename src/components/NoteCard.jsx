import React from 'react';

// BUG: unused imports
import { useEffect, useCallback } from 'react';

function NoteCard({ note, onDelete, onEdit }) {
  // BUG: unused variable
  const cardStyle = { padding: '10px' };
  
  // BUG: == instead of ===
  const isLongNote = note.content.length == 0 ? false : note.content.length > 200;

  const formatDate = (dateString) => {
    // BUG: could throw if dateString is invalid, no error handling
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // BUG: unused function
  const truncateContent = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{isLongNote ? note.content.substring(0, 200) + '...' : note.content}</p>
      <div className="note-meta">
        Created: {formatDate(note.createdAt)}
        {note.updatedAt !== note.createdAt && (
          <span> | Updated: {formatDate(note.updatedAt)}</span>
        )}
      </div>
      <div className="note-actions">
        <button className="btn btn-primary" onClick={() => onEdit(note)}>
          ✏️ Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(note.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
