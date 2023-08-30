import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameDetailed } from '../../../../../backend/src/types';
import { getGameFromCache } from '../../../utils/caching';

export const fetchGameById = createAsyncThunk<GameDetailed, number>(
  'game/fetchGameById',
  async (id, { rejectWithValue }) => {
    const cachedGame = getGameFromCache(id); // получение игры из кэша
    if (cachedGame) return cachedGame;

    const response = await fetch(`${import.meta.env.API_URL}/game?id=${id}`);

    if (!response.ok) return rejectWithValue(await response.text());

    return await response.json() as GameDetailed;
  }
);
