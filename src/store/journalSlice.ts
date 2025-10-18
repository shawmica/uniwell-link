import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface JournalEntry {
  id: string;
  date: string;
  mood: number;
  entry: string;
  userId: string;
}

interface JournalState {
  entries: JournalEntry[];
}

const initialState: JournalState = {
  entries: JSON.parse(localStorage.getItem('campusease_journal') || '[]'),
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addJournalEntry: (state, action: PayloadAction<JournalEntry>) => {
      state.entries.unshift(action.payload);
      localStorage.setItem('campusease_journal', JSON.stringify(state.entries));
    },
    deleteJournalEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
      localStorage.setItem('campusease_journal', JSON.stringify(state.entries));
    },
    updateJournalEntry: (state, action: PayloadAction<JournalEntry>) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
        localStorage.setItem('campusease_journal', JSON.stringify(state.entries));
      }
    },
  },
});

export const { addJournalEntry, deleteJournalEntry, updateJournalEntry } = journalSlice.actions;
export default journalSlice.reducer;
