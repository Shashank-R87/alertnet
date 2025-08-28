import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function LogoName() {
    return (
        <View className='flex flex-col justify-center items-center gap-2'>
            <Image       
                source={require('@/assets/images/main-logo.png')}
                style={styles.logo}
            />
            <Text style={{fontFamily: "Poppins_500Medium"}} className='text-3xl text-center font-medium'>
                AlertNet
            </Text>
            <Text style={{fontFamily: "Poppins_400Regular_Italic"}} className='text-xl max-w-48 text-center'>
                Connecting drivers, securing roads.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 58,
        height: 58,
    }
});

export default LogoName