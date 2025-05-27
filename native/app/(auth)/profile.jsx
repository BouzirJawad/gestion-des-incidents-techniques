import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAuth } from '../context/AuthProvider';
import UpdateModal from '../components/UpdateModal';
import { useRouter } from "expo-router"
export default function Profile() {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-600">Loading profile...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-[#F8F6F3] px-6">
      <View className="bg-white p-6 rounded-2xl w-full max-w-md shadow-md">
        <Text className="text-3xl font-extrabold mb-6 text-center text-[#3D5681]">
          Your Profile
        </Text>

        <View className="mb-4 mx-auto text-3xl w-[80%] space-y-2">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-xl">Username:</Text>
            <Text className="font-semibold text-xl text-[#4299E1]">{user.username}</Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className=" text-xl">Email:</Text>
            <Text className="font-semibold text-xl text-[#4299E1]">{user.email}</Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className=" text-xl">Number:</Text>
            <Text className="font-semibold text-xl text-[#4299E1]">{user.number}</Text>
          </View>
        </View>

        <View className="space-y-3 mt-6">
          <Pressable
            onPress={() => setModalVisible(true)}
            className="bg-[#4299E1] py-3 rounded-2xl"
          >
            <Text className="text-white text-center font-semibold text-base">
              Update Info
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/(auth)/dashBoard")}
            className="bg-gray-200 py-3 rounded-2xl"
          >
            <Text className="text-center text-gray-700 font-semibold text-base">
              Go Back to Dashboard
            </Text>
          </Pressable>
        </View>
      </View>

      <UpdateModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}
