import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { useNotification } from "../contexts/NotificationContext";
import { useMessages } from "../contexts/MessageContext";

const CustomCheckbox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity 
      onPress={onValueChange}
      style={[
        styles.checkbox,
        value ? styles.checkboxChecked : styles.checkboxUnchecked
      ]}
    >
      {value && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );
};

export default function RecruiterProfileScreen({ route, navigation }) {
  const { profile } = route.params;
  const [view, setView] = useState("profile"); // Main view state
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { showNotification } = useNotification();
  const { addMessage } = useMessages();

  // Video data
  const videosData = [
    {
      id: "1",
      metrics: {
        plays: 98,
        likes: 31,
        comments: 13,
        shares: 11,
      },
      endorserTitle: "From Cristobal Garcia",
      skills: ["Software Development", "Agile Methodologies"],
      endorserProfilePicture: require("../images/Cristobal.png"),
      thumbNail: require("../images/Cristobal.png"),
      url: "https://hirereel-videos.s3.us-east-1.amazonaws.com/James.mov",
    },
    {
      id: "2",
      metrics: {
        plays: 42,
        likes: 21,
        comments: 3,
        shares: 1,
      },
      endorserTitle: "From David Zhou",
      skills: ["Scrum/Agile", "Leadership Principles"],
      endorserProfilePicture: require("../images/David.png"),
      thumbNail: require("../images/David.png"),
      url: "https://hirereel-videos.s3.us-east-1.amazonaws.com/David.mov",
    },
    {
      id: "3",
      metrics: {
        plays: 104,
        likes: 20,
        comments: 11,
        shares: 9,
      },
      endorserTitle: "From James Landay",
      skills: ["Software Development", "Product Management"],
      endorserProfilePicture: require("../images/Landay.png"),
      thumbNail: require("../images/Landay.png"),
      url: "https://hirereel-videos.s3.us-east-1.amazonaws.com/James.mov",
    },
  ];

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

  const openRoles = getRecruiterRoles(profile.title);

  const BackButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <Text style={styles.backArrow}>←</Text>
    </TouchableOpacity>
  );

  // Handlers
  const handleVideoSelect = (videoId) => {
    setSelectedVideo((prevSelected) =>
      prevSelected.includes(videoId)
        ? prevSelected.filter((id) => id !== videoId)
        : [...prevSelected, videoId]
    );
  };

  const handleVideoSelectionNext = () => {
    if (selectedVideo.length === 0) {
      setErrorMessage("Please select at least one video to send");
    } else {
      setErrorMessage("");
      setView("message");
    }
  };

  const handleSendMessage = () => {
    // Send the selected videos regardless of message
    const selectedVideos = videosData.filter((video) =>
      selectedVideo.includes(video.id)
    );
    
    // If there's a message, add it to the messages
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
  
    console.log("Sending Video(s) and Message:", {
      selectedVideos,
      message: message.trim() || null,
    });
  
    showNotification(`Your HireReel has been sent to ${profile.name}.`);
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  // video selection
  if (view === "video-selection") {
    return (
      <View style={styles.container}>
        <BackButton onPress={() => setView("profile")} />
        <Text style={styles.cardTitle}>Select Videos to Send</Text>
  
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
  
        <FlatList
          data={videosData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.videoItem}>
              <Image source={item.thumbNail} style={styles.videoThumbnail} />
              <View style={styles.videoInfo}>
                <Text style={styles.endorserTitle}>{item.endorserTitle}</Text>
                <Text>Skills: {item.skills.join(", ")}</Text>
              </View>
              <CustomCheckbox
                value={selectedVideo.includes(item.id)}
                onValueChange={() => handleVideoSelect(item.id)}
              />
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.nextButtonContainer}>
              <TouchableOpacity 
                style={styles.nextButton} 
                onPress={handleVideoSelectionNext}
              >
                <Text style={styles.requestButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }

  // Message view
  if (view === "message") {
    return (
      <ScrollView style={styles.container}>
        <BackButton onPress={() => setView("video-selection")} />
        <View style={styles.header}>
          <Text style={styles.modalTitle}>Add a Message (Optional)</Text>
          
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
          
          <View style={styles.buttonContainer}>
            
            <TouchableOpacity
              style={[styles.nextButton, message.trim() ? {} : styles.nextButtonDisabled]}
              onPress={handleSendMessage}
            >
              <Text style={styles.requestButtonText}>
                {message.trim() ? 'Send with Message' : 'Send'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  // Main Profile View (Default)
  return (
    <ScrollView style={styles.container}>
      {/* Recruiter Profile Section */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image source={profile.image} style={styles.profileImage} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.title}>{profile.title}</Text>
          </View>
        </View>
      </View>

      {/* Open Roles Section */}
      <Text style={styles.sectionTitle}>Open Roles</Text>
      {openRoles.map((role, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{role.title}</Text>
          <Text style={styles.cardSubtitle}>{role.salary}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.requestButton}
        onPress={() => setView("video-selection")}
      >
        <Text style={styles.requestButtonText}>Send my HireReel</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
  },
  headerx: {
    marginTop: 30,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  videoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  videoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  videoInfo: {
    flex: 1,
  },
  endorserTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  messageInput: {
    width: '100%',
    backgroundColor: "#FDBA9B",
    borderRadius: 10,
    padding: 12,
    color: "#000",
    fontSize: 16,
    minHeight: 80,
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  checkboxUnchecked: {
    borderColor: '#EC4D04',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    borderColor: '#EC4D04',
    backgroundColor: '#EC4D04',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButtonContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#EC4D04",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});