import React from "react";
import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import VideoFeed from "../components/VideoFeed";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const videoUrls = [
    "https://hirereel-videos.s3.us-east-1.amazonaws.com/James.mov",
    "https://hirereel-videos.s3.us-east-1.amazonaws.com/David.mov",
    "https://hirereel-videos.s3.us-east-1.amazonaws.com/James.mov",
  ];

  const videosData = [
    {
      metrics: {
        plays: 98,
        likes: 31,
        comments: 13,
        shares: 11,
      },
      endorserTitle: "Cristobal - SWE Manager @ Adobe",
      skills: ["Software Development", "Agile Methodologies"],
      endorserProfilePicture: require("../images/Cristobal.png"),
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
    },
    {
      metrics: {
        plays: 104,
        likes: 20,
        comments: 11,
        shares: 9,
      },
      endorserTitle: "James - Product Manager @ CS147",
      skills: ["Software Development", "Product Management"],
      endorserProfilePicture: require("../images/Landay.png"),
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
