import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './slices/games';
import gameReducer from './slices/game';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    game: gameReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // для типизированного dispatch в hooks.ts
