import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, StatusBar, SafeAreaView, Text } from "react-native";
import HomeScreen from "./screens/HomeScreen.js";
import InboxScreen from "./screens/InboxScreen.js";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EC4D04" }}>
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
              headerTitle: () => (
                <Text
                  style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}
                >
                  Home
                </Text>
              ),
              // headerTitle: () => (
              //   <Image
              //     source={require('.image.png')}
              //     style={{ width: 100, height: 40 }}
              //     resizeMode="contain"
              //   />
              // ),
              headerStyle: {
                backgroundColor: "#EC4D04",
              },
            }}
          />
          <Tab.Screen
            name="Inbox"
            component={InboxScreen}
            options={{
              headerTitle: () => (
                <Text
                  style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}
                >
                  Inbox
                </Text>
              ),
              headerStyle: {
                backgroundColor: "#EC4D04",
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
