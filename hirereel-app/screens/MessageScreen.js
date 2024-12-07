import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useMessages } from "../contexts/MessageContext";

const MessageScreen = ({ route, navigation }) => {
  const { chat } = route.params;
  const [messageInput, setMessageInput] = useState("");
  const scrollViewRef = useRef();
  const { getMessages, addMessage, markAsRead } = useMessages();
  const messages = getMessages(chat.id);

  useEffect(() => {
    // Mark as read when the screen is opened
    markAsRead(chat.id);

    // Add initial system message if no messages exist
    if (messages.length === 0 && chat.lastMessage) {
      addMessage(chat.id, {
        type: "system",
        content: chat.lastMessage,
        timestamp: chat.timestamp,
      });
    }
  }, [chat.id]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const newMessage = {
      content: messageInput.trim(),
      timestamp: timestamp,
      sender: "user",
      type: "message",
    };

    addMessage(chat.id, newMessage);
    setMessageInput("");

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const navigateToProfile = () => {
    const screenName =
      chat.type === "friend" ? "FriendProfileScreen" : "RecruiterProfileScreen";
    navigation.navigate(screenName, { profile: chat });
  };

  const renderMessage = (message, index) => {
    const isHireReelNotification = message.content
      .toLowerCase()
      .includes("hire reel");

    if (isHireReelNotification) {
      return (
        <View key={index} style={styles.systemMessageContainer}>
          <Text style={styles.systemMessageText}>{message.content}</Text>
        </View>
      );
    }

    const isUserMessage = message.sender === "user";
    return (
      <View
        key={index}
        style={[
          styles.messageOuterContainer,
          isUserMessage
            ? styles.sentMessageContainer
            : styles.receivedMessageContainer,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isUserMessage ? styles.sentBubble : styles.receivedBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isUserMessage
                ? styles.sentMessageText
                : styles.receivedMessageText,
            ]}
          >
            {message.content}
          </Text>
          <Text
            style={[
              styles.timestamp,
              isUserMessage ? styles.sentTimestamp : styles.receivedTimestamp,
            ]}
          >
            {message.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileInfo}
          onPress={navigateToProfile}
        >
          <Image source={chat.image} style={styles.profileImage} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.name}>{chat.name}</Text>
            <Text style={styles.title}>{chat.title}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((message, index) => renderMessage(message, index))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="attach" size={24} color="#666" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={messageInput}
          onChangeText={setMessageInput}
          placeholder="Type a message..."
          placeholderTextColor="#666"
          onSubmitEditing={handleSendMessage}
          returnKeyType="send"
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            messageInput.trim() ? styles.sendButtonActive : null,
          ]}
          onPress={handleSendMessage}
        >
          <Ionicons
            name="send"
            size={24}
            color={messageInput.trim() ? "#EC4D04" : "#666"}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#FFDCD1",
  },
  backButton: {
    marginRight: 16,
  },
  backArrow: {
    fontSize: 24,
    color: "#000",
  },
  profileInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 14,
    color: "#666",
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  systemMessageContainer: {
    alignItems: "center",
    marginVertical: 12,
  },
  systemMessageText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
  },
  messageOuterContainer: {
    marginVertical: 4,
    maxWidth: "80%",
  },
  sentMessageContainer: {
    alignSelf: "flex-end",
  },
  receivedMessageContainer: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: "100%",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  sentBubble: {
    backgroundColor: "#EC4D04",
    borderTopRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: "#FFDCD1",
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  sentMessageText: {
    color: "#FFFFFF",
  },
  receivedMessageText: {
    color: "#000000",
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  sentTimestamp: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "right",
  },
  receivedTimestamp: {
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#FFDCD1",
  },
  attachButton: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 12,
    marginRight: 12,
    color: "#000",
  },
  sendButton: {
    padding: 8,
  },
  sendButtonActive: {
    opacity: 1,
  },
});

export default MessageScreen;
