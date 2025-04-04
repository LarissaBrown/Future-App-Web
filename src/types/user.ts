export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'artist' | 'contractor';
  artistId?: string; // Reference to the artist profile if the user is an artist/contractor
  isVerified: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
} 