import "react-native-gesture-handler"
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AuthProvider from "./src/contexts/auth";
import store from "./src/store/store";
import { Provider } from "react-redux";

import Routes from "./src/routes/index";

console.disableYellowBox = true;

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Provider store={store}>
        <StatusBar backgroundColor="#131313" barStyle="light-content" />
        <Routes />
        </Provider>
      </AuthProvider>
    </NavigationContainer>
  );
}
