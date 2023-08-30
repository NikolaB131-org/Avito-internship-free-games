import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameShort, FetchGamesArgs } from './types';
import { GameShortApiResponse } from '../../../types/api';

export const fetchGames = createAsyncThunk<GameShort[], FetchGamesArgs>(
  'games/fetchGames',
  async ({ platform, category, sortBy }, { rejectWithValue }) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/games?platform=${platform}&category=${category}&sort-by=${sortBy}`
    );

    if (!response.ok) rejectWithValue('Ошибка при запросе информации об играх!');

    const games = await response.json() as GameShortApiResponse[];

    return games.map(game => ({
      id: game.id,
      title: game.title,
      releaseDate: game.release_date,
      publisher: game.publisher,
      genre: game.genre,
      thumbnailLink: game.thumbnail,
    }));
  }
);
