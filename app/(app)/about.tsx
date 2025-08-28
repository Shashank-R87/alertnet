import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const About = () => {
    return (
        <SafeAreaView className="flex-1 items-center justify-start p-8 bg-white">
            <View className='sw-full flex justify-center items-center'>
                <Text className='text-2xl' style={{ fontFamily: "Poppins_500Medium" }}>About</Text>
            </View>
            <View className='sw-full flex-1 justify-center items-center gap-6 flex-col'>
                <Image source={require('@/assets/images/main-logo.png')} style={styles.logo} />
                <View className='flex justify-center items-center'>
                    <Text className='text-2xl' style={{ fontFamily: "Poppins_500Medium" }}>AlertNet</Text>
                    <Text className='text-lg text-center' style={{ fontFamily: "Poppins_400Regular" }}>{'Connecting drivers,\nsecuring roads.'}</Text>
                </View>
                <View className='flex justify-center items-center'>
                    <Text className='text-base' style={{ fontFamily: "Poppins_500Medium" }}>Version: 0.1.0</Text>
                    <Text className='text-base' style={{ fontFamily: "Poppins_500Medium" }}>Build: 0.1.0 (preview)</Text>
                    <Text className='text-base' style={{ fontFamily: "Poppins_500Medium" }}>Copyright @ 2025</Text>
                </View>
                <View className='px-12'>
                    <Text className='text-center text-base' style={{ fontFamily: "Poppins_400Regular" }}>We provide real-time, blockchain + cloud-backed zone alerts to keep drivers informed and safe on the road. Built in Bengaluru, our mission is to make driving smarter and safer for everyone.</Text>
                </View>
                <View className='px-12'>
                    <Text className='text-center text-base' style={{ fontFamily: "Poppins_400Regular" }}>Made with ❤️ from Bengaluru</Text>
                </View>
            </View>
            <LinearGradient
                style={styles.fadeOverlay}
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
                pointerEvents={'none'}
            />
            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: { width: 72, height: 72 },
    fadeOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 180,
    },
});

export default About