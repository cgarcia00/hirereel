import React, { useState, useRef } from "react";
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

const MessageScreen = ({ route, navigation }) => {
  const { chat } = route.params;
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(chat.messages || []);
  const scrollViewRef = useRef();

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      content: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString(),
      sender: "user", // Add sender field to distinguish between sent and received messages
      type: "message",
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");

    // Scroll to bottom after sending message
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const navigateToProfile = () => {
    const screenName =
      chat.type === "friend" ? "FriendProfileScreen" : "RecruiterProfileScreen";
    navigation.navigate(screenName, { profile: chat });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Header */}
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

      {/* Messages Area */}
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageWrapper,
              message.type === "system" && styles.systemMessage,
              message.sender === "user"
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}
          >
            {message.type !== "system" && (
              <View
                style={[
                  styles.messageBubble,
                  message.sender === "user"
                    ? styles.sentBubble
                    : styles.receivedBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.sender === "user"
                      ? styles.sentMessageText
                      : styles.receivedMessageText,
                  ]}
                >
                  {message.content}
                </Text>
                <Text
                  style={[
                    styles.timestamp,
                    message.sender === "user"
                      ? styles.sentTimestamp
                      : styles.receivedTimestamp,
                  ]}
                >
                  {message.timestamp}
                </Text>
              </View>
            )}
            {message.type === "system" && (
              <Text style={styles.systemMessageText}>{message.content}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
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
  messageWrapper: {
    marginBottom: 12,
    maxWidth: "80%",
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: "100%",
  },
  sentMessage: {
    alignSelf: "flex-end",
  },
  receivedMessage: {
    alignSelf: "flex-start",
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
  },
  sentMessageText: {
    color: "#FFF",
  },
  receivedMessageText: {
    color: "#000",
  },
  systemMessage: {
    alignSelf: "center",
    marginVertical: 20,
  },
  systemMessageText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
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
//new 3
