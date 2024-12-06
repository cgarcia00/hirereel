import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import VideoFeed from "../components/VideoFeed";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen({ navigation }) {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);

  const videoUrls = [
    "https://hirereel-videos.s3.us-east-1.amazonaws.com/James.mov",
    "https://hirereel-videos.s3.us-east-1.amazonaws.com/David.mov",
    "https://hirereel-videos.s3.us-east-1.amazonaws.com/cristobal.mov",
  ];

  const videosData = [
    {
      metrics: {
        plays: 98,
        likes: 31,
        comments: 4,
        shares: 11,
      },
      endorserTitle: "James - Product Manager @ CS147",
      skills: ["Software Development", "Product Management"],
      endorserProfilePicture: require("../images/Landay.png"),
      comments: [
        {
          id: 1,
          username: "Alice Zhang",
          comment: "Second this!",
        },
        {
          id: 2,
          username: "Alex Forest",
          comment: "Gotta mention their tenacity too.",
        },
        {
          id: 3,
          username: "Reed Jackson",
          comment: "Inspiring.",
        },
        {
          id: 4,
          username: "John Smith",
          comment: "Agree!",
        },
      ],
    },
    {
      metrics: {
        plays: 42,
        likes: 21,
        comments: 3,
        shares: 1,
      },
      endorserTitle: "David Zhou - Senior Manager @ ABC Tech",
      skills: ["Scrum/Agile", "Leadership Principles"],
      endorserProfilePicture: require("../images/David.png"),
      comments: [
        {
          id: 1,
          username: "Pablo Perez",
          comment: "Speak your truth David.",
        },
        {
          id: 2,
          username: "Oliver Bacon",
          comment: "Maxim's leadership is on another level.",
        },
        {
          id: 3,
          username: "Jake Black",
          comment: "The rain the background is crazy!",
        },
      ],
    },
    {
      metrics: {
        plays: 104,
        likes: 20,
        comments: 2,
        shares: 9,
      },
      endorserTitle: "Cristobal - SWE Manager @ Adobe",
      skills: ["Software Development", "Agile Methodologies"],
      endorserProfilePicture: require("../images/Cristobal.png"),
      comments: [
        {
          id: 1,
          username: "John Smith",
          comment: "I agree!",
        },
        {
          id: 2,
          username: "Jasmin Lopez",
          comment: "Yeah that are super skilled at what they do.",
        },
      ],
    },
  ];

  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navbarHeight = useBottomTabBarHeight();
  const totalScreenHeight = Dimensions.get("window").height;
  const availableHeight = totalScreenHeight - headerHeight - navbarHeight;

  return (
    <SafeAreaView style={styles.container}>
      <VideoFeed
        videos={videoUrls}
        videosData={videosData}
        availableHeight={availableHeight}
      />

      {showOnboarding && (
        <Modal
          transparent
          animationType="fade"
          visible={showOnboarding}
          onRequestClose={() => setShowOnboarding(false)}
        >
          <View style={styles.overlay}>
            {/* Darkened Background */}
            <View style={styles.background} />

            {/* Onboarding Messages */}
            <Text
              style={[
                onboardingStep === 0 ? styles.text : styles.invisText,
                { top: availableHeight * 0.3 },
              ]}
            >
              Scroll through HireReels from those in your network from the home
              page
            </Text>

            <View style={styles.onboardingButtons}>
              {/* Navigation Buttons */}
              <View style={styles.navButtons}>
                <TouchableOpacity
                  onPress={() =>
                    onboardingStep > 0 && setOnboardingStep(onboardingStep - 1)
                  }
                  disabled={onboardingStep === 0}
                  style={[
                    styles.navButton,
                    onboardingStep === 0 ? styles.disabledNavButton : {},
                  ]}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={32}
                    color={onboardingStep === 0 ? "gray" : "white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    onboardingStep < 5 && setOnboardingStep(onboardingStep + 1)
                  }
                  disabled={onboardingStep === 5}
                  style={[
                    styles.navButton,
                    onboardingStep === 5 ? styles.disabledNavButton : {},
                  ]}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={32}
                    color={onboardingStep === 5 ? "gray" : "white"}
                  />
                </TouchableOpacity>
              </View>
              {onboardingStep === 5 && (
                <TouchableOpacity
                  style={styles.dismissButton}
                  onPress={() => setShowOnboarding(false)}
                >
                  <Text style={styles.dismissText}>Got it!</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.highlightContainer}>
              <View style={styles.invisHighlight}></View>
              <View
                style={
                  onboardingStep === 1
                    ? styles.createHighlight
                    : styles.invisHighlight
                }
              >
                <Text
                  style={
                    onboardingStep === 1
                      ? styles.highlightText
                      : styles.invisHighlightText
                  }
                >
                  Go here to send/request HireReels
                </Text>
              </View>
              <View
                style={
                  onboardingStep === 2
                    ? styles.createHighlight
                    : styles.invisHighlight
                }
              >
                <Text
                  style={
                    onboardingStep === 2
                      ? styles.highlightText
                      : styles.invisHighlightText
                  }
                >
                  Go here to create a HireReel
                </Text>
              </View>
              <View
                style={
                  onboardingStep === 3
                    ? styles.createHighlight
                    : styles.invisHighlight
                }
              >
                <Text
                  style={
                    onboardingStep === 3
                      ? styles.highlightText
                      : styles.invisHighlightText
                  }
                >
                  Use the inbox to message users
                </Text>
              </View>
              <View
                style={
                  onboardingStep === 4
                    ? styles.createHighlight
                    : styles.invisHighlight
                }
              >
                <Text
                  style={
                    onboardingStep === 4
                      ? styles.highlightText
                      : styles.invisHighlightText
                  }
                >
                  View your profile and analytics
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  background: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    position: "absolute",
    width: "80%",
    alignSelf: "center",
  },
  invisText: {
    color: "rgba(0, 0, 0, 0)",
  },
  networkHighlight: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  createHighlight: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  highlightText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    position: "relative",
    bottom: 50,
    width: 100,
    height: 90,
  },
  invisHighlightText: {
    color: "rgba(0, 0, 0, 0)",
    fontSize: 14,
    textAlign: "center",
    position: "relative",
    bottom: 50,
    width: 100,
    height: 90,
  },
  dismissButton: {
    alignSelf: "center",
    backgroundColor: "#EC4D04",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  dismissText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  highlightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "4%",
    marginBottom: "8%",
  },
  invisHighlight: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 0)",
    alignItems: "center",
    justifyContent: "center",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: "3%",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  onboardingButtons: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: "35%",
    height: "10%",
  },
});
