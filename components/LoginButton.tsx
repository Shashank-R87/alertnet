import { useAuth } from '@/context/AuthContext';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function LoginButton() {
    const { user, signIn } = useAuth();

    if (user) {
        return null;
    }

    return (
        <TouchableOpacity 
            onPress={signIn} 
            activeOpacity={0.6} 
            className='bg-gray-100 rounded-xl px-5 py-2 flex flex-row gap-2 justify-center items-center shadow-sm shadow-slate-400'
        >
            <Image
                source={require('@/assets/images/icons8-google.svg')}
                style={styles.logo}
            />
            <Text style={{ fontFamily: "Poppins_400Regular" }} className='text-lg'>
                Sign in with Google
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 24,
        height: 24,
    },
});

export default LoginButton;
