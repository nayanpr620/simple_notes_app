import React, { useState, useEffect } from 'react';

// BUG: unused import
import { useRef } from 'react';

function NoteEditor({ onSave, editingNote, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // BUG: unused state variable
  const [charCount, setCharCount] = useState(0);

  // BUG: missing dependency (editingNote) would cause stale closure
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // BUG: == instead of ===
    if (title.trim() == '' || content.trim() == '') {
      // BUG: using alert in React app
      alert('Both title and content are required!');
      return;
    }

    onSave(title.trim(), content.trim());
    setTitle('');
    setContent('');
    // BUG: console.log
    console.log("Note saved successfully");
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    onCancel();
  };

  // BUG: unused variable
  const isValid = title.trim() !== '' && content.trim() !== '';

  // BUG: unused function
  const resetForm = () => {
    setTitle('');
    setContent('');
    setCharCount(0);
  }

  return (
    <div className="note-editor">
      <h2>{editingNote ? '✏️ Edit Note' : '➕ Add New Note'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note content..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            // BUG: console.log on every keystroke
            console.log("Content changed:", e.target.value.length, "chars");
          }}
        />
        <div className="editor-buttons">
          <button type="submit" className="btn btn-primary">
            {editingNote ? 'Update Note' : 'Add Note'}
          </button>
          {editingNote && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NoteEditor;
