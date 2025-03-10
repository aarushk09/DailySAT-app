import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Divider, IconButton } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import allTopicsData from './data/topicsData';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

type Subtopic = {
    id: string;
    title: string;
    description: string;
    content: string;
    completed: boolean;
};

type Topic = {
    color: string;
    iconName: string;
    title: string;
    description: string;
    subtopics: Subtopic[];
};

type SectionData = { [topicId: string]: Topic };

type AllTopicsData = { [section: string]: SectionData };

// Cast imported data to the proper type
const allTopics = allTopicsData as AllTopicsData;

export default function TopicScreen() {
    const params = useLocalSearchParams();
    const { section = 'reading', topicId = 'reading-comprehension', subtopic = '0' } = params;
    const [activeSubtopic, setActiveSubtopic] = useState(Number(subtopic));
    const { width } = useWindowDimensions();

    // Use the defined types
    const sectionKey = Array.isArray(section) ? section[0] : section;
    const topicKey = Array.isArray(topicId) ? topicId[0] : topicId;
    const sectionData: SectionData = allTopics[sectionKey] || allTopics.reading;
    const topicData: Topic = sectionData[topicKey] || (Object.values(sectionData)[0] as Topic) || {} as Topic;

    useEffect(() => {
        if (subtopic !== undefined) {
            setActiveSubtopic(Number(subtopic));
        }
    }, [subtopic]);

    if (!topicData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Topic not found</Text>
                <Button mode="contained" onPress={() => router.back()}>
                    Go Back
                </Button>
            </View>
        );
    }

    // Make sure subtopics exist and activeSubtopic is valid
    const currentSubtopic = topicData.subtopics[activeSubtopic] || topicData.subtopics[0];
    
    const handleSubtopicChange = (index: number) => {
        setActiveSubtopic(index);
    };
    
    const handleComplete = () => {
        // In a real app, you would update the completion status in your database
        alert("Congratulations! You have completed this subtopic.");
    };
    
    const handleBack = () => {
        router.back();
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    size={24}
                    onPress={handleBack}
                />
                <View style={styles.headerContent}>
                    <View style={[styles.iconContainer, { backgroundColor: topicData.color }]}>
                        <Ionicons name={topicData.iconName as any} size={24} color="white" />
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>{topicData.title}</Text>
                        <Text style={styles.headerSubtitle}>{topicData.description}</Text>
                    </View>
                </View>
            </View>
            
            <ScrollView style={styles.container}>
                <Card style={styles.subtopicsCard}>
                    <Card.Content>
                        <Title>Subtopics</Title>
                        <Paragraph>Complete all subtopics to master this skill</Paragraph>
                        
                        <Divider style={styles.divider} />
                        
                        {topicData.subtopics.map((subtopic: any, index: number) => (
                            <TouchableOpacity
                                key={subtopic.id}
                                style={[
                                    styles.subtopicItem,
                                    activeSubtopic === index ? { backgroundColor: `${topicData.color}10` } : null,
                                    activeSubtopic === index ? { borderLeftWidth: 4, borderLeftColor: topicData.color } : null,
                                ]}
                                onPress={() => handleSubtopicChange(index)}
                            >
                                <View style={styles.subtopicHeader}>
                                    <View style={[
                                        styles.subtopicIcon,
                                        { backgroundColor: subtopic.completed ? "#06d6a0" : '#e0e0e0' }
                                    ]}>
                                        {subtopic.completed ? (
                                            <Ionicons name="checkmark" size={16} color="white" />
                                        ) : (
                                            <Text style={styles.subtopicNumber}>{index + 1}</Text>
                                        )}
                                    </View>
                                    <View style={styles.subtopicInfo}>
                                        <Text style={styles.subtopicTitle}>{subtopic.title}</Text>
                                        <Text style={styles.subtopicDescription} numberOfLines={1}>
                                            {subtopic.description}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </Card.Content>
                </Card>
                
                <Card style={styles.contentCard}>
                    <Card.Content style={[styles.contentHeader, { backgroundColor: topicData.color }]}>
                        <Title style={styles.contentTitle}>{topicData.subtopics[activeSubtopic].title}</Title>
                        <Paragraph style={styles.contentSubtitle}>
                            {topicData.subtopics[activeSubtopic].description}
                        </Paragraph>
                    </Card.Content>
                    
                    <Card.Content style={styles.contentBody}>
                        <HTML
                            source={{ html: topicData.subtopics[activeSubtopic].content }}
                            contentWidth={width - 64}
                            tagsStyles={{
                                h3: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#333' },
                                h4: { fontSize: 16, fontWeight: 'bold', marginVertical: 8, color: '#555' },
                                p: { fontSize: 14, lineHeight: 22, marginVertical: 6, color: '#333' },
                                ul: { marginLeft: 10, marginVertical: 8 },
                                ol: { marginLeft: 15, marginVertical: 8 },
                                li: { fontSize: 14, lineHeight: 20, marginVertical: 4 },
                                blockquote: { 
                                    borderLeftWidth: 3, 
                                    borderLeftColor: '#ccc', 
                                    paddingLeft: 10, 
                                    fontStyle: 'italic',
                                    marginVertical: 10,
                                    backgroundColor: '#f9f9f9',
                                    padding: 10,
                                    borderRadius: 4
                                },
                            }}
                        />
                    </Card.Content>
                    
                    <Card.Actions style={styles.contentActions}>
                        <Button
                            mode="outlined"
                            onPress={() => {
                                if (activeSubtopic > 0) {
                                    handleSubtopicChange(activeSubtopic - 1);
                                }
                            }}
                            disabled={activeSubtopic === 0}
                        >
                            Previous
                        </Button>
                        
                        <Button
                            mode="contained"
                            style={[
                                styles.completeButton,
                                topicData.subtopics[activeSubtopic].completed ? 
                                    { backgroundColor: "#06d6a0" } : 
                                    { backgroundColor: topicData.color }
                            ]}
                            onPress={handleComplete}
                        >
                            {topicData.subtopics[activeSubtopic].completed ? "Already Completed ✓" : "Mark as Complete"}
                        </Button>
                        
                        <Button
                            mode="outlined"
                            onPress={() => {
                                if (activeSubtopic < topicData.subtopics.length - 1) {
                                    handleSubtopicChange(activeSubtopic + 1);
                                }
                            }}
                            disabled={activeSubtopic === topicData.subtopics.length - 1}
                        >
                            Next
                        </Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 16,
        backgroundColor: '#ffffff',
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    subtopicsCard: {
        margin: 16,
        marginBottom: 8,
        elevation: 2,
    },
    divider: {
        marginVertical: 10,
    },
    subtopicItem: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    subtopicHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtopicIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    subtopicNumber: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
    },
    subtopicInfo: {
        flex: 1,
    },
    subtopicTitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    subtopicDescription: {
        fontSize: 12,
        color: '#666',
    },
    contentCard: {
        margin: 16,
        marginTop: 8,
        elevation: 2,
    },
    contentHeader: {
        padding: 16,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    contentTitle: {
        color: 'white',
        fontSize: 18,
    },
    contentSubtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
    },
    contentBody: {
        padding: 16,
    },
    contentActions: {
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        padding: 8,
    },
    completeButton: {
        flex: 1,
        marginHorizontal: 8,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        marginBottom: 20,
    },
});