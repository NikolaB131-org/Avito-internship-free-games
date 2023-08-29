import { FetchStatus } from '../../../types';
import { GameShort } from '../games/types';

export type InitialState = {
  game: GameDetailed | null;
  status: FetchStatus;
  errorMessage: string;
};

export interface GameDetailed extends GameShort {
  developer: string;
  screenshots: {
    id: number;
    image: string;
  }[];
  minimumSystemRequirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export type SavedGamesInfo = Record<number, { timestamp: number, game: GameDetailed }>;
