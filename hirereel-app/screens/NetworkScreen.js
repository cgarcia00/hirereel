import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const NetworkScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Friends");

  const friends = [
    {
      id: "1",
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
      id: "2",
      name: "Geraldo",
      title: "SWE Manager @ Adobe",
      image: require("../images/profileLogo.png"),
      experiences: [
        { role: "Manager, Adobe, CA", date: "2018 - Present" },
        { role: "Software Engineer, Adobe, CA", date: "2015 - 2018" },
      ],
      education: [{ institution: "Stanford University", date: "2011 - 2015" }],
    },
    {
      id: "3",
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

  // Data to display based on selected tab
  const dataToDisplay = selectedTab === "Friends" ? friends : recruiters;

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

      {/* List Section */}
      <FlatList
        data={dataToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() =>
              navigation.navigate("ProfileScreen", { profile: item })
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
    backgroundColor: "#FFDCD1",
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    backgroundColor: "#FDA982",
    borderRadius: 50,
    width: Dimensions.get("window").width * 0.5,
    marginLeft: "1%",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 2,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FDA982",
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
    backgroundColor: "#FDA982",
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
