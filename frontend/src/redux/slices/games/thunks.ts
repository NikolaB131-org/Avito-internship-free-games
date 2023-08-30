import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameShort } from '../../../../../backend/src/types';
import { FetchGamesArgs } from './types';

export const fetchGames = createAsyncThunk<GameShort[], FetchGamesArgs>(
  'games/fetchGames',
  async ({ platform, category, sortBy }, { rejectWithValue }) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/games?platform=${platform}&category=${category}&sort-by=${sortBy}`
    );

    if (!response.ok) return rejectWithValue(await response.text());

    return await response.json() as GameShort[];
  }
);
