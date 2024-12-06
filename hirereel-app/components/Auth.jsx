import React, { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState(null);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  if (!authMode) {
    // Initial screen to choose between Login and Sign Up
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to HireReel</Text>
        <View style={styles.verticallySpaced}>
          <Button
            title="Login"
            onPress={() => setAuthMode("login")}
            buttonStyle={styles.primaryButton}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            title={<Text style={{fontSize: 18}}>Sign Up</Text>}
            onPress={() => setAuthMode("signup")}
            buttonStyle={styles.secondaryButton}
          />
        </View>
      </View>
    );
  }

  // Render the form for Login or Sign Up based on authMode
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{authMode === "login" ? "Login" : "Sign Up"}</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        {authMode === "login" ? (
          <Button
            title="Sign In"
            disabled={loading}
            onPress={() => {
              signInWithEmail() 
            }}
            buttonStyle={styles.primaryButton}
          />
        ) : (
          <Button
            title="Sign Up"
            disabled={loading}
            onPress={() => {
              signUpWithEmail()
            }}
            buttonStyle={styles.primaryButton}
          />
        )}
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title={<Text style={{fontSize: 18}}>Back</Text>}
          type="clear"
          color="#000"
          onPress={() => setAuthMode(null)} // Go back to the initial screen
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontColor: "#000",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 120,
  },
  verticallySpaced: {
    flexDirection: "column",
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
    alignItems: "center"
  },
  mt20: {
    marginTop: 10,
  },
  primaryButton: {
    width: 200,
    backgroundColor: "#EC4D04",
    borderRadius: 50
  },
  secondaryButton: {
    width: 200,
    backgroundColor: "#FDA982",
    borderRadius: 50
  },
});
