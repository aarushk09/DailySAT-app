import React, { useState, useRef, useEffect } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Animated,
} from "react-native";
import Groq from "groq-sdk";
import { SafeAreaView } from "react-native-safe-area-context";
// import {GROQ_API_KEY} from "@env";
import Config from "react-native-config";

const { width, height } = Dimensions.get("window");

const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true });

const Tutor: React.FC = () => {
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);

    const fadeIn = () => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const getGroqChatCompletion = async () => {
        if (!input.trim()) return;
    
        const userMessage: { role: "user"; content: string } = { role: "user", content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput("");
        setIsTyping(true);
    
        try {
            const result = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: "You are an SAT assistant trained to give the user exactly what they want and not reveal any <think></think> tags, only responding to what the user said and nothing else" },
                    ...messages.map((msg) => ({
                        role: msg.role as "user" | "assistant",
                        content: msg.content,
                    })),
                    userMessage,
                ],
                model: "gemma2-9b-it",
                temperature: 0.5,
                max_completion_tokens: 1024,
                top_p: 1,
                stop: null,
                stream: false,
            });
    
            const aiResponse = result.choices?.[0]?.message?.content || "No response received.";
            const aiMessage: { role: "assistant"; content: string } = { role: "assistant", content: aiResponse };
    
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
            fadeIn();
        } catch (error) {
            console.error("Error:", error);
        }
    
        setIsTyping(false);
    };    

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <Animated.View style={[styles.messageContainer, item.role === "user" ? styles.userMessage : styles.assistantMessage, { opacity: fadeAnim }]}>
                        <Text style={styles.messageText}>{item.content}</Text>
                    </Animated.View>
                )}
                contentContainerStyle={styles.messagesList}
            />
            {isTyping && <Text style={styles.typingIndicator}>AI is typing...</Text>}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Type your message..."
                    value={input}
                    onChangeText={setInput}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.sendButton} onPress={getGroqChatCompletion}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f5f8fa",
    },
    messagesList: {
        flexGrow: 1,
        padding: 15,
    },
    messageContainer: {
        padding: 12,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: "80%",
    },
    userMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#3498db",
    },
    assistantMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#e0e0e0",
    },
    messageText: {
        color: "black",
        fontSize: 16,
    },
    typingIndicator: {
        textAlign: "center",
        fontStyle: "italic",
        color: "black",
        marginVertical: 5,
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "white",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: "#3498db",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    sendButtonText: {
        color: "white",
        fontSize: 16,
    },
});

export default Tutor;
