import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../Authorization/Auth'; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Use the 'onAuthStateChanged' method from the 'auth' object
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false); // Mark loading as false when the state is updated
    }, (error) => {
      console.error(error); // Handle potential authentication errors
      setLoading(false); // Mark loading as false even in case of errors
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only when not loading */}
    </AuthContext.Provider>
  );
}
