import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useNotification } from "../contexts/NotificationContext";
import { useMessages } from "../contexts/MessageContext"; // Correct import

const FriendProfileScreen = ({ route, navigation }) => {
  const { profile } = route.params;
  const { showNotification } = useNotification();
  const [message, setMessage] = useState("");
  const { addMessage } = useMessages(); // From MessageContext

  const handleRequest = () => {
    if (message.trim()) {
      const now = new Date();
      const timestamp = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      addMessage(profile.id, {
        content: message.trim(),
        timestamp: timestamp,
        sender: "user",
        type: "message",
      });
    }

    showNotification(`Your HireReel request to ${profile.name} has been sent.`);
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

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

        {/* Message Input */}
        <TextInput
          style={styles.messageInput}
          placeholder="Add a message..."
          placeholderTextColor="#650"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
          <Text style={styles.requestButtonText}>Request HireReel</Text>
        </TouchableOpacity>
      </View>

      {/* Experiences Section */}
      <Text style={styles.sectionTitle}>Experiences</Text>
      {profile.experiences.map((exp, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{exp.role}</Text>
          <Text style={styles.cardSubtitle}>{exp.date}</Text>
        </View>
      ))}

      {/* Education Section */}
      <Text style={styles.sectionTitle}>Education</Text>
      {profile.education.map((edu, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{edu.institution}</Text>
          <Text style={styles.cardSubtitle}>{edu.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
  messageInput: {
    backgroundColor: "#FDBA9B",
    borderRadius: 10,
    padding: 12,
    color: "#000",
    fontSize: 16,
    minHeight: 80,
    marginBottom: 16,
    textAlignVertical: "top",
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

export default FriendProfileScreen;
//acc new
