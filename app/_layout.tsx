import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PlaybackProvider } from '../context/PlaybackContext';

export default function RootLayout() {
  return (
    <PlaybackProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </PlaybackProvider>
  );
}
