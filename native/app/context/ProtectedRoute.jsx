// components/ProtectedRoute.jsx
import { Redirect } from 'expo-router';
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) {
    return <Redirect href="/login" />;
  }

  return children;
}
