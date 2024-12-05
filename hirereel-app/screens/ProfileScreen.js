import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { Button } from "@rneui/themed";
import { supabase } from "../lib/supabase";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ProfileScreen() {
  const [view, setView] = useState("profile"); // Manage the current view state
  const [selectedHireReel, setSelectedHireReel] = useState(null); // For modal
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      // Add your navigation logic if needed
    }
  };

  const profileData = {
    name: "John Doe",
    title: "Software Engineer at Google",
    image: require("../images/Maxim.png"),
    experiences: [
      { role: "Frontend Developer", date: "Jan 2020 - Dec 2021" },
      { role: "UI/UX Designer", date: "Mar 2018 - Dec 2019" },
    ],
    education: [
      { institution: "Stanford University", date: "2014 - 2018" },
      { institution: "High School", date: "2010 - 2014" },
    ],
  };

  const exampleHireReels = [
    require("../images/Maxim.png"),
    require("../images/Maxim.png"),
    require("../images/Maxim.png"),
    require("../images/Maxim.png"),
    require("../images/Maxim.png"),
    require("../images/Maxim.png"),
  ];

  const openModal = (hireReel) => {
    setSelectedHireReel(hireReel);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedHireReel(null);
  };

  const BackButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <Text style={styles.backArrow}>←</Text>
    </TouchableOpacity>
  );

  if (view === "hirereels") {
    return (
      <View style={styles.container}>
        <BackButton onPress={() => setView("profile")} />
        <Text style={styles.pageTitle}>Your HireReels</Text>

        <View style={styles.gridContainer}>
          {exampleHireReels.map((hireReel, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openModal(hireReel)}
              style={styles.gridItem}
            >
              <Image source={hireReel} style={styles.gridImage} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Modal for HireReel */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedHireReel && (
                <Image source={selectedHireReel} style={styles.modalImage} />
              )}
              <Button
                title="Share"
                buttonStyle={styles.shareButton}
                titleStyle={styles.shareButtonText}
                onPress={() => Alert.alert("Share functionality coming soon!")}
              />
              <Button
                title="Close"
                buttonStyle={styles.closeButton}
                titleStyle={styles.closeButtonText}
                onPress={closeModal}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  if (view === "analytics") {
    return (
      <View style={styles.container}>
        <BackButton onPress={() => setView("profile")} />
        <Text style={styles.pageTitle}>Your Analytics</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={profileData.image} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.title}>{profileData.title}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setView("hirereels")}
        >
          <Ionicons name="film-outline" size={30} color="#FFF" />
          <Text style={styles.actionText}>HireReels</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setView("analytics")}
        >
          <Ionicons name="analytics-outline" size={30} color="#FFF" />
          <Text style={styles.actionText}>Analytics</Text>
        </TouchableOpacity>
      </View>

      {/* Experiences Section */}
      <Text style={styles.sectionTitle}>Experiences</Text>
      {profileData.experiences.map((exp, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{exp.role}</Text>
          <Text style={styles.cardSubtitle}>{exp.date}</Text>
        </View>
      ))}

      {/* Education Section */}
      <Text style={styles.sectionTitle}>Education</Text>
      {profileData.education.map((edu, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{edu.institution}</Text>
          <Text style={styles.cardSubtitle}>{edu.date}</Text>
        </View>
      ))}

      {/* Sign Out Button */}
      <Button
        title="Sign Out"
        buttonStyle={styles.signOutButton}
        titleStyle={styles.signOutButtonText}
        onPress={handleSignOut}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
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
  pageTitle: {
    fontSize: 28,
    color: "#000",
    fontWeight: "bold",
    marginBottom: "2%",
    marginLeft: "2%",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "30%",
    aspectRatio: 1,
    marginBottom: 10,
  },
  gridImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  modalImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  shareButton: {
    backgroundColor: "#EC4D04",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  shareButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#DDD",
    borderRadius: 10,
    padding: 10,
  },
  closeButtonText: {
    color: "#000",
  },
  backButton: {
    marginBottom: 16,
  },
  backArrow: {
    fontSize: 24,
    color: "#000",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EC4D04",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    width: 120,
    height: 75,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 16,
  },
  card: {
    backgroundColor: "#FFDCD1",
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
  signOutButton: {
    backgroundColor: "#EC4D04",
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 20,
    alignSelf: "center",
  },
  signOutButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
  placeholderText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
