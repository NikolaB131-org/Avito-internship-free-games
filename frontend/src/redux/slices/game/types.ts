import { GameDetailed } from '../../../../../backend/src/types'
import { FetchStatus } from '../../../types';

export type InitialState = {
  game: GameDetailed | null;
  status: FetchStatus;
  errorMessage: string;
};
