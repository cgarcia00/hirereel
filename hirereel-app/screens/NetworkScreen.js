import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";

const NetworkScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Friends");
  const [searchQuery, setSearchQuery] = useState("");

  const friends = [
    {
      id: "1",
      name: "Emma Parker",
      title: "SWE @ Boogle",
      image: require("../images/profileLogo.png"),
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
      title: "Staff SWE @ Tesla",
      image: require("../images/profileLogo.png"),
      experiences: [
        { role: "Software Engineer, Tesla, CA", date: "2021 - Present" },
        { role: "SWE Intern, Tesla, CA", date: "2020 - 2021" },
      ],
      education: [{ institution: "MIT", date: "2017 - 2021" }],
    },
    {
      id: "3",
      name: "Geraldo",
      title: "SWE Manager @ Adobe",
      image: require("../images/profileLogo.png"),
      experiences: [
        { role: "Manager, Adobe, CA", date: "2018 - Present" },
        { role: "Software Engineer, Adobe, CA", date: "2015 - 2018" },
      ],
      education: [{ institution: "Stanford University", date: "2011 - 2015" }],
    },
  ];

  const recruiters = [
    {
      id: "4",
      name: "Alice Recruiter",
      title: "Technical Recruiter @ Google",
      image: require("../images/profileLogo.png"),
    },
    {
      id: "5",
      name: "Bob Hiring",
      title: "Recruiter @ Meta",
      image: require("../images/profileLogo.png"),
    },
  ];
  //added search query
  const filterData = useCallback(
    (data) => {
      return data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    [searchQuery]
  );

  // Data to display based on selected tab
  const dataToDisplay = filterData(
    selectedTab === "Friends" ? friends : recruiters
  );

  return (
    <View style={styles.container}>
      {/* Tab Section */}
      <Text style={styles.pageTitle}>Your Network</Text>
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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or title..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* List Section */}
      <FlatList
        data={dataToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() =>
              navigation.navigate(
                selectedTab === "Friends"
                  ? "FriendProfileScreen"
                  : "RecruiterProfileScreen",
                { profile: item }
              )
            }
          >
            <Image source={item.image} style={styles.profileImage} />
            <View>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.titleText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: "center",
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
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
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
    backgroundColor: "#EC4D04", // Active tab background
  },
  tabText: {
    color: "#000", // Default text color
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFDCD1",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  titleText: {
    fontSize: 14,
    color: "#000",
  },
  pageTitle: {
    fontSize: 28,
    color: "#000",
    fontWeight: "bold",
    marginBottom: "2%",
    marginLeft: "2%",
  },
});

export default NetworkScreen;
