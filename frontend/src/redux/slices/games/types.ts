import { FetchStatus } from '../../../types';

export type InitialState = {
  games: GameShort[];
  status: FetchStatus;
  errorMessage: string;
};

export type GameShort = {
  id: number;
  title: string;
  releaseDate: string;
  publisher: string;
  genre: string;
  thumbnailLink: string;
};

type Category = 'mmorpg' | 'shooter' | 'strategy' | 'moba' | 'racing' | 'sports' | 'social' | 'sandbox' | 'open-world' | 'survival' | 'pvp' | 'pve' | 'pixel' | 'voxel' | 'zombie' | 'turn-based' | 'first-person' | 'third-Person' | 'top-down' | 'tank' | 'space' | 'sailing' | 'side-scroller' | 'superhero' | 'permadeath' | 'card' | 'battle-royale' | 'mmo' | 'mmofps' | 'mmotps' | '3d' | '2d' | 'anime' | 'fantasy' | 'sci-fi' | 'fighting' | 'action-rpg' | 'action' | 'military' | 'martial-arts' | 'flight' | 'low-spec' | 'tower-defense' | 'horror' | 'mmorts';

export type FetchGamesArgs = {
  platform: 'all' | 'pc' | 'browser';
  category: Category;
  sortBy: 'relevance' | 'popularity' | 'release-date' | 'alphabetical';
};
