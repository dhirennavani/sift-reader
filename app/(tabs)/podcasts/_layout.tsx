import { Stack } from 'expo-router';

export default function PodcastsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="episodes" />
      <Stack.Screen name="episode-details" />
      <Stack.Screen name="player" />
    </Stack>
  );
}
