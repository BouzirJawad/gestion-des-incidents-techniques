// app/index.jsx
import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { router } from "expo-router";

export default function Home() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(screens)/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-blue-100 to-blue-300 px-6">
      <Image
        source={require("../assets/images/OK.png")}
        className="w-40 h-40 mb-6"
        resizeMode="contain"
      />
    </View>
  );
}
