import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import gamesRoute from './routes/gamesRoute';
import gameRoute from './routes/gameRoute';
import errorHandler from './error/errorHandler';
import prepareThumbnails from './utils/prepareThumbnails';

const app = express();
const PORT = process.env.PORT ?? 3002;

app.use(cors({ origin: process.env.CORS_ORIGIN_URL }));

app.use('/api', gamesRoute);
app.use('/api', gameRoute);

app.use(errorHandler);

const startServer = async () => {
  await prepareThumbnails();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
