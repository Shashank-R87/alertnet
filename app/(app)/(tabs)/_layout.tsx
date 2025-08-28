import { MyTabBar } from '@/components/TabBar';
import { useAuth } from '@/context/AuthContext';
import { Tabs } from 'expo-router';
import React from 'react';

export default function AppLayout() {

  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <MyTabBar {...props} />}>
      <Tabs.Screen name='home'></Tabs.Screen>
      <Tabs.Screen name='details'></Tabs.Screen>
      <Tabs.Screen name='profile'></Tabs.Screen>
    </Tabs>
  );
}
