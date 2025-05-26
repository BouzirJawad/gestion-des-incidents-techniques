// app/(auth)/_layout.jsx
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';

export default function ProtectedLayout() {
  const { token } = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.replace('/(screens)/login');
    }
  }, [token]);

  if (!token) {
      router.replace('/(screens)/login');
  }

  return <Stack />;
}
