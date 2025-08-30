import ZoneMapComponent from '@/components/ZoneMapComponent';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type Zone = {
  zoneName: string;
  contractAddress: string;
  latitude: number;
  longitude: number;
  radius: number; // meters
};

const ZoneMap = () => {

  const params = useLocalSearchParams();

  let zone, location;
  try {
    zone = params.zone ? JSON.parse(params.zone as string) : null;
    location = params.location ? JSON.parse(params.location as string) : null;
  } catch (e) {
    console.error("Failed to parse zone or location params:", e);
  }

  return (
    zone ? (
      <ZoneMapComponent location={location} zone={zone} enableInteraction={true} />
    ) : (
      <View style={styles.mapPlaceholder} className='w-full aspect-square'>
        <ActivityIndicator size="small" color="#808080" />
        <Text className='text-gray-500 pt-2' style={{ fontFamily: "Poppins_500Medium" }}>Finding your zone...</Text>
      </View>
    )
  )
}

const styles = StyleSheet.create({
  mapPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
});

export default ZoneMap