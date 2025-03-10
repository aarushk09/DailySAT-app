import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text, Divider, Avatar, ProgressBar } from 'react-native-paper';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Avatar.Text 
          size={70} 
          label="AJ"
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userEmail}>alex.j@example.com</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Overall Progress</Text>
        <ProgressBar progress={0.65} color="#4361ee" style={styles.progressBar} />
        <Text style={styles.progressText}>65% Complete</Text>
      </View>
      
      <Divider style={styles.divider} />
      
      <DrawerItemList {...props} />
      
      <Divider style={styles.divider} />
      
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>SAT Prep App v1.0</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#4361ee',
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progressTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'right',
    color: '#666',
  },
  divider: {
    marginVertical: 10,
  },
  footerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

export default CustomDrawerContent;