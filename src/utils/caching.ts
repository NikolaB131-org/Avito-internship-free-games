import { GameDetailed } from '../redux/slices/game/types';
import { STORAGE_SAVED_GAMES_INFO_KEY } from '../constants';

type SavedGamesInfo = Record<number, { timestamp: number, game: GameDetailed }>;

export const saveGameToCache = (game: GameDetailed): void => {
  const savedGamesInfo = localStorage.getItem(STORAGE_SAVED_GAMES_INFO_KEY);
  const gameInfo: SavedGamesInfo = {
    [game.id]: { timestamp: Date.now(), game },
  };

  if (savedGamesInfo !== null) { // если в кэше уже есть игры
    const prevGamesInfo = JSON.parse(savedGamesInfo) as SavedGamesInfo;
    localStorage.setItem(STORAGE_SAVED_GAMES_INFO_KEY, JSON.stringify({ ...prevGamesInfo, gameInfo }));
  } else {
    localStorage.setItem(STORAGE_SAVED_GAMES_INFO_KEY, JSON.stringify(gameInfo));
  }
};

export const getGameFromCache = (id: number): GameDetailed | null => {
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

  return null;
};
