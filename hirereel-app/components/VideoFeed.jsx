import React, { useRef, useState } from "react";
import { FlatList } from "react-native";
import VideoItem from "./VideoItem";

const VideoFeed = ({ videos, videosData, availableHeight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 80, // A video is "visible" if 80% of it is in view
  });

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const firstViewableItem = viewableItems[0].index;
      setCurrentIndex(firstViewableItem);
    }
  });

  return (
    <FlatList
      data={videos}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <VideoItem
          videoUri={item}
          videoData={videosData[index]}
          availableHeight={availableHeight}
          isPlaying={index === currentIndex}
        />
      )}
      snapToAlignment="center"
      pagingEnabled
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
    />
  );
};

export default VideoFeed;
