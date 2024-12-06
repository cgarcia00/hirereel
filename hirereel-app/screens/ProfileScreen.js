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
import VideoItem from "../components/VideoItem";
import { BarChart, PieChart } from "react-native-chart-kit";

export default function ProfileScreen() {
  const videosData = [
    {
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
      url: "https://hirereel-videos.s3.us-east-1.amazonaws.com/cristobal.mov",
    },
    {
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

  const analyticsData = {
    videoMetrics: {
      labels: ["Video 1", "Video 2", "Video 3"],
      datasets: [
        {
          data: [98, 42, 104],
        },
      ],
    },
    pieData: [
      {
        name: "Plays",
        count: 244,
        color: "#EC4D04",
        legendFontColor: "#000",
        legendFontSize: 15,
      },
      {
        name: "Likes",
        count: 72,
        color: "#FFD700",
        legendFontColor: "#000",
        legendFontSize: 15,
      },
      {
        name: "Shares",
        count: 21,
        color: "#00BFFF",
        legendFontColor: "#000",
        legendFontSize: 15,
      },
    ],
  };

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
    name: "Maxim Ivanov",
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
          {videosData.map((hireReel, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openModal(hireReel)}
              style={styles.gridItem}
            >
              <Image source={hireReel.thumbNail} style={styles.gridImage} />
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
                <VideoItem
                  videoUri={selectedHireReel.url}
                  videoData={selectedHireReel}
                  availableHeight={600}
                  isPlaying={false}
                  isModalView={true}
                />
              )}
              <View style={styles.modalButtons}>
                <Button
                  title="Share"
                  buttonStyle={styles.shareButton}
                  titleStyle={styles.shareButtonText}
                  onPress={() => Alert.alert("Working on this.")}
                />
                <Button
                  title="Close"
                  buttonStyle={styles.closeButton}
                  titleStyle={styles.closeButtonText}
                  onPress={closeModal}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  if (view === "analytics") {
    return (
      <ScrollView style={styles.container}>
        <BackButton onPress={() => setView("profile")} />
        <Text style={styles.pageTitle}>Your Analytics</Text>

        {/* Bar Chart for Video Metrics */}
        <Text style={styles.chartTitle}>Plays Per Video</Text>
        <BarChart
          data={analyticsData.videoMetrics}
          width={350} // Width of the chart
          height={220} // Height of the chart
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#FFF",
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(236, 77, 4, ${opacity})`,
          }}
          style={styles.chart}
        />

        {/* Pie Chart for Total Engagement */}
        <Text style={styles.chartTitle}>24 Hour Engagement Breakdown</Text>
        <PieChart
          data={analyticsData.pieData}
          width={350}
          height={220}
          chartConfig={{
            backgroundColor: "#FFF",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </ScrollView>
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
    width: "90%",
    height: "70%",
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
    marginLeft: 20,
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
  modalButtons: {
    flexDirection: "row",
  },
  chart: {
    marginVertical: 10,
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
});
