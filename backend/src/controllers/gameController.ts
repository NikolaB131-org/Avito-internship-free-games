import { Request, Response, NextFunction } from 'express';
import { FREE_TO_GAME_API_URL, THUMBNAILS_FOLDER_NAME } from '../constants';
import ApiError from '../error/ApiError';
import { GameDetailedApiResponse } from '../types/api';
import { GameDetailed } from '../types';
import path from 'path';

export const getGame = async (req: Request, res: Response, next: NextFunction) => {
  const response = await fetch(`${FREE_TO_GAME_API_URL}/game?id=${req.query.id}`);

  if (!response.ok) {
    switch (response.status) {
      case 404:
        next(ApiError.notFound('Игра с таким id не найдена'));
        return;
      case 500:
        next(ApiError.internal('Произошла внутренняя ошибка'));
        return;
      default:
        next(new ApiError(response.status, response.statusText));
        return;
    }
  };

  const game = await response.json() as GameDetailedApiResponse;

  const formattedGame: GameDetailed = {
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

  res.status(200).json(formattedGame);
};

export const getGameCompressedThumbnail = (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, `../../${THUMBNAILS_FOLDER_NAME}`, `compressed-${req.params.id}.webp`));
};

export const getGameFullThumbnail = (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, `../../${THUMBNAILS_FOLDER_NAME}`, `full-${req.params.id}.webp`));
};
