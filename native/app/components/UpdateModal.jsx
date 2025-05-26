import React from "react";
import { Modal, View, Text, TextInput, Pressable, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useAuth } from "../context/AuthProvider";

const UpdateSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  number: Yup.string().required("Phone number is required"),
  password: Yup.string().required("Password is required to confirm changes"),
});

export default function UpdateModal({ visible, onClose }) {
  const { user, token, setUser } = useAuth();

  const handleUpdate = async (values) => {
    try {
      const res = await axios.put(
        `http://192.168.60.162:7460/api/edit-info/${user._id}`,
        {
          username: values.username !== "" ? values.username : user.username,
          email: values.email !== "" ? values.email : user.email,
          number: values.number !== "" ? values.number : user.number,
          confirmationPassword: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setUser(res.data.updatedUser);
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: "Info updated successfully!!!",
          visibilityTime: 2000,
        });
        onClose();
      }
    } catch (err) {
      Alert.alert("Update Failed", err?.response?.data?.message || err.message);
      console.log(err?.response);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50 px-4">
        <View className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
          <Text className="text-3xl font-bold text-center text-blue-700 mb-6">
            Update Info
          </Text>

          <Formik
            initialValues={{
              username: user.username,
              email: user.email,
              number: user.number,
              password: "",
            }}
            validationSchema={UpdateSchema}
            onSubmit={handleUpdate}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  placeholder="Username"
                  className="border border-gray-300 px-4 py-3 mb-2 rounded-lg text-base focus:border-blue-500"
                  value={values.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                />
                {touched.username && errors.username && (
                  <Text className="text-red-500 mb-2 text-sm">{errors.username}</Text>
                )}

                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="border border-gray-300 px-4 py-3 mb-2 rounded-lg text-base focus:border-blue-500"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <Text className="text-red-500 mb-2 text-sm">{errors.email}</Text>
                )}

                <TextInput
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                  className="border border-gray-300 px-4 py-3 mb-2 rounded-lg text-base focus:border-blue-500"
                  value={values.number}
                  onChangeText={handleChange("number")}
                  onBlur={handleBlur("number")}
                />
                {touched.number && errors.number && (
                  <Text className="text-red-500 mb-2 text-sm">{errors.number}</Text>
                )}

                <TextInput
                  placeholder="Current Password"
                  secureTextEntry
                  className="border border-gray-300 px-4 py-3 mb-2 rounded-lg text-base focus:border-blue-500"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                {touched.password && errors.password && (
                  <Text className="text-red-500 mb-4 text-sm">{errors.password}</Text>
                )}

                <Pressable
                  onPress={handleSubmit}
                  className="bg-blue-600 py-3 rounded-xl mb-3"
                >
                  <Text className="text-white text-center font-semibold text-base">
                    Submit
                  </Text>
                </Pressable>

                <Pressable onPress={onClose}>
                  <Text className="text-center bg-gray-300 text-gray-800 py-3 rounded-xl font-medium">
                    Cancel
                  </Text>
                </Pressable>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
}
