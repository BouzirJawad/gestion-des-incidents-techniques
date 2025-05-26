import React from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ProfileSchema = Yup.object().shape({
  username: Yup.string().required('Nom requis'),
  email: Yup.string().email('Email invalide').required('Email requis'),
  phone: Yup.string().required('Téléphone requis'),
});

export default function UpdateProfileModal({ onClose }) {
  const { user, setUser } = useAuth();

  const handleUpdate = async (values) => {
    try {
      const res = await axios.put('http://YOUR-IP:7460/api/profile/me', values);
      setUser(res.data);
      Alert.alert('Succès', 'Profil mis à jour.');
      onClose();
    } catch (err) {
      Alert.alert('Erreur', err?.response?.data?.message || err.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black/30">
      <View className="bg-white w-11/12 rounded-lg p-6">
        <Text className="text-xl font-semibold text-[#3D5681] mb-4 text-center">Modifier le profil</Text>

        <Formik
          initialValues={{
            username: user.username || '',
            email: user.email || '',
            phone: user.phone || '',
          }}
          validationSchema={ProfileSchema}
          onSubmit={handleUpdate}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                placeholder="Nom"
                className="border border-[#89AFD2] rounded px-4 py-2 mb-2"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholderTextColor="#89AFD2"
              />
              {touched.username && errors.username && (
                <Text className="text-red-500 mb-2">{errors.username}</Text>
              )}

              <TextInput
                placeholder="Email"
                className="border border-[#89AFD2] rounded px-4 py-2 mb-2"
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
                placeholder="Téléphone"
                className="border border-[#89AFD2] rounded px-4 py-2 mb-2"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                keyboardType="phone-pad"
                placeholderTextColor="#89AFD2"
              />
              {touched.phone && errors.phone && (
                <Text className="text-red-500 mb-2">{errors.phone}</Text>
              )}

              <View className="flex-row justify-between mt-4">
                <Pressable onPress={onClose} className="bg-gray-300 px-4 py-2 rounded">
                  <Text className="text-[#3D5681]">Annuler</Text>
                </Pressable>
                <Pressable onPress={handleSubmit} className="bg-[#4299E1] px-4 py-2 rounded">
                  <Text className="text-white">Sauvegarder</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}
