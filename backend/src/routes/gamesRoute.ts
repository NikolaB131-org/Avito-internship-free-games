import express from 'express';
import { getGames } from '../controllers/gamesController';

const gamesRoute = express.Router();

gamesRoute.get('/games', getGames);

export default gamesRoute;
