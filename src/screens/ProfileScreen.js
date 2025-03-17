import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Avatar, Button, List, Divider, ProgressBar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text 
          size={100} 
          label="AJ"
          style={styles.avatar}
        />
        <Text style={styles.name}>Alex John</Text>
        <Text style={styles.email}>alex.j@example.com</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>65%</Text>
            <Text style={styles.statLabel}>Overall Progress</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Completed Topics</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>850</Text>
            <Text style={styles.statLabel}>Points Earned</Text>
          </View>
        </View>
      </View>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Your Progress</Title>
          
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <View style={styles.progressSection}>
                <Ionicons name="book-outline" size={20} color="#4cc9f0" />
                <Text style={styles.progressTitle}>Reading</Text>
              </View>
              <Text style={styles.progressPercent}>65%</Text>
            </View>
            <ProgressBar progress={0.65} color="#4cc9f0" style={styles.progressBar} />
          </View>
          
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <View style={styles.progressSection}>
              <MaterialCommunityIcons name="calculator" size={20} color="white" />            
                  <Text style={styles.progressTitle}>Math</Text>
              </View>
              <Text style={styles.progressPercent}>82%</Text>
            </View>
            <ProgressBar progress={0.82} color="#f72585" style={styles.progressBar} />
          </View>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Recent Activity</Title>
          
          <List.Item
            title="Completed Linear Equations"
            description="Today, 2:30 PM"
            left={props => <List.Icon {...props} icon="check-circle" color="#06d6a0" />}
          />
          <Divider />
          
          <List.Item
            title="Earned 50 points in Math"
            description="Today, 1:15 PM"
            left={props => <List.Icon {...props} icon="star" color="#ffd166" />}
          />
          <Divider />
          
          <List.Item
            title="Started Supporting Details"
            description="Yesterday, 4:45 PM"
            left={props => <List.Icon {...props} icon="book" color="#118ab2" />}
          />
        </Card.Content>
      </Card>
      
      <View style={styles.buttonContainer}>
        <Button mode="outlined" style={styles.logoutButton} icon="logout">
          Log Out
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    marginBottom: 10,
    backgroundColor: '#4361ee',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#ddd',
  },
  card: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    elevation: 2,
  },
  progressItem: {
    marginVertical: 10,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTitle: {
    marginLeft: 8,
    fontSize: 16,
  },
  progressPercent: {
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  logoutButton: {
    width: '50%',
  },
});

export default ProfileScreen;