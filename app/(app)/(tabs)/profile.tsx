import { useAuth } from '@/context/AuthContext'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
    const { user, signOut } = useAuth();

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
                {/* <View className='flex justify-center items-end flex-1 self-center'>
                    <Image
                        source={{ uri: user?.photo ?? "https://placehold.co/100x100/E2E8F0/4A5568?text=No+Image" }}
                        style={styles.profilePhoto}
                    />
                </View> */}
            </View>

            {/* TODO: Profile */}
            <View className='flex pt-8 w-full flex-col gap-5'>
                <View className='flex justify-center w-full items-center gap-5 rounded-full pb-5'>
                    <Image
                        source={{ uri: user?.photo ?? "https://placehold.co/100x100/E2E8F0/4A5568?text=No+Image" }}
                        style={styles.profilePhoto}
                    />
                    <View className='flex justify-center items-center gap-1'>
                        <Text className='text-2xl' style={{ fontFamily: "Poppins_500Medium" }}>{user?.name}</Text>
                        <Text className='text-lg' style={{ fontFamily: "Poppins_400Regular" }}>{user?.email}</Text>
                    </View>
                </View>
                <View className='flex flex-col justify-start items-start w-full bg-[#F3F4F6] rounded-xl p-5 gap-2'>
                    <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-xl'>Account</Text>
                    <TouchableOpacity onPress={signOut} activeOpacity={0.6} className='flex bg-white flex-row justify-start gap-3 items-center w-full rounded-lg px-3 py-3'>
                        <Image
                            source={require('@/assets/images/noun-sign-out.svg')}
                            style={styles.signout}
                        />
                        <View className='flex flex-col justify-center items-start w-full'>
                            <Text className='text-lg' style={{ fontFamily: "Poppins_500Medium" }}>Signout</Text>
                            <Text className='text-sm w-full' style={{ fontFamily: "Poppins_400Regular" }}>Secure your account before you leave.</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View className='flex flex-col justify-start items-start w-full bg-[#F3F4F6] rounded-xl p-5 gap-2'>
                    <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-xl'>More</Text>
                    <Link href={'/about'} asChild>
                        <TouchableOpacity activeOpacity={0.6} className='flex bg-white flex-row justify-start gap-3 items-center w-full rounded-lg px-3 py-3'>
                            <Image
                                source={require('@/assets/images/noun-heart.svg')}
                                style={styles.heart}
                            />
                            <View className='flex flex-col justify-center items-start w-full'>
                                <Text className='text-lg' style={{ fontFamily: "Poppins_500Medium" }}>About App</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
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
    profilePhoto: { width: 102, height: 102, borderRadius: 50, borderWidth: 3, borderColor: '#d5d4ef' },
    logo: { width: 58, height: 58 },
    signout: { width: 32, height: 32 },
    heart: { width: 20, height: 20 },
    fadeOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 180,
    },
});