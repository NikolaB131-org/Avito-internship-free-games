import { InitialState } from './types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchGameById } from './thunks';
import { saveGameToCache } from '../../../utils/caching';
import { DEFAULT_ERROR_MESSAGE } from '../../../constants';

const initialState: InitialState = {
  game: null,
  status: 'idle',
  errorMessage: '',
};

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGameById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchGameById.fulfilled, (state, action) => {
        state.game = action.payload;
        state.status = 'idle';
        saveGameToCache(action.payload); // сохранение игры в кэш
      })
      .addCase(fetchGameById.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.error.message ?? DEFAULT_ERROR_MESSAGE;
      })
  },
});

export default slice.reducer;
