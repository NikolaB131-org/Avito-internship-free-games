import fs from 'fs';
import sharp from 'sharp';
import { FREE_TO_GAME_API_URL, THUMBNAILS_FOLDER_NAME } from '../constants';
import { GameShortApiResponse } from '../types/api';

async function prepareThumbnails() {
  console.log('Thumbnails preparation started...');
  const startTime = performance.now();

  const response = await fetch(`${FREE_TO_GAME_API_URL}/games`);

  if (!response.ok) throw new Error('Не удалось подготовить обложки игр');

  const games: GameShortApiResponse[] = await response.json();

  const thumbnailsPath = `./${THUMBNAILS_FOLDER_NAME}`;
  fs.rmSync(thumbnailsPath, { recursive: true, force: true }); // удаление прошлой папки (если была)
  fs.mkdirSync(thumbnailsPath); // создание новой папки

  for (const { id, thumbnail } of games) {
    const response = await fetch(thumbnail); // получение картинки по url
    const imageArrayBuffer = await response.arrayBuffer();

    const imageFullPath = `${thumbnailsPath}/full-${id}.webp`;

    await sharp(imageArrayBuffer) // Создает full-id.webp
      .webp({ quality: 100 })
      .toFile(imageFullPath);

    sharp(imageFullPath) // Создает compressed-id.webp       // BLUR MAYBE?
      .resize({ width: 40 })
      .webp()
      .toFile(`${thumbnailsPath}/compressed-${id}.webp`);
  }

  const endTime = performance.now();
  console.log(`Thumbnails preparation done! (took ${((endTime - startTime) / 1000).toFixed(2)}s)`);
}

export default prepareThumbnails;
