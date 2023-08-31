import { AppState } from '../../store';

export const gamesSelector = (state: AppState) => state.games.games;
export const gamesStatusSelector = (state: AppState) => state.games.status;
export const gamesErrorMessageSelector = (state: AppState) => state.games.errorMessage;
