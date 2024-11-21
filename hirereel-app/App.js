import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet, StatusBar } from "react-native";
import HomeScreen from "./screens/HomeScreen.js";
import InboxScreen from "./screens/InboxScreen.js";
import CreateScreen from "./screens/CreateScreen.js";
import NetworkScreen from "./screens/NetworkScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import Header from "./components/Header.jsx";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Network
const NetworkStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NetworkScreen"
        component={NetworkScreen}
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "#EC4D04",
          },
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: () => <Header />,
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: "#EC4D04",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#EC4D04" }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#EC4D04"
        translucent={false}
      />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Inbox") {
                iconName = focused ? "mail" : "mail-outline";
              } else if (route.name === "Create") {
                iconName = focused ? "add-circle" : "add-circle-outline";
              } else if (route.name === "Network") {
                iconName = focused ? "people" : "people-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#ECE7DF",
            tabBarInactiveTintColor: "#C7B89E",
            tabBarBackground: () => (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: "#EC4D04" },
                ]}
              />
            ),
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: () => <Header />,
              headerStyle: {
                backgroundColor: "#EC4D04",
              },
            }}
          />
          <Tab.Screen
            name="Inbox"
            component={InboxScreen}
            options={{
              headerTitle: () => <Header />,
              headerStyle: {
                backgroundColor: "#EC4D04",
              },
            }}
          />
          <Tab.Screen
            name="Create"
            component={CreateScreen}
            options={{
              headerTitle: () => <Header />,
              headerStyle: {
                backgroundColor: "#EC4D04",
              },
            }}
          />
          {/* Use NetworkStack as the component for the Network tab */}
          <Tab.Screen
            name="Network"
            component={NetworkStack}
            options={{
              headerShown: false, // Hide the default header since the stack will handle headers
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
