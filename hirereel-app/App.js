import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet, StatusBar } from "react-native";
import HomeScreen from "./screens/HomeScreen.js";
import InboxScreen from "./screens/InboxScreen.js";
import CreateScreen from "./screens/CreateScreen.js";
import NetworkScreen from "./screens/NetworkScreen.js";
import FriendProfileScreen from "./screens/FriendProfileScreen.js";
import RecruiterProfileScreen from "./screens/RecruiterProfileScreen.js";
import Header from "./components/Header.jsx";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NotificationProvider } from "./contexts/NotificationContext";
import Notification from "./screens/Notifications.js";
import { useNotification } from "./contexts/NotificationContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const NotificationWrapper = () => {
  const { notification, hideNotification } = useNotification();

  if (!notification) return null;

  return (
    <Notification
      visible={notification.visible}
      message={notification.message}
      onClose={hideNotification}
    />
  );
};

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
        name="FriendProfileScreen"
        component={FriendProfileScreen}
        options={{
          headerTitle: () => <Header />,
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: "#EC4D04",
          },
        }}
      />
      <Stack.Screen
        name="RecruiterProfileScreen"
        component={RecruiterProfileScreen}
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

function AppContent() {
  return (
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
            style={[StyleSheet.absoluteFill, { backgroundColor: "#EC4D04" }]}
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
      <Tab.Screen
        name="Network"
        component={NetworkStack}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <SafeAreaProvider style={{ flex: 1, backgroundColor: "#EC4D04" }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#EC4D04"
          translucent={false}
        />
        <NavigationContainer>
          <AppContent />
          <NotificationWrapper />
        </NavigationContainer>
      </SafeAreaProvider>
    </NotificationProvider>
  );
}

//new 2
