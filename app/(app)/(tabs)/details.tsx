import { useAuth } from '@/context/AuthContext'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Details = () => {

    const { user } = useAuth();


    return (
        <SafeAreaView className="flex-1 items-center justify-start gap-6 p-8 bg-white">
            {/* TODO: Header */}
            <View className='w-full flex justify-between flex-row items-center pb-4'>
                <View className='flex flex-row justify-end items-end gap-4'>
                    <Image source={require('@/assets/images/main-logo.png')} style={styles.logo} />
                    <View className='flex justify-start items-start gap-1'>
                        <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-3xl font-medium'>AlertNet</Text>
                        <View className='flex flex-row justify-start items-center gap-2'>
                            <Text style={{ fontFamily: "Poppins_400Regular" }} className='text-sm'>{`Connecting drivers, securing roads.`}</Text>
                        </View>
                    </View>
                </View>
                <View className='flex justify-center items-end flex-1 self-center'>
                    <Image
                        source={{ uri: user?.photo ?? "https://placehold.co/100x100/E2E8F0/4A5568?text=No+Image" }}
                        style={styles.profilePhoto}
                    />
                </View>
            </View>
            <Text>Details Page</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profilePhoto: { width: 32, height: 32, borderRadius: 50 },
    logo: { width: 58, height: 58 },
    fadeOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 180,
    },
});

export default Details