import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
    <View style={styles.subContainer}>
        <Image
            style={styles.hirereelLogo}
            source={require("../images/hirereelLogo.png")}
        />
        <Text
            style={{
            color: "#FFFFFF",
            fontSize: 28,
            fontWeight: "bold",
            }}
        >
            HireReel
      </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContentContent: "flex-start",
    width: Dimensions.get('window').width * 0.95,
    paddingBottom: "2%"
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  profileLogo: {
    width: 45,
    height: 45,
    marginRight: "0.5%"
  },
  hirereelLogo: {
    width: 40,
    height: 40,
    marginRight: "1.75%"
  }
});
