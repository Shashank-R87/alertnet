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
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress} className='bg-white py-2 px-5 rounded-lg'>
      <Text style={{fontFamily: "Poppins_400Regular"}} className='text-lg'>
        Send Notification
      </Text>
    </TouchableOpacity>
  );
};

export default NotificationButton;