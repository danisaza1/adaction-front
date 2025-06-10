
'use client'
//créer le context
import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

//pour créer le Provider (le fournisseur) de context
//fonction qui 	fournit les données (user, login, etc.) à toute l'app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  
const login = async (email, password) => {
  console.log('Envoi login avec:', { email, password }); 
  const res = await fetch(
    'http://localhost:3001/auth',  // URL de la requête
    {      
  method: 'POST',
  headers : { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, password }),

  });
   if (!res.ok) {
    //  lancer une erreur ici, ou retourner une valeur spéciale
    throw new Error('Erreur lors de la connexion');
  }

  const data = await res.json();
  setUser(data);
  return data;
};
    const logout = () => setUser(null);
      const isAuthenticated = !!user;
 return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
// créer un custom hook pour ne pas importer les hook à chauqe fois donc pour manipuler plus facilement le contexte
export const useAuth = () => useContext(AuthContext);