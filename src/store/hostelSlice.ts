import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Hostel {
  id: string;
  name: string;
  image: string;
  price: number;
  distance: number;
  rating: number;
  reviews: number;
  amenities: string[];
  gender: 'Boys' | 'Girls' | 'Mixed';
  available: number;
  verified: boolean;
  ownerId: string;
  description?: string;
}

interface HostelState {
  hostels: Hostel[];
}

const initialState: HostelState = {
  hostels: JSON.parse(localStorage.getItem('campusease_hostels') || '[]'),
};

const hostelSlice = createSlice({
  name: 'hostels',
  initialState,
  reducers: {
    addHostel: (state, action: PayloadAction<Hostel>) => {
      state.hostels.unshift(action.payload);
      localStorage.setItem('campusease_hostels', JSON.stringify(state.hostels));
    },
    deleteHostel: (state, action: PayloadAction<string>) => {
      state.hostels = state.hostels.filter(hostel => hostel.id !== action.payload);
      localStorage.setItem('campusease_hostels', JSON.stringify(state.hostels));
    },
    updateHostel: (state, action: PayloadAction<Hostel>) => {
      const index = state.hostels.findIndex(hostel => hostel.id === action.payload.id);
      if (index !== -1) {
        state.hostels[index] = action.payload;
        localStorage.setItem('campusease_hostels', JSON.stringify(state.hostels));
      }
    },
  },
});

export const { addHostel, deleteHostel, updateHostel } = hostelSlice.actions;
export default hostelSlice.reducer;
