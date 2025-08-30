import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="zonemap" options={{ headerShown: false}} />
      <Stack.Screen name="about" options={{ headerShown: false}} />
    </Stack>
  );
}