import { Stack } from "expo-router";
import  AuthProvider  from './context/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import "./global.css"

export default function RootLayout() {
  return (
    <AuthProvider>
      
        <Stack screenOptions={{ headerShown: false }} />
      
    </AuthProvider>
  )
}
