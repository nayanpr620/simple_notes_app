import { formatDate, generateId, validateNote, sortNotes } from './helpers';

// Test 1: PASSES
test('generateId returns a string', () => {
  const id = generateId();
  expect(typeof id).toBe('string');
});

// Test 2: BUG - FAILS because formatDate doesn't return the expected format
test('formatDate returns correct format', () => {
  const result = formatDate('2024-01-15T10:30:00Z');
  // BUG: expects specific format that depends on locale
  expect(result).toBe('January 15, 2024');
});

// Test 3: BUG - FAILS because of wrong assertion
test('validateNote returns true for valid note', () => {
  const note = { title: 'Test', content: 'Content' };
  const result = validateNote(note);
  // BUG: expects wrong value
  expect(result).toBe(false);
});

// Test 4: BUG - FAILS because the function mutates the array
test('sortNotes should not mutate original array', () => {
  const notes = [
    { createdAt: '2024-01-15T10:00:00Z', title: 'First' },
    { createdAt: '2024-01-16T10:00:00Z', title: 'Second' },
  ];
  const originalFirst = notes[0].title;
  sortNotes(notes, 'desc');
  // BUG: sortNotes uses .sort() which mutates in place
  expect(notes[0].title).toBe(originalFirst);
});

// Test 5: FAILS because validateNote doesn't handle this case
test('validateNote returns false for empty strings', () => {
  const note = { title: '', content: '' };
  const result = validateNote(note);
  expect(result).toBe(false); // BUG: empty strings are not null/undefined, so validateNote returns true
});
