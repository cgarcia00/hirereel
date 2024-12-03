import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "@rneui/themed"; // If you're using @rneui for buttons
import { supabase } from "../lib/supabase"; // Adjust the import path to your Supabase client

export default function ProfileScreen({ navigation }) {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Page</Text>
      <Button
        title="Sign Out"
        buttonStyle={styles.signOutButton}
        titleStyle={styles.signOutButtonText}
        onPress={handleSignOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: "#EC4D04",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  signOutButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
});
