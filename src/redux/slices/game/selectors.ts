import { AppState } from '../../store';

export const gamesSelector = (state: AppState) => state.games.games;
