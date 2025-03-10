import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

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

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="topic" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}