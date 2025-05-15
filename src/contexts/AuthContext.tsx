
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type UserRole = 'admin' | 'supervisor' | 'seller' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage and restore session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo accounts for testing
      const demoUsers: Record<string, User> = {
        'admin@ibstock.com': {
          id: '1',
          name: 'Admin User',
          email: 'admin@ibstock.com',
          role: 'admin',
          avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=FF5000&color=fff',
        },
        'supervisor@ibstock.com': {
          id: '2',
          name: 'Supervisor User',
          email: 'supervisor@ibstock.com',
          role: 'supervisor',
          avatar: 'https://ui-avatars.com/api/?name=Supervisor+User&background=FF7A3D&color=fff',
        },
        'seller@ibstock.com': {
          id: '3',
          name: 'Seller User',
          email: 'seller@ibstock.com',
          role: 'seller',
          avatar: 'https://ui-avatars.com/api/?name=Seller+User&background=FFA57A&color=fff',
        }
      };

      if (password !== 'password123' || !demoUsers[email]) {
        toast.error('Invalid email or password');
        setIsLoading(false);
        return;
      }

      const authenticatedUser = demoUsers[email];
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      toast.success(`Welcome back, ${authenticatedUser.name}!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error', error);
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
