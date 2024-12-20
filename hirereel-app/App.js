import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet, StatusBar, Image } from "react-native";
import HomeScreen from "./screens/HomeScreen.js";
import InboxScreen from "./screens/InboxScreen.js";
import MessageScreen from "./screens/MessageScreen.js";
import CreateScreen from "./screens/CreateScreen.js";
import NetworkScreen from "./screens/NetworkScreen.js";
import FriendProfileScreen from "./screens/FriendProfileScreen.js";
import RecruiterProfileScreen from "./screens/RecruiterProfileScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import Header from "./components/Header.jsx";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NotificationProvider } from "./contexts/NotificationContext";
import Notification from "./screens/Notifications.js";
import { useNotification } from "./contexts/NotificationContext";
import ProfileScreen from "./screens/ProfileScreen.js";
import { MessageProvider } from "./contexts/MessageContext";

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
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="FriendProfileScreen"
        component={FriendProfileScreen}
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "#EC4D04",
          },
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="RecruiterProfileScreen"
        component={RecruiterProfileScreen}
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "#EC4D04",
          },
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

const MessageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "#EC4D04",
          },
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "#EC4D04",
          },
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="FriendProfileScreen"
        component={FriendProfileScreen}
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "#EC4D04",
          },
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="RecruiterProfileScreen"
        component={RecruiterProfileScreen}
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "#EC4D04",
          },
          headerLeft: () => null,
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
          if (route.name === "Profile") {
            return focused ? (
              <Image
                source={require("./images/Maxim.png")}
                style={{
                  width: 32,
                  height: 32,
                  borderColor: "#FFF",
                  borderWidth: 2,
                  borderRadius: 32 / 2,
                }}
              />
            ) : (
              <Image
                source={require("./images/Maxim.png")}
                style={{
                  width: 32,
                  height: 32,
                  borderColor: "#EC4D04",
                  borderWidth: 2,
                  borderRadius: 32 / 2,
                }}
              />
            );
          }
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Messages") {
            iconName = focused ? "mail" : "mail-outline";
          } else if (route.name === "Create") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Network") {
            iconName = focused ? "people" : "people-outline";
          }
          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "#ECE7DF",
        tabBarInactiveTintColor: "#FFF",
        tabBarItemStyle: {
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#EC4D04",
          paddingBottom: 5, // Ensure proper padding for alignment
        },
        tabBarIconStyle: {
          marginTop: 5, // Space above icons for alignment
        },
        tabBarItemStyle: {
          justifyContent: "center", // Center the items within the tab
          alignItems: "center",
        },
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
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Network"
        component={NetworkStack}
        options={{
          headerShown: false,
          headerLeft: () => null,
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
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "#EC4D04",
          },
          headerLeft: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: "#EC4D04",
          },
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Tabs"
        component={AppContent}
        options={{
          headerShown: false,
          gestureEnabled: false, // Disable backswiping when on Tabs
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <MessageProvider>
      <NotificationProvider>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: "#EC4D04" }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#EC4D04"
            translucent={false}
          />
          <NavigationContainer>
            <MainStack />
            <NotificationWrapper />
          </NavigationContainer>
        </SafeAreaProvider>
      </NotificationProvider>
    </MessageProvider>
  );
}
