import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import type { JSX } from 'react/jsx-dev-runtime';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  // If not logged in, boot them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, render the protected component
  return children;
};

export default ProtectedRoute;