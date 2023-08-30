import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameDetailed } from './types';
import { GameDetailedApiResponse } from '../../../types/api';
import { getGameFromCache } from '../../../utils/caching';

export const fetchGameById = createAsyncThunk<GameDetailed, number>(
  'game/fetchGameById',
  async (id, { rejectWithValue }) => {
    const cachedGame = getGameFromCache(id); // получение игры из кэша
    if (cachedGame) return cachedGame;

    const response = await fetch(`${import.meta.env.API_URL}/game?id=${id}`);

    if (!response.ok) rejectWithValue('Ошибка при запросе информации об игре!');

    const game = await response.json() as GameDetailedApiResponse;

    return {
      id: game.id,
      title: game.title,
      releaseDate: game.release_date,
      publisher: game.publisher,
      developer: game.developer,
      genre: game.genre,
      thumbnailLink: game.thumbnail,
      screenshots: game.screenshots,
      minimumSystemRequirements: game.minimum_system_requirements,
    };
  }
);
