import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import notesReducer from './notesSlice';
import hostelReducer from './hostelSlice';
import journalReducer from './journalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    hostels: hostelReducer,
    journal: journalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
