import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNotification } from "../contexts/NotificationContext";

const RecruiterProfileScreen = ({ route, navigation }) => {
  const { profile } = route.params;
  const { showNotification } = useNotification();

  const handleRequest = () => {
    showNotification(`Your HireReel has been sent to ${profile.name}`);
    navigation.navigate("Home");
  };

  // Different roles based on recruiter
  const getRecruiterRoles = (recruiterTitle) => {
    if (recruiterTitle.includes("Google")) {
      return [
        {
          title: "Software Engineer L3 - Mountain View, CA",
          salary: "$150-200k/year",
        },
        {
          title: "Full Stack Developer - Mountain View, CA",
          salary: "$140-180k/year",
        },
        {
          title: "Machine Learning Engineer - Mountain View, CA",
          salary: "$160-210k/year",
        },
      ];
    } else if (recruiterTitle.includes("Meta")) {
      return [
        {
          title: "React Native Developer - Menlo Park, CA",
          salary: "$145-190k/year",
        },
        {
          title: "Frontend Engineer - Menlo Park, CA",
          salary: "$135-175k/year",
        },
        {
          title: "Mobile Engineer - Menlo Park, CA",
          salary: "$140-185k/year",
        },
        {
          title: "AR/VR Engineer - Menlo Park, CA",
          salary: "$155-200k/year",
        },
      ];
    }
    return [];
  };

  const openRolesData = getRecruiterRoles(profile.title);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.profileInfo}>
          <Image source={profile.image} style={styles.profileImage} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.title}>{profile.title}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
          <Text style={styles.requestButtonText}>Send my HireReel</Text>
        </TouchableOpacity>
      </View>

      {/* Open Roles Section */}
      <Text style={styles.sectionTitle}>Open Roles</Text>
      {openRolesData.map((role, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{role.title}</Text>
          <Text style={styles.cardSubtitle}>{role.salary}</Text>
        </View>
      ))}
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
    marginBottom: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  backArrow: {
    fontSize: 24,
    color: "#000",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
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
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
  },
  requestButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RecruiterProfileScreen;
//acc new

