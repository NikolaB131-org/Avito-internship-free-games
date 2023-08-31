import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameDetailed } from '../../../../../backend/src/types';
import { getGameFromCache } from '../../../utils/caching';
import fetchRetry from '../../../utils/fetchRetry';

export const fetchGameById = createAsyncThunk<GameDetailed, number>(
  'game/fetchGameById',
  async (id, { rejectWithValue }) => {
    const cachedGame = getGameFromCache(id); // получение игры из кэша
    if (cachedGame) return cachedGame;

    const response = await fetchRetry(3, `${import.meta.env.VITE_API_URL}/game?id=${id}`);

    if (!response.ok) return rejectWithValue(await response.text());

    return await response.json() as GameDetailed;
  }
);
