import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Test 1: Basic render test - this one PASSES
test('renders notes app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Notes App/i);
  expect(headerElement).toBeInTheDocument();
});

// Test 2: BUG - This test FAILS because it looks for wrong text
test('renders add note button with correct text', () => {
  render(<App />);
  const buttonElement = screen.getByText('Create New Note');
  expect(buttonElement).toBeInTheDocument();
});

// Test 3: BUG - This test FAILS because the assertion is wrong
test('should start with zero notes', () => {
  render(<App />);
  const noteCount = screen.getByText(/notes/i);
  expect(noteCount).toHaveTextContent('5 notes');
});

// Test 4: BUG - This test FAILS because of incorrect event handling expectation
test('should add a new note when form is submitted', () => {
  render(<App />);
  
  const titleInput = screen.getByPlaceholderText('Note title...');
  const contentInput = screen.getByPlaceholderText('Note content...');
  
  fireEvent.change(titleInput, { target: { value: 'Test Note' } });
  fireEvent.change(contentInput, { target: { value: 'Test Content' } });
  
  // BUG: Looking for a button that doesn't exist with this exact text
  const submitButton = screen.getByText('Submit Note');
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Test Note')).toBeInTheDocument();
});

// Test 5: BUG - This test has a wrong matcher
test('should toggle dark mode', () => {
  render(<App />);
  const toggleButton = screen.getByText(/Dark Mode/i);
  fireEvent.click(toggleButton);
  
  // BUG: toHaveClass is called on wrong element
  const app = document.querySelector('.app');
  expect(app).toHaveClass('dark-theme'); // wrong class name, should be 'dark'
});

// Test 6: BUG - snapshot test that will fail due to undefined variable reference
test('renders search bar', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText('🔍 Search notes...');
  expect(searchInput).toBeInTheDocument();
  expect(searchInput.value).toBe(''); // this one should pass
});
