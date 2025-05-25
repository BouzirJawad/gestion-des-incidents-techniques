import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { useAuth } from './context/AuthProvider';
import { useRouter } from 'expo-router';
import UpdateProfileModal from './components/UpdateProfileModal';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  if (!user) return null;

  return (
    <View className="flex-1 bg-[#F8F6F3] px-6 pt-16">
      <Text className="text-3xl font-bold text-[#3D5681] mb-4 text-center">Mon Profil</Text>

      <View className="bg-white p-4 rounded shadow">
        <Text className="text-[#3D5681] mb-2">Nom: <Text className="text-black">{user.username}</Text></Text>
        <Text className="text-[#3D5681] mb-2">Email: <Text className="text-black">{user.email}</Text></Text>
        <Text className="text-[#3D5681] mb-2">Téléphone: <Text className="text-black">{user.phone}</Text></Text>
        <Text className="text-[#3D5681]">Rôle: <Text className="text-black">{user.isAdmin ? 'Admin' : 'Utilisateur'}</Text></Text>
      </View>

      <Pressable
        onPress={() => setModalVisible(true)}
        className="bg-[#4299E1] mt-6 py-3 rounded"
      >
        <Text className="text-white text-center font-medium">Modifier les informations</Text>
      </Pressable>

      <Pressable
        onPress={logout}
        className="bg-[#3D5681] mt-4 py-3 rounded"
      >
        <Text className="text-white text-center font-medium">Se déconnecter</Text>
      </Pressable>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <UpdateProfileModal onClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}