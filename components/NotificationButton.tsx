import * as Notifications from 'expo-notifications';
import React from 'react';
import { Alert, Platform, Text, TouchableOpacity } from 'react-native';

export const initializeNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
};

const NotificationButton: React.FC = () => {
  const handlePress = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant notification permissions.');
      return;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Local Notification 📦",
        body: 'This is a local notification from AlertNet.',
      },
      trigger: null
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={handlePress} className='bg-gray-100 rounded-xl px-5 py-2 shadow-sm shadow-slate-400'>
      <Text style={{fontFamily: "Poppins_400Regular"}} className='text-lg'>
        Send Notification
      </Text>
    </TouchableOpacity>
  );
};

export default NotificationButton;