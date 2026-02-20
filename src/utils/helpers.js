// Utility functions for the Notes App

// BUG: unused import
const { v4: uuidv4 } = require('uuid');

// BUG: function has a logic error - doesn't handle edge cases
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  // BUG: no null/undefined check
  return date.toLocaleDateString();
};

// BUG: uses var instead of const/let
export const generateId = () => {
  var timestamp = Date.now();
  var random = Math.random().toString(36).substring(2, 9);
  return `${timestamp}-${random}`;
};

// BUG: unused export
export const validateNote = (note) => {
  // BUG: == instead of ===
  if (note.title == null || note.title == undefined) {
    return false;
  }
  if (note.content == null || note.content == undefined) {
    return false;
  }
  return true;
};

// BUG: unused export with unreachable code
export const sortNotes = (notes, order) => {
  return notes.sort((a, b) => {
    if (order === 'asc') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  // BUG: unreachable code
  console.log("Notes sorted");
  return notes;
};

// BUG: mixing module systems (require + export)
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// BUG: unused constant
const STORAGE_KEY = 'notes-app-data';
const BACKUP_KEY = 'notes-app-backup';
