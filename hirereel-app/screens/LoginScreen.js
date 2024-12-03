import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Auth from "../components/Auth";
import { Session } from "@supabase/supabase-js";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";

export default function LoginScreen() {
  const [session, setSession] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session != null) {
      console.log(session.user.id);
      navigation.navigate("Tabs");
    }
  }, [session]);

  return (
    <View>
      <Auth />
      <TouchableOpacity
        onPress={() => navigation.navigate("Tabs")}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Text>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}
