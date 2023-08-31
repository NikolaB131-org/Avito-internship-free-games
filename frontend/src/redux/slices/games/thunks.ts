import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameShort } from '../../../../../backend/src/types';
import { FetchGamesArgs } from './types';
import fetchRetry from '../../../utils/fetchRetry';

export const fetchGames = createAsyncThunk<GameShort[], FetchGamesArgs>(
  'games/fetchGames',
  async ({ platform, category, sortBy }, { rejectWithValue }) => {
    const response = await fetchRetry(
      3, `${import.meta.env.VITE_API_URL}/games?platform=${platform}&category=${category}&sort-by=${sortBy}`
    );

    if (!response.ok) return rejectWithValue(await response.text());

    return await response.json() as GameShort[];
  }
);
