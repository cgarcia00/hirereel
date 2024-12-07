import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useMessages } from "../contexts/MessageContext";

export default function InboxScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("Friends");
  const [searchQuery, setSearchQuery] = useState("");
  const { isMessageRead } = useMessages();

  // Friend chat data
  const friendChats = [
    {
      id: "1",
      name: "Emma Parker",
      image: require("../images/profileLogo.png"),
      lastMessage: "Emma requested a hire reel.",
      timestamp: "2h ago",
      type: "friend",
      title: "SWE @ Boogle",
      experiences: [
        { role: "Software Engineer, Boogle, CA", date: "Oct 2023 - Oct 2024" },
        {
          role: "CS147 Course Assistant, Stanford, CA",
          date: "Sep 2022 - June 2023",
        },
      ],
      education: [{ institution: "Stanford University", date: "2019 - 2023" }],
    },
    {
      id: "2",
      name: "Hamilton Smith",
      image: require("../images/profileLogo.png"),
      lastMessage: "Hamilton sent you a hire reel.",
      timestamp: "5h ago",
      type: "friend",
      title: "Staff SWE @ Tesla",
      experiences: [
        { role: "Software Engineer, Tesla, CA", date: "2021 - Present" },
        { role: "SWE Intern, Tesla, CA", date: "2020 - 2021" },
      ],
      education: [{ institution: "MIT", date: "2017 - 2021" }],
    },
    {
      id: "3",
      name: "Geraldo",
      image: require("../images/profileLogo.png"),
      lastMessage: "Sure, I'll send you one soon.",
      timestamp: "1d ago",
      type: "friend",
      title: "SWE Manager @ Adobe",
      experiences: [
        { role: "Manager, Adobe, CA", date: "2018 - Present" },
        { role: "Software Engineer, Adobe, CA", date: "2015 - 2018" },
      ],
      education: [{ institution: "Stanford University", date: "2011 - 2015" }],
    },
  ];

  // Recruiter chat data
  const recruiterChats = [
    {
      id: "4",
      name: "Alice Recruiter",
      image: require("../images/profileLogo.png"),
      lastMessage: "Would you be interested in a position at Google?",
      timestamp: "3h ago",
      type: "recruiter",
      title: "Technical Recruiter @ Google",
    },
    {
      id: "5",
      name: "Bob Hiring",
      image: require("../images/profileLogo.png"),
      lastMessage:
        "Thanks for connecting! I'd love to discuss opportunities at Meta.",
      timestamp: "1d ago",
      type: "recruiter",
      title: "Recruiter @ Meta",
    },
  ];

  const filteredChats = useCallback(() => {
    const chats = selectedTab === "Friends" ? friendChats : recruiterChats;
    return chats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, selectedTab]);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate("MessageScreen", {
          chat: {
            ...item,
            messages: [
              {
                type: "system",
                content: item.lastMessage,
                timestamp: item.timestamp,
              },
            ],
          },
        })
      }
    >
      <Image source={item.image} style={styles.profileImage} />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.timestampText}>{item.timestamp}</Text>
        </View>
        <Text
          style={[
            styles.lastMessageText,
            !isMessageRead(item.id) && styles.unreadMessage,
          ]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Your Messages</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "Friends" && styles.activeTabButton,
          ]}
          onPress={() => setSelectedTab("Friends")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Friends" && styles.activeTabText,
            ]}
          >
            Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "Recruiters" && styles.activeTabButton,
          ]}
          onPress={() => setSelectedTab("Recruiters")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Recruiters" && styles.activeTabText,
            ]}
          >
            Recruiters
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredChats()}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pageTitle: {
    fontSize: 28,
    color: "#000",
    fontWeight: "bold",
    marginBottom: "2%",
    marginLeft: "2%",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    backgroundColor: "#FFDCD1",
    borderRadius: 50,
    width: Dimensions.get("window").width * 0.5,
    marginLeft: "1%",
    marginTop: "3%",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 2,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FFDCD1",
  },
  activeTabButton: {
    backgroundColor: "#EC4D04",
  },
  tabText: {
    color: "#000",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  searchContainer: {
    marginBottom: 16,
    marginTop: 8,
    paddingHorizontal: "1%",
  },
  searchInput: {
    backgroundColor: "#FDBA9B",
    borderRadius: 10,
    padding: 12,
    color: "#000",
    fontSize: 16,
  },
  chatItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFDCD1",
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  timestampText: {
    fontSize: 12,
    color: "#666",
  },
  lastMessageText: {
    fontSize: 14,
    color: "#666",
  },
  unreadMessage: {
    fontWeight: "bold",
    color: "#000",
  },
});
