import { AppState } from '../../store';

export const gameSelector = (state: AppState) => state.game.game;
