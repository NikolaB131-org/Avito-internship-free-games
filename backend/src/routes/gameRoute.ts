import express from 'express';
import { getGame } from '../controllers/gameController';

const gameRoute = express.Router();

gameRoute.get('/game', getGame);

export default gameRoute;
