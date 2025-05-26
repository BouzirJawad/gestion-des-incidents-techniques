import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthProvider'; // adjust path as needed

export default function Dashboard() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/(screens)/login');
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold text-blue-700 mb-8">Dashboard</Text>

      <Pressable
        onPress={() => router.push('/profile')}
        className="bg-blue-500 w-full py-4 rounded-xl mb-4"
      >
        <Text className="text-white text-center text-lg font-semibold">View Profile</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push('/tickets')}
        className="bg-green-500 w-full py-4 rounded-xl mb-4"
      >
        <Text className="text-white text-center text-lg font-semibold">View Tickets</Text>
      </Pressable>

      <Pressable
        onPress={handleLogout}
        className="bg-red-500 w-full py-4 rounded-xl mt-8"
      >
        <Text className="text-white text-center text-lg font-semibold">Disconnect</Text>
      </Pressable>
    </View>
  );
}