export interface News {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  thumbnailUrl: string;
  platform:' Windows ' | ' PlayStation 4 ' | ' Xbox ' | ' Nintendo Swtich ' | ' MacOS ' | ' PlayStation 5 ';
  releaseDate: string;
  rating: number;
  genre: string[];
  developer: string;
  publisher: string;
  features: string[];
  requirements?: {
    minimum: string[];
    recommended: string[];
  };
  screenshots: string[];
  thumbnails: string[];
  videos?: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  notHelpful: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  gameId: string;
  quantity: number;
  addedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  content?: string;
  author?: string;
  tags?: string[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: Omit<User, 'password'>;
} 