import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import LoginScreen from "../modules/auth/screens/LoginScreen";
import SignupScreen from "../modules/auth/screens/SignupScreen";

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}