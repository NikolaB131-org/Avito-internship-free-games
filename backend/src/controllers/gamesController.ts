import { Request, Response, NextFunction } from 'express';
import { FREE_TO_GAME_API_URL } from '../constants';
import ApiError from '../error/ApiError';
import { GameShortApiResponse } from '../types/api';
import { GameShort } from '../types';

export const getGames = async (req: Request, res: Response, next: NextFunction) => {
  const platform = req.query.platform;
  const category = req.query.category;
  const sortBy = req.query['sort-by'];
  const response = await fetch(
    `${FREE_TO_GAME_API_URL}/games?platform=${platform}&category=${category}&sort-by=${sortBy}`
  );

  if (!response.ok) {
    switch (response.status) {
      case 404:
        next(ApiError.notFound('Не указаны параметры платформы, категории или сортировки'));
        return;
      case 500:
        next(ApiError.internal('Произошла внутренняя ошибка'));
        return;
      default:
        next(new ApiError(response.status, response.statusText));
        return;
    }
  };

  const games = await response.json() as GameShortApiResponse[];

  const formattedGames: GameShort[] = games.map(game => ({
    id: game.id,
    title: game.title,
    releaseDate: game.release_date.split('-').reverse().join('.'),
    publisher: game.publisher,
    genre: game.genre,
    thumbnailLink: game.thumbnail,
  }));

  res.status(200).json(formattedGames);
}
