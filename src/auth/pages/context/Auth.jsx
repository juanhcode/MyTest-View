import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export function Auth({ children }) {
  const { decodedToken } = useContext(AuthContext);

  // Puedes agregar lógica adicional según tus necesidades
  const isAuthenticated = !!decodedToken;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}