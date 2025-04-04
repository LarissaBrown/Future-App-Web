import { User } from '@/types/user';

// Mock user data for testing
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'tianna.hall@example.com',
    name: 'Tianna Hall',
    role: 'artist',
    artistId: 'tianna-hall',
    isVerified: true,
    createdAt: new Date(),
  },
  {
    id: 'user-2',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    isVerified: true,
    createdAt: new Date(),
  }
];

// Mock authentication service
export const authService = {
  // Login with email and password
  login: async (email: string, password: string): Promise<User> => {
    // For development, accept any password
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    return user;
  },
  
  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    // In a real app, this would check a session or token
    // For now, we'll just return the first user for testing
    return mockUsers[0];
  },
  
  // Logout
  logout: async (): Promise<void> => {
    // In a real app, this would clear the session or token
    console.log('Logged out');
  },
  
  // Register a new user
  register: async (email: string, password: string, name: string, role: User['role']): Promise<User> => {
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      throw new Error('User already exists');
    }
    
    // Create a new user
    const newUser: User = {
      id: `user-${mockUsers.length + 1}`,
      email,
      name,
      role,
      isVerified: false,
      createdAt: new Date(),
    };
    
    // Add to mock users
    mockUsers.push(newUser);
    
    return newUser;
  }
}; 