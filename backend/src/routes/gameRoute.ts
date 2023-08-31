import express from 'express';
import { getGame, getGameCompressedThumbnail, getGameFullThumbnail } from '../controllers/gameController';

const gameRoute = express.Router();

gameRoute.get('/game', getGame);
gameRoute.get('/game/thumbnail/compressed/:id', getGameCompressedThumbnail);
gameRoute.get('/game/thumbnail/full/:id', getGameFullThumbnail);

export default gameRoute;
