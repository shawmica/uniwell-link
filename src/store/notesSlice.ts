import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: string;
  title: string;
  content: string;
  fileName: string;
  uploadDate: string;
  userId: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: JSON.parse(localStorage.getItem('campusease_notes') || '[]'),
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
      localStorage.setItem('campusease_notes', JSON.stringify(state.notes));
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      localStorage.setItem('campusease_notes', JSON.stringify(state.notes));
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
        localStorage.setItem('campusease_notes', JSON.stringify(state.notes));
      }
    },
  },
});

export const { addNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
