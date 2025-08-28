import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AlertCard = ({zoneNumber}:{zoneNumber: number}) => {
  return (
            <View className='flex flex-col gap-1 bg-white w-full rounded-lg px-4 py-4'>
              <View className='flex-row flew justify-between'>
                <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-base pb-1'>
                  Alert Active: Zone {zoneNumber}
                </Text>
                <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-base pb-1 text-gray-500'>
                  26th August 2025
                </Text>
              </View>

              <Text style={{ fontFamily: "Poppins_400Regular" }} className='text-base text-gray-500 text-justify'>
                Single-vehicle incident reported. Preliminary cause is suspected driver fatigue leading to loss of control.
              </Text>

              <View style={styles.gridContainer}>
                <View className='flex-row gap-2' style={{ width: '100%' }}>
                  <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-base'>Number Plate</Text>
                  <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-base text-gray-500'>{'MH12AB1234'}</Text>
                </View>
                <View className='flex-row gap-2 col-span-1'>
                  <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-base'>Make</Text>
                  <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-base text-gray-500'>{'Toyota'}</Text>
                </View>
                <View className='flex-row gap-2 col-span-1'>
                  <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-base'>Model</Text>
                  <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-base text-gray-500'>{'Innova'}</Text>
                </View>
                <View className='flex-row gap-2 col-span-1'>
                  <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-base'>WTC</Text>
                  <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-base text-gray-500'>{'2.5L Diesel'}</Text>
                </View>
              </View>

            </View>
  )
}

const styles = StyleSheet.create({
  profilePhoto: { width: 38, height: 38, borderRadius: 50 },
  logo: { width: 58, height: 58 },
  fadeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  mapPlaceholder: {
    height: 300, // Should be the same height as your map
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // Match your card background color
    borderRadius: 12,
  },
  gridContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

export default AlertCard