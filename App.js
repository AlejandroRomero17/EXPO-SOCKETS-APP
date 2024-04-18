import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HomeScreen from "./src/screens/HomeScreen.jsx";
import JsonFormScreen from "./src/screens/JsonListScreen.jsx";
import Footer from "./src/screens/Footer.jsx";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              header: () => (
                <View style={styles.header}>
                  <Text style={styles.headerText}>SOCKETS APP</Text>
                  <View style={styles.headerButtons}></View>
                </View>
              ),
              headerShown: true,
            })}
          />
          <Stack.Screen
            name="JsonFormScreen"
            component={JsonFormScreen}
            options={{
              title: "List Documents",
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitle,
              headerTintColor: styles.headerTintColor,
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
        <Footer />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#c1e0e0",
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 28,
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  headerStyle: {
    backgroundColor: "#c1e0e0",
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#000",
  },
  headerTintColor: "red",
});

export default App;
