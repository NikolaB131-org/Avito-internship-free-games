import { InitialState, SavedGamesInfo } from './types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchGameById } from './thunks';
import { STORAGE_SAVED_GAMES_INFO_KEY, DEFAULT_ERROR_MESSAGE } from '../../../constants';

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

        // Кэширование
        const savedGamesInfo = localStorage.getItem(STORAGE_SAVED_GAMES_INFO_KEY);
        const gameInfo: SavedGamesInfo = {
          [action.payload.id]: { timestamp: Date.now(), game: action.payload },
        };

        if (savedGamesInfo !== null) { // если в кэше уже есть игры
          const prevGamesInfo = JSON.parse(savedGamesInfo) as SavedGamesInfo;
          localStorage.setItem(STORAGE_SAVED_GAMES_INFO_KEY, JSON.stringify({ ...prevGamesInfo, gameInfo }));
        } else {
          localStorage.setItem(STORAGE_SAVED_GAMES_INFO_KEY, JSON.stringify(gameInfo));
        }
      })
      .addCase(fetchGameById.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.error.message ?? DEFAULT_ERROR_MESSAGE;
      })
  },
});

export default slice.reducer;
