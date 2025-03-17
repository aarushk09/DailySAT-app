import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

// Create a simplified theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4361ee',
    accent: '#f72585',
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#212529',
    error: '#ef476f',
    success: '#06d6a0',
    info: '#118ab2',
    warning: '#ffd166',
    reading: '#4cc9f0',
    math: '#f72585',
    writing: '#7209b7',
  },
  roundness: 12,
};

export default function Layout() {
  const colorScheme = useColorScheme();
  
  const [loaded, error] = useFonts({
    ...Ionicons.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <Drawer screenOptions={{
          headerShown: true,
          drawerActiveBackgroundColor: '#4361ee',
          drawerActiveTintColor: '#ffffff',
          drawerInactiveTintColor: '#333333',
          drawerLabelStyle: {
            marginLeft: -20,
            fontSize: 16,
            fontWeight: '500',
          },
        }}>
          <Drawer.Screen
            name="index"
            options={{
              title: 'Dashboard',
              drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
            }}
          />
          <Drawer.Screen
            name="tutorials"
            options={{
              title: 'Learning Paths',
              drawerIcon: ({ color }) => <Ionicons name="book-outline" size={22} color={color} />,
            }}
          />
          <Drawer.Screen
            name="profile"
            options={{
              title: 'Profile',
              drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />,
            }}
          />
          <Drawer.Screen 
            name="practice"
            options={{
              title: "Practice",
              drawerIcon: ({color}) => <Ionicons name="american-football-outline" size={22} color={color} />
            }}
          />
          {/* <Drawer.Screen 
            name="reading"
            options={{
              title: "Reading",
              drawerIcon: ({color}) => null
            }}
          /> */}
        </Drawer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}