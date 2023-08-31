import { AppState } from '../../store';

export const gameSelector = (state: AppState) => state.game.game;
export const gameStatusSelector = (state: AppState) => state.game.status;
export const gameErrorMessageSelector = (state: AppState) => state.game.errorMessage;
