import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import TaskNavigator from "./TaskNavigator";
import useAuthSession from "../hooks/useAuthSession";
import SplashScreen from "../modules/auth/screens/SplaceScreen";

export default function RootNavigator() {
  const { user, loading } = useAuthSession();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <TaskNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}