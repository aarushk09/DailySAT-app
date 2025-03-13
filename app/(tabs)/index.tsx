import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Button, ProgressBar, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back, Alex John!</Text>
        <Text style={styles.dateText}>March 9, 2025</Text>
      </View>
      
      <Card style={styles.overviewCard}>
        <Card.Content>
          <Title>Your Progress</Title>
          <View style={styles.progressSection}>
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Reading</Text>
              <ProgressBar progress={0.65} color="#4cc9f0" style={styles.progressBar} />
              <Text style={styles.progressText}>65%</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Math</Text>
              <ProgressBar progress={0.82} color="#f72585" style={styles.progressBar} />
              <Text style={styles.progressText}>82%</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
      
      <Text style={styles.sectionTitle}>Continue Learning</Text>
      
      <Card style={styles.continueCard}>
        <Card.Content>
          <View style={styles.continueHeader}>
            <View style={[styles.iconContainer, { backgroundColor: "#f72585" }]}>
            <MaterialCommunityIcons name="calculator" size={24} color="white" />
            </View>
            <View style={styles.continueInfo}>
              <Title>Quadratic Equations</Title>
              <Paragraph>Master equations in the form ax² + bx + c = 0</Paragraph>
            </View>
          </View>
          <ProgressBar progress={0.7} color="#f72585" style={styles.progressBar} />
          <Text style={styles.progressText}>70% Complete</Text>
        </Card.Content>
        <Card.Actions>
          <Button 
            mode="contained" 
            onPress={() => router.push({
              pathname: '/topic',
              params: { section: 'math', topicId: 'algebra', subtopic: '1' }
            })}
            style={{ backgroundColor: "#f72585" }}
          >
            Continue
          </Button>
        </Card.Actions>
      </Card>
      
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      
      <Card style={styles.activityCard}>
        <Card.Content>
          <View style={styles.activityItem}>
            <Avatar.Icon size={40} icon="check" style={{ backgroundColor: "#06d6a0" }} />
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Completed "Linear Equations"</Text>
              <Text style={styles.activityTime}>Today, 2:30 PM</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <Avatar.Icon size={40} icon="star" style={{ backgroundColor: "#ffd166" }} />
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Earned 50 points in Math</Text>
              <Text style={styles.activityTime}>Today, 1:15 PM</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  overviewCard: {
    margin: 16,
    elevation: 4,
  },
  progressSection: {
    marginTop: 15,
  },
  progressItem: {
    marginBottom: 15,
  },
  progressLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 5,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  continueCard: {
    margin: 16,
    marginTop: 8,
    elevation: 4,
  },
  continueHeader: {
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
  continueInfo: {
    flex: 1,
  },
  activityCard: {
    margin: 16,
    marginTop: 8,
    elevation: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityInfo: {
    marginLeft: 15,
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});