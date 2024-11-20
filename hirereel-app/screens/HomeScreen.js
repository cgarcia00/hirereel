import React from "react";
import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import VideoFeed from "../components/VideoFeed";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const videoUrls = [
    "https://hirereel-videos.s3.us-east-1.amazonaws.com/James.mov",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  ];

  const videosData = [
    {
      metrics: {
        plays: 98,
        likes: 31,
        comments: 13,
        shares: 11,
      },
      endorserTitle: "Geraldo - SWE Manager @ Adobe",
      skills: ["Software Development", "Agile Methodologies"],
      endorserProfilePicture: require("../images/profileLogo.png"),
    },
    {
      metrics: {
        plays: 42,
        likes: 21,
        comments: 3,
        shares: 1,
      },
      endorserTitle: "Jessica - MLE @ Lyft",
      skills: ["Machine Learning", "Model Training"],
      endorserProfilePicture: require("../images/profileLogo.png"),
    },
    {
      metrics: {
        plays: 104,
        likes: 20,
        comments: 11,
        shares: 9,
      },
      endorserTitle: "Alex - Product Manager @ Nexter",
      skills: ["Software Development", "Product Management"],
      endorserProfilePicture: require("../images/profileLogo.png"),
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
