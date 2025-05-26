import React from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message"

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Nom requis"),
  email: Yup.string().email("Email invalide").required("Email requis"),
  number: Yup.string().min(10).max(10).required("Numéro requis"),
  isAdmin: Yup.boolean().required(),
  password: Yup.string()
    .min(6, "Min. 6 caractères")
    .required("Mot de passe requis"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("Confirmation requise"),
});

export default function RegisterScreen() {
  const router = useRouter();

  const handleRegister = async (values) => {
    try {
      const res = await axios.post("http://192.168.200.158:7460/api/auth/register", values);

      if (res.status === 201) {
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: 'You are registered !!!',
          visibilityTime: 2000
        })

        router.replace("/(screens)/login");
      }
      
    } catch (err) {
      Alert.alert("Erreur", err?.response?.data?.error[0].msg || err.message);
      console.log(err)
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        number: "",
        isAdmin: false,
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegister}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
        touched,
      }) => (
        <View className="flex-1 justify-center px-6 bg-[#F8F6F3]">
          <Text className="text-3xl font-bold text-center mb-6 text-[#3D5681]">
            Inscription
          </Text>

          <TextInput
            className="border border-[#89AFD2] rounded px-4 py-2 mb-2 bg-white"
            placeholder="Nom d'utilisateur"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
            placeholderTextColor="#89AFD2"
          />
          {touched.username && errors.username && (
            <Text className="text-red-500 mb-2">{errors.username}</Text>
          )}

          <TextInput
            className="border border-[#89AFD2] rounded px-4 py-2 mb-2 bg-white"
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            autoCapitalize="none"
            placeholderTextColor="#89AFD2"
          />
          {touched.email && errors.email && (
            <Text className="text-red-500 mb-2">{errors.email}</Text>
          )}

          <TextInput
            className="border border-[#89AFD2] rounded px-4 py-2 mb-2 bg-white"
            placeholder="Numéro de téléphone"
            onChangeText={handleChange("number")}
            onBlur={handleBlur("number")}
            value={values.phone}
            keyboardType="phone-pad"
            placeholderTextColor="#89AFD2"
          />
          {touched.number && errors.number && (
            <Text className="text-red-500 mb-2">{errors.number}</Text>
          )}

          <Picker
            selectedValue={values.isAdmin}
            onValueChange={(value) => setFieldValue("isAdmin", value)}
            className="mb-4 bg-white"
          >
            <Picker.Item label="user" value={false} />
            <Picker.Item label="Admin" value={true} />
          </Picker>

          <TextInput
            className="border border-[#89AFD2] rounded px-4 py-2 mb-2 bg-white"
            placeholder="Mot de passe"
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            placeholderTextColor="#89AFD2"
          />
          {touched.password && errors.password && (
            <Text className="text-red-500 mb-2">{errors.password}</Text>
          )}

          <TextInput
            className="border border-[#89AFD2] rounded px-4 py-2 mb-2 bg-white"
            placeholder="Confirmer le mot de passe"
            secureTextEntry
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            placeholderTextColor="#89AFD2"
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text className="text-red-500 mb-2">{errors.confirmPassword}</Text>
          )}

          <Pressable
            onPress={handleSubmit}
            className="bg-[#4299E1] py-3 rounded mt-2"
          >
            <Text className="text-white text-center font-medium">
              S'inscrire
            </Text>
          </Pressable>
          <Text
            className="text-[#4299E1] text-center mt-4"
            onPress={() => router.push("/(screens)/login")}
          >
            Vous avez déjà un compte ? Se connecter
          </Text>
        </View>
      )}
    </Formik>
  );
}
