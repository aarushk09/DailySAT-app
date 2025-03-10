import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Chip, Searchbar, SegmentedButtons } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { readingTopicsData, mathTopicsData } from '../data/topicsData';
import { router } from 'expo-router';

export default function TutorialsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('reading');
  
  const onChangeSearch = (query: string) => setSearchQuery(query);
  
  const topicsData = activeSection === 'reading' ? readingTopicsData : mathTopicsData;
  
  const renderTopicCard = (topic: any) => {
    return (
      <TouchableOpacity
        key={topic.id}
        onPress={() => router.push({
          pathname: '/topic',
          params: { section: activeSection, topicId: topic.id }
        })}
      >
        <Card style={styles.topicCard}>
          <Card.Content>
            <View style={styles.topicHeader}>
              <View style={[styles.iconContainer, { backgroundColor: topic.color }]}>
                <Ionicons name={topic.iconName} size={24} color="white" />
              </View>
              <View style={styles.topicInfo}>
                <Title>{topic.title}</Title>
                <Paragraph numberOfLines={2}>{topic.description}</Paragraph>
              </View>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>{topic.progress}% Complete</Text>
                <Text style={styles.subtopicsText}>
                  {topic.subtopics.filter((s: any) => s.completed).length} of {topic.subtopics.length} subtopics
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${topic.progress}%`, backgroundColor: topic.color }]} />
              </View>
            </View>
            
            <View style={styles.subtopicsContainer}>
              {topic.subtopics.map((subtopic: any, index: number) => (
                <Chip
                  key={subtopic.id}
                  style={[
                    styles.subtopicChip,
                    subtopic.completed ? { backgroundColor: `${topic.color}20` } : null
                  ]}
                  icon={subtopic.completed ? "check" : ""}
                  onPress={() => router.push({
                    pathname: '/topic',
                    params: { 
                      section: activeSection, 
                      topicId: topic.id,
                      subtopic: index.toString()
                    }
                  })}
                >
                  {subtopic.title}
                </Chip>
              ))}
            </View>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained" 
              onPress={() => router.push({
                pathname: '/topic',
                params: { section: activeSection, topicId: topic.id }
              })}
              style={{ backgroundColor: topic.color }}
            >
              Continue Learning
            </Button>
          </Card.Actions>
        </Card>
      </TouchableOpacity>
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learning Paths</Text>
        <Text style={styles.headerSubtitle}>Master the SAT with our guided tutorials</Text>
      </View>
      
      <Searchbar
        placeholder="Search topics..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      <SegmentedButtons
        value={activeSection}
        onValueChange={setActiveSection}
        buttons={[
          {
            value: 'reading',
            label: 'Reading',
            icon: 'book-outline',
          },
          {
            value: 'math',
            label: 'Math',
            icon: 'calculator-outline',
          },
        ]}
        style={styles.segmentedButtons}
      />
      
      {Object.values(topicsData).map(renderTopicCard)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  segmentedButtons: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  topicCard: {
    margin: 16,
    marginTop: 8,
    marginBottom: 16,
    elevation: 3,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  topicInfo: {
    flex: 1,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  subtopicsText: {
    fontSize: 12,
    color: '#666',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  subtopicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  subtopicChip: {
    margin: 4,
  },
});