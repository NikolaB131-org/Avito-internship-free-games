import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameDetailed, SavedGamesInfo } from './types';
import { GameDetailedApiResponse } from '../../../types/api';
import { STORAGE_SAVED_GAMES_INFO_KEY } from '../../../constants';

export const fetchGameById = createAsyncThunk<GameDetailed, number>(
  'game/fetchGameById',
  async (id, { rejectWithValue }) => {
    // Проверка того, кэширована ли игра
    const savedGamesInfo = localStorage.getItem(STORAGE_SAVED_GAMES_INFO_KEY);
    if (savedGamesInfo !== null) {
      const gamesInfo = JSON.parse(savedGamesInfo) as SavedGamesInfo;

      if (Object.hasOwn(gamesInfo, id)) { // если игра с таким id есть в кэше
        const { game, timestamp } = gamesInfo[id];
        const cacheDuration = 5 * 60 * 1000; // 5 минут

        if (Date.now() - timestamp <= cacheDuration) { // если с момента кэширования прошло меньше 5 минут
          return game;
        }
      }
    }

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
