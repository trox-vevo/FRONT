export type Game = {
  id: string;
  title: string;
  description: string;
  price: number;
  platform: string;
  category: string;
  rating: number;
  releaseDate: string;
  developer: string;
  publisher: string;
  inStock: boolean;
  featured?: boolean;
  discount?: number;
};

export type GameCardProps = {
  game: Game;
  onAddToCart?: (game: Game) => void;
};

export type GameListProps = {
  games: Game[];
  onAddToCart?: (game: Game) => void;
}; 