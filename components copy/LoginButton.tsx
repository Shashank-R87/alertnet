import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
    GoogleSignin,
    isErrorWithCode,
    statusCodes
} from '@react-native-google-signin/google-signin';

type UserProfile = {
    id: string;
    email: string;
    familyName: string | null;
    givenName: string | null;
    name: string | null;
    photo: string | null;
};

type GoogleAuthSuccessResponse = {
    type: "success";
    data: {
        idToken: string;
        scopes: string[];
        serverAuthCode: string | null;
        user: UserProfile;
    };
};

function LoginButton() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userData, setUserData] = useState<UserProfile | null>(null);

    const silentSignIn = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            setUserData(userInfo.data?.user ?? null);
        } catch (error) {
            if (isErrorWithCode(error) && error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log('User has not signed in yet.');
            } else {
                console.error('Silent sign-in error:', error);
            }
        }
    };

    useEffect(() => {
        silentSignIn();
    }, []);

    const handleGoogleSignin = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUserData(userInfo.data?.user ?? null);
        } catch (error) {
            if (isErrorWithCode(error)) {
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    console.log('User cancelled the login flow.');
                } else {
                    Alert.alert('Sign-In Error', 'An unexpected error occurred. Please try again.');
                    console.error('Google Sign-in error:', error);
                }
            } else {
                Alert.alert('An unexpected error occurred.');
                console.error(error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await GoogleSignin.signOut();
            setUserData(null);
        } catch (error) {
            console.error('Sign out error:', error);
            Alert.alert('Sign Out Error', 'An error occurred while signing out.');
        }
    };

    return (
        <View className='flex flex-col gap-5 justify-center items-center'>
            {
                !userData ?
                    <TouchableOpacity onPress={handleGoogleSignin} activeOpacity={0.6} className='bg-white rounded-xl px-5 py-2 flex flex-row gap-2 justify-center items-center'>
                        <Image
                            source={{ uri: "https://img.icons8.com/fluency/240/google-logo.png" }}
                            style={styles.logo}
                        />
                        <Text style={{fontFamily: "Poppins_400Regular"}} className='text-lg'>
                            Sign in with Google
                        </Text>
                    </TouchableOpacity>
                    :
                    <>
                        <View className='flex flex-row gap-2 justify-center items-center'>

                            <Image
                                source={{ uri: userData.photo ?? "https://img.icons8.com/fluency/240/google-logo.png" }}
                                style={styles.profilePhoto}
                            />
                            <View>
                            <Text style={{fontFamily: "Poppins_400Regular"}} className='text-xl'>{userData?.name}</Text>
                            <Text style={{fontFamily: "Poppins_400Regular"}} className='text-base'>{userData?.email}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleSignOut} activeOpacity={0.6} className='bg-white rounded-xl px-5 py-2 flex flex-row gap-2 justify-center items-center'>
                            <Text style={{fontFamily: "Poppins_400Regular"}} className='text-lg'>
                                Signout
                            </Text>
                        </TouchableOpacity>
                    </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 24,
        height: 24,
    },
    profilePhoto: {
        width: 48,
        height: 48,
        borderRadius: 100,
    }
});

export default LoginButton