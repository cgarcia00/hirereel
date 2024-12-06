import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const VideoItem = ({ videoUri, videoData, availableHeight, isPlaying, isModalView=false }) => {
  const player = useVideoPlayer(videoUri, (playerInstance) => {
    playerInstance.loop = true;
  });

  const isFocused = useIsFocused();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(videoData.metrics.likes);
  const [isModalVisible, setModalVisible] = useState(false);

  // Mock comments for the video
  const mockComments = [
    {
      id: 1,
      username: "John Smith",
      comment: "So true!"
    },
    {
      id: 1,
      username: "John Smith",
      comment: "So true!"
    },
    {
      id: 1,
      username: "John Smith",
      comment: "So true!"
    },
    {
      id: 1,
      username: "John Smith",
      comment: "So true!"
    }
  ]


  useEffect(() => {
    if (isPlaying && isFocused) {
      player.play();
    } else {
      player.pause();
      player.seekBy(0);
    }
  }, [isPlaying, isFocused, player]);

  // Toggle like functionality
  const handleLikeToggle = () => {
    if (isLiked) {
      setLikes((prevLikes) => prevLikes - 1);
    } else {
      setLikes((prevLikes) => prevLikes + 1);
    }
    setIsLiked(!isLiked);
  };

  // Open the comments modal and set comments
  const handleCommentPress = () => {
    setModalVisible(true); // Show the modal
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.videoContainer, { height: availableHeight }]}>
        <VideoView
          style={isModalView ? styles.videoModal : styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="cover"
        />
        <View style={isModalView ? styles.videoInfoSubcontainerModal : styles.videoInfoSubcontainer}>
          <View style={styles.videoMetricsSubcontainer}>
            <View style={isModalView ? {display: 'none'} : styles.videoMetric}>
              <Ionicons name="play" size={25} />
              <Text style={styles.metricText}>{videoData.metrics.plays}</Text>
            </View>
            <TouchableOpacity style={isModalView ? {display: 'none'} : styles.videoMetric} onPress={handleLikeToggle}>
              <Ionicons
                name="heart"
                size={25}
                color={isLiked ? "#EC4D04" : "#000"}
              />
              <Text style={styles.metricText}>{likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isModalView ? {display: 'none'} : styles.videoMetric}
              onPress={handleCommentPress}
            >
              <Ionicons name="chatbubble" size={25} />
              <Text style={styles.metricText}>{videoData.metrics.comments}</Text>
            </TouchableOpacity>
            <View style={isModalView ? {display: 'none'} : styles.videoMetric}>
              <Ionicons name="share-social" size={25} />
              <Text style={styles.metricText}>{videoData.metrics.shares}</Text>
            </View>
          </View>
          <View style={styles.endorserSubcontainer}>
            <Image
              style={styles.profileLogo}
              source={videoData.endorserProfilePicture}
            />
            <Text style={styles.endorserUsername}>{videoData.endorserTitle}</Text>
          </View>
          <View style={isModalView ? {display: 'none'} : styles.skillsSubcontainer}>
            <Text>Skills: </Text>
            {videoData.skills.map((skill, index) => (
              <View style={styles.skill} key={index}>
                <Text style={styles.skillsText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Comments Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Comments</Text>
            <FlatList
              data={videoData.comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <Text style={styles.commentUsername}>{item.username}</Text>
                  <Text style={styles.commentText}>{item.comment}</Text>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#FFF",
    flex: 1,
    paddingLeft: "3%",
    paddingTop: "3%",
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
  metricText: {
    width: 30,
    textAlign: "center",
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
  profileLogo: {
    width: 40,
    height: 40,
    marginRight: "5%",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "95%",
    height: "50%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  commentItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    paddingVertical: 8,
  },
  commentUsername: {
    fontWeight: "bold",
    color: "#000",
  },
  commentText: {
    color: "#555",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#EC4D04",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  videoModal: {
      width: "70%",
      height: "80%",
      marginBottom: "5%"
  },
  videoInfoSubcontainerModal: {
    width: "70%",
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingTop: "3%",
  },
});

export default VideoItem;
