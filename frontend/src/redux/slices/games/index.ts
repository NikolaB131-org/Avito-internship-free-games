import { InitialState } from './types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchGames } from './thunks';
import { DEFAULT_ERROR_MESSAGE } from '../../../constants';

const initialState: InitialState = {
  games: [],
  status: 'idle',
  errorMessage: '',
};

const slice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGames.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.games = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.payload as string ?? DEFAULT_ERROR_MESSAGE;
      })
  },
});

export default slice.reducer;
