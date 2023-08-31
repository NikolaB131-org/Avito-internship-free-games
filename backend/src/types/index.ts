export type GameShort = {
  id: number;
  title: string;
  releaseDate: string;
  publisher: string;
  genre: string;
  thumbnailLink: string;
};

export interface GameDetailed extends GameShort {
  developer: string;
  screenshots: {
    id: number;
    image: string;
  }[];
  minimumSystemRequirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}
