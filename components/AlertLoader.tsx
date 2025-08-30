import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AlertLoader = ({ listening }: { listening: boolean }) => {

  return (
    listening ?
      <View style={styles.mapPlaceholder} >
        <View className='border-2 border-green-300 p-[2]' style={{ borderRadius: 100 }}>
          <View className='w-4 h-4 bg-green-300' style={{ borderRadius: 100 }}></View>
        </View>
        <Text className='text-gray-500 pt-2' style={{ fontFamily: "Poppins_500Medium" }}>Listening to alerts...</Text>
      </View >
      :
      <View style={styles.mapPlaceholder} >
        <View className='border-2 border-red-300 p-[2]' style={{ borderRadius: 100 }}>
          <View className='w-4 h-4 bg-red-300' style={{ borderRadius: 100 }}></View>
        </View>
        <Text className='text-gray-500 pt-2' style={{ fontFamily: "Poppins_500Medium" }}>Inactive</Text>
      </View >
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

export default AlertLoader;