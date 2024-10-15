import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id?: string | null;
  name?: string | null;
  image?: string | null;
  email?: string | null;
  role?: string; // e.g., 'user', 'admin', 'mechanic'
}

interface Session {
  user?: User;
}

const AuthContext = createContext<{
  session: Session | undefined;
  signIn: (user: User) => void;
  signUp: (user: User) => void;
  signOut: () => void;
  signInWithGoogle: () => void;
  signInWithFacebook: () => void;
} | undefined>(undefined);

export const AuthenticationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check local storage for user credentials
    const storedUser = localStorage.getItem('session');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      setSession({ user }); // Set session from local storage
    }
  }, []);

  const signUp = (user: User) => {
    // In real case, you'd likely send a request to your backend to create a new user
    setSession({ user });
    console.log('User signed up:', user);
  };

  const signIn = (user: User) => {
    setSession({ user });
    localStorage.setItem('session', JSON.stringify({ user }));
  };

  const signOut = () => {
    setSession(undefined);
    localStorage.removeItem('session');
    navigate('/')
  };

  const signInWithGoogle = () => {
    // Implement Google Sign-In Logic
  };

  const signInWithFacebook = () => {
    // Implement Facebook Sign-In Logic
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        signInWithFacebook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationProvider');
  }
  return context;
};
