import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import TutorialsScreen from '../screens/TutorialsScreen';
import TopicScreen from '../screens/TopicScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const TutorialsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TutorialsMain" component={TutorialsScreen} />
      <Stack.Screen name="Topic" component={TopicScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#4361ee',
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: '#333333',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
          fontWeight: '500',
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Tutorials"
        component={TutorialsStack}
        options={{
          title: 'Learning Paths',
          drawerIcon: ({ color }) => <Ionicons name="book-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;