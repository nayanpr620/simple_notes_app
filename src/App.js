/* ================================================
   Notes App - Main Application Component
   ================================================
   
   BUG INVENTORY (intentional CI/CD errors):
   1. Unused imports (ESLint error)
   2. Unused variables (ESLint error)  
   3. Missing key prop in list rendering (React warning)
   4. console.log statements (lint warning)
   5. == instead of === (lint error)
   6. Variable declared but never used
   7. Unreachable code after return
   8. Missing dependency in useEffect
================================================ */

import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import SearchBar from './components/SearchBar';
import './App.css';

// BUG: unused variable (ESLint error)
const API_URL = "https://api.notes-app.com/v1";
const MAX_NOTES = 1000;
const DEBUG_MODE = true;

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  // BUG: unused variable (ESLint error)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // BUG: unused variable
  const [sortOrder, setSortOrder] = useState('desc');

  // BUG: missing dependency in useEffect array (React hooks lint error)
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    // BUG: console.log left in code (lint warning)
    console.log("Notes loaded from localStorage", darkMode);
  }, []);

  // BUG: useEffect missing cleanup and has missing dependency
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    document.title = `Notes App (${notes.length} notes)`;
    console.log("Notes saved:", notes.length);
  }, [notes]);

  const addNote = (title, content) => {
    // BUG: == instead of === (ESLint error)
    if (title == '' || content == '') {
      alert('Please fill in both title and content');
      return;
    }

    const newNote = {
      id: uuidv4(),
      title: title,
      content: content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // BUG: unused property that references undefined variable
      category: defaultCategory,
    };

    setNotes(prevNotes => [newNote, ...prevNotes]);
    setEditingNote(null);
  };

  const deleteNote = (id) => {
    // BUG: console.log in production code
    console.log("Deleting note:", id);
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const updateNote = (id, title, content) => {
    setNotes(prevNotes =>
      prevNotes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            title,
            content,
            updatedAt: new Date().toISOString(),
          };
        }
        return note;
      })
    );
    setEditingNote(null);
  };

  // BUG: function declared but never used
  const archiveNote = (id) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      console.log("Archiving note:", note.title);
    }
    return;
    // BUG: unreachable code after return
    setNotes(prevNotes => prevNotes.filter(n => n.id !== id));
  };

  // BUG: function uses == instead of ===
  const filteredNotes = notes.filter(note => {
    if (searchTerm == '') return true;
    return (
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // BUG: unused function
  const exportNotes = () => {
    const data = JSON.stringify(notes);
    console.log("Exported data: ", data);
    return data;
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <header className="app-header">
        <h1>📝 Notes App</h1>
        <div className="header-controls">
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <span className="note-count">{notes.length} notes</span>
        </div>
      </header>

      <main className="app-main">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        <NoteEditor
          onSave={editingNote ? 
            (title, content) => updateNote(editingNote.id, title, content) : 
            addNote
          }
          editingNote={editingNote}
          onCancel={() => setEditingNote(null)}
        />

        <NoteList
          notes={filteredNotes}
          onDelete={deleteNote}
          onEdit={setEditingNote}
        />
      </main>

      <footer className="app-footer">
        <p>Notes App &copy; 2024 - Built with React</p>
      </footer>
    </div>
  );
}

export default App;
