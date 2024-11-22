import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const VideoItem = ({ videoUri, videoData, availableHeight, isPlaying }) => {
  const player = useVideoPlayer(videoUri, (playerInstance) => {
    playerInstance.loop = true;
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isPlaying && isFocused) {
      player.play();
    } else {
      player.pause();
      player.seekBy(0);
    }
  }, [isPlaying, isFocused, player]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.videoContainer, { height: availableHeight }]}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="cover"
        />
        <View style={styles.videoInfoSubcontainer}>
          <View style={styles.videoMetricsSubcontainer}>
            <View style={styles.videoMetric}>
              <Ionicons name="play" size={25}></Ionicons>
              <Text> {videoData.metrics.plays}</Text>
            </View>
            <View style={styles.videoMetric}>
              <Ionicons name="heart" size={25}></Ionicons>
              <Text> {videoData.metrics.likes}</Text>
            </View>
            <View style={styles.videoMetric}>
              <Ionicons name="chatbubble" size={25}></Ionicons>
              <Text> {videoData.metrics.comments}</Text>
            </View>
            <View style={styles.videoMetric}>
              <Ionicons name="share-social" size={25}></Ionicons>
              <Text> {videoData.metrics.shares}</Text>
            </View>
          </View>
          <View style={styles.endorserSubcontainer}>
            <Image
              style={styles.profileLogo}
              source={videoData.endorserProfilePicture}
            />
            <Text style={styles.endorserUsername}>{videoData.endorserTitle}</Text>
          </View>
          <View style={styles.skillsSubcontainer}>
            <Text>Skills: </Text>
            {videoData.skills.map((skill, index) => (
              <View style={styles.skill} key={index}>
                <Text style={styles.skillsText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    flex: 5,
    width: "100%",
    height: "100%",
  },
  videoInfoSubcontainer: {
    width: Dimensions.get("window").width,
    backgroundColor: "#FDA982",
    flex: 1,
    paddingLeft: "3%",
    paddingTop: "3%",
  },
  endorserSubcontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "2%",
  },
  endorserUsername: {
    marginTop: "1%",
  },
  skillsSubcontainer: {
    flexDirection: "row",
  },
  videoMetricsSubcontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "1%",
  },
  videoMetric: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileLogo: {
    width: 40,
    height: 40,
    marginRight: "1%",
  },
  skill: {
    backgroundColor: "#EC4D04",
    borderRadius: 50,
    marginHorizontal: "1%",
    paddingHorizontal: "2.5%",
    paddingVertical: "0.25%",
  },
  skillsText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});

export default VideoItem;
