import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const RecruiterProfileScreen = ({ route, navigation }) => {
  const { profile } = route.params; // Receive the profile data from navigation

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Image source={profile.image} style={styles.profileImage} />
          <View>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.title}>{profile.title}</Text>
          </View>
        </View>
      </View>

      {/* Request Button */}
      <TouchableOpacity style={styles.requestButton}>
        <Text style={styles.requestButtonText}>Send HireReel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFDCD1",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backArrow: {
    fontSize: 20,
    color: "#000",
    marginRight: 8,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 16,
    color: "#000",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 16,
  },
  card: {
    backgroundColor: "#FDA982",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#000",
  },
  requestButton: {
    backgroundColor: "#EC4D04",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 20,
  },
  requestButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default RecruiterProfileScreen;
