import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const AlertLoader = ({ listening }: { listening: boolean }) => {

  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 0.4,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  return (
    listening ?
      <View style={styles.mapPlaceholder} >
        <Animated.View className='border-2 border-green-300 p-[2]' style={{ borderRadius: 100 }}>
          <Animated.View className='w-4 h-4 bg-green-300 animate-pulse' style={{ borderRadius: 100 }}></Animated.View>
        </Animated.View>
        <Text className='text-gray-500 pt-2' style={{ fontFamily: "Poppins_500Medium" }}>Listening to alerts...</Text>
      </View >
      :
      <></>
  )
}

const styles = StyleSheet.create({
  mapPlaceholder: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 10
  },
});

export default AlertLoader