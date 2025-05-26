import React from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string().required('Mot de passe requis'),
});

export default function login() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (values) => {
    try {
      const res = await axios.post('http://192.168.60.162:7460/api/auth/login', values);

      const newToken = res.data.token;
      if (newToken) {
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: 'You are logged in 🎉',
          visibilityTime: 2000,
        })
        login(newToken);
        router.replace('/(auth)/dashBoard');
      }
    } catch (err) {
      Alert.alert('Échec de la connexion', err?.response?.data?.message || err.message);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View className=" flex-1 justify-center px-6 bg-[#F8F6F3]">
          <Text className="text-3xl font-bold text-center mb-6 text-[#3D5681]">Connexion</Text>

          <TextInput
            className="border border-[#89AFD2] rounded-lg px-4 py-2 mb-2 bg-white"
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            autoCapitalize="none"
            placeholderTextColor="#89AFD2"
          />
          {touched.email && errors.email && (
            <Text className="text-red-500 mb-2">{errors.email}</Text>
          )}

          <TextInput
            className="border border-[#89AFD2] rounded px-4 py-2 mb-2 bg-white"
            placeholder="Mot de passe"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholderTextColor="#89AFD2"
          />
          {touched.password && errors.password && (
            <Text className="text-red-500 mb-2">{errors.password}</Text>
          )}

          <Pressable onPress={handleSubmit} className="bg-[#4299E1] py-3 rounded mt-2">
            <Text className="text-white text-center font-medium">Se connecter</Text>
          </Pressable>
          <Text
            className="text-[#4299E1] text-center mt-4"
            onPress={() => router.push('/(screens)/register')}
          >
            Pas encore de compte ? S'inscrire
          </Text>
        </View>
      )}
    </Formik>
  );
}