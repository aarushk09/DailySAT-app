import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Title, Paragraph, Button, ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const Practice: React.FC = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Practice</Text>
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
        {/* Math Questions Card */}
        <Card style={styles.continueCard}>
          <Card.Content>
            <View style={styles.continueHeader}>
              <View style={[styles.iconContainer, { backgroundColor: "#f72585" }]}>
                <MaterialCommunityIcons name="calculator" size={24} color="white" />
              </View>
              <View style={styles.continueInfo}>
                <Title>Math Questions</Title>
                <Paragraph>Master equations in the form ax² + bx + c = 0</Paragraph>
              </View>
            </View>
            <ProgressBar progress={0.6} color="#f72585" style={styles.progressBar} />
            <Text style={styles.progressText}>60% Complete</Text>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => router.push({
                pathname: '/(tabs)/math',
              })}
              style={{ backgroundColor: "#f72585" }}
            >
              Continue
            </Button>
          </Card.Actions>
        </Card>
        {/* Reading Questions Card */}
        <Card style={styles.continueCard}>
          <Card.Content>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/english')}
              style={styles.touchableArea}
            >
              <View style={styles.continueHeader}>
                <View style={[styles.iconContainer, { backgroundColor: "#118ab2" }]}>
                  <MaterialCommunityIcons name="book" size={24} color="white" />
                </View>
                <View style={styles.continueInfo}>
                  <Title>Reading Questions</Title>
                  <Paragraph>Improve your understanding of complex passages</Paragraph>
                </View>
              </View>
            </TouchableOpacity>
            <ProgressBar progress={0.3} color="#118ab2" style={styles.progressBar} />
            <Text style={styles.progressText}>30% Complete</Text>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => router.push('/(tabs)/english')}
              style={{ backgroundColor: "#118ab2" }}
            >
              Continue
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
};

export default Practice;

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
    textAlign: 'center'
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
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold"
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
});